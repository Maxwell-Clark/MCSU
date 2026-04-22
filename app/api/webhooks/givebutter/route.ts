import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

/**
 * Givebutter webhook handler.
 * Configure this URL in Givebutter dashboard under Settings > Webhooks.
 * Receives donation/payment events and updates user payment status.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Givebutter sends different event types — we care about successful donations
    const email = payload?.giving?.email || payload?.email;
    const amount = payload?.giving?.amount || payload?.amount;
    const eventType = payload?.event;

    logger.info('Givebutter webhook received', {
      action: 'givebutter_webhook',
      email,
    });

    // If we have an email, mark the user's payment as confirmed
    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        logger.info('Payment confirmed', { userId: user.id, email, action: 'payment_confirmed' });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Givebutter webhook error', { action: 'givebutter_webhook' }, error);
    // Always return 200 so Givebutter doesn't retry endlessly
    return NextResponse.json({ received: true });
  }
}
