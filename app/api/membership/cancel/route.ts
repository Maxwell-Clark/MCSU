import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { releaseScheduleIfAny, retrieveMembershipSubscription } from '@/lib/membership-billing';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';
import { getSession } from '@/lib/supabase/auth';

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.membershipTier) {
      return NextResponse.json({ error: 'No active membership found' }, { status: 400 });
    }

    if (user.stripeSubscriptionId) {
      // A scheduled downgrade would block the update below
      await releaseScheduleIfAny(await retrieveMembershipSubscription(user.stripeSubscriptionId));

      // Member keeps access until the paid period ends; the
      // customer.subscription.deleted webhook clears the tier then.
      const subscription = await getStripe().subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      logger.info('Membership set to cancel at period end', {
        userId: session.user.id,
        email: session.user.email,
        action: 'membership_cancel',
      });

      return NextResponse.json({ success: true, cancelAt: subscription.cancel_at });
    }

    // No Stripe subscription (manually managed membership) — clear immediately
    await prisma.user.update({
      where: { id: session.user.id },
      data: { membershipTier: null },
    });

    logger.info('Membership cancelled', {
      userId: session.user.id,
      email: session.user.email,
      action: 'membership_cancel',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Membership cancellation error', { action: 'membership_cancel' }, error);
    return NextResponse.json({ error: 'Failed to cancel membership' }, { status: 500 });
  }
}
