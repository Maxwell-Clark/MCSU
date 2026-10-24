import { NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { getPriceLookupKey, TIER_SLUGS } from '@/lib/membership-tiers';
import { prisma } from '@/lib/prisma';
import { getSiteUrl, getStripe } from '@/lib/stripe';
import { getSession } from '@/lib/supabase/auth';

const membershipCheckoutSchema = z.object({
  tier: z.enum(TIER_SLUGS as [string, ...string[]]),
  interval: z.enum(['month', 'year']),
});

/** Creates an embedded Checkout Session for a membership subscription. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = membershipCheckoutSchema.safeParse(await request.json());
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid membership selection' }, { status: 400 });
    }
    const { tier, interval } = result.data;

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.membershipStatus === 'active' && user.stripeSubscriptionId) {
      return NextResponse.json({ error: 'You already have an active membership' }, { status: 400 });
    }

    const stripe = getStripe();
    const lookupKey = getPriceLookupKey(tier, interval);
    const { data: prices } = await stripe.prices.list({ lookup_keys: [lookupKey], active: true });
    if (!prices[0]) {
      logger.error('Missing Stripe price', { action: 'membership_checkout', lookupKey });
      return NextResponse.json({ error: 'Membership pricing unavailable' }, { status: 500 });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        phone: user.phone || undefined,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } });
    }

    const metadata = { type: 'membership', userId: user.id, tier };
    const checkout = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      mode: 'subscription',
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{ price: prices[0].id, quantity: 1 }],
      metadata,
      subscription_data: { metadata },
      return_url: `${getSiteUrl()}/membership/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: checkout.client_secret });
  } catch (error) {
    logger.error(
      'Membership checkout error',
      { userId: session.user.id, action: 'membership_checkout' },
      error
    );
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 });
  }
}
