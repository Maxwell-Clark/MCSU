import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';
import { getSession } from '@/lib/supabase/auth';

/** Undoes a cancel-at-period-end so the membership keeps renewing. */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'No membership subscription found' }, { status: 400 });
    }

    await getStripe().subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    logger.info('Membership resumed', { userId: user.id, action: 'membership_resume' });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(
      'Membership resume error',
      { userId: session.user.id, action: 'membership_resume' },
      error
    );
    return NextResponse.json({ error: 'Unable to resume your membership' }, { status: 500 });
  }
}
