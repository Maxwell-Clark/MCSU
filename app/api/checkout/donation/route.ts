import { NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { getSiteUrl, getStripe } from '@/lib/stripe';

const donationSchema = z.object({
  // Whole dollars
  amount: z
    .number()
    .int('Please enter a whole dollar amount')
    .min(5, 'Minimum donation is $5')
    .max(10000, 'For gifts over $10,000 please contact us directly'),
});

/** Creates an embedded Checkout Session for a one-time donation. */
export async function POST(request: Request) {
  try {
    const result = donationSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid amount' },
        { status: 400 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      ui_mode: 'embedded_page',
      mode: 'payment',
      submit_type: 'donate',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: result.data.amount * 100,
            product_data: { name: 'Donation to the Mindfulness Center of Southern Utah' },
          },
        },
      ],
      metadata: { type: 'donation' },
      return_url: `${getSiteUrl()}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    logger.error('Donation checkout error', { action: 'donation_checkout' }, error);
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 });
  }
}
