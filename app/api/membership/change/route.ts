import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import {
  getMembershipPrice,
  releaseScheduleIfAny,
  retrieveMembershipSubscription,
} from '@/lib/membership-billing';
import { getPlanChangeContext, PlanChangeError, planChangeSchema } from '@/lib/membership-change';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';
import { getSession } from '@/lib/supabase/auth';

/**
 * Switches a member's plan. Upgrades (and interval switches) apply now with a
 * prorated charge; downgrades are scheduled for the next renewal.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = planChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid plan selection' }, { status: 400 });
  }
  const target = { slug: parsed.data.tier, interval: parsed.data.interval };

  try {
    const ctx = await getPlanChangeContext(session.user.id, target);
    const stripe = getStripe();
    const price = await getMembershipPrice(target);
    const item = ctx.subscription.items.data[0];

    // A pending downgrade would otherwise block direct updates (and conflict with the new choice)
    await releaseScheduleIfAny(ctx.subscription);

    if (ctx.upgrade) {
      const updated = await stripe.subscriptions.update(ctx.subscription.id, {
        items: [{ id: item.id, price: price.id }],
        proration_behavior: 'always_invoice',
        // Leave the plan unchanged if the prorated charge fails
        payment_behavior: 'pending_if_incomplete',
      });

      if (updated.pending_update) {
        return NextResponse.json(
          {
            error:
              "We couldn't charge your card for the upgrade. Please update your payment method and try again.",
          },
          { status: 402 }
        );
      }

      await prisma.user.update({
        where: { id: ctx.userId },
        data: { membershipTier: target.slug },
      });

      logger.info('Membership upgraded', {
        userId: ctx.userId,
        from: `${ctx.current.slug}/${ctx.current.interval}`,
        to: `${target.slug}/${target.interval}`,
        action: 'membership_change',
      });
      return NextResponse.json({ success: true, effective: 'now' });
    }

    // Downgrade: keep the current price until renewal, then switch
    const schedule = await stripe.subscriptionSchedules.create({
      from_subscription: ctx.subscription.id,
    });
    const currentPhase = schedule.phases[0];
    const effectiveAt = item.current_period_end;
    await stripe.subscriptionSchedules.update(schedule.id, {
      end_behavior: 'release',
      phases: [
        {
          items: [
            { price: typeof item.price === 'string' ? item.price : item.price.id, quantity: 1 },
          ],
          start_date: currentPhase.start_date,
          end_date: effectiveAt,
          proration_behavior: 'none',
        },
        {
          items: [{ price: price.id, quantity: 1 }],
          duration: { interval: target.interval, interval_count: 1 },
          proration_behavior: 'none',
        },
      ],
    });

    logger.info('Membership downgrade scheduled', {
      userId: ctx.userId,
      from: `${ctx.current.slug}/${ctx.current.interval}`,
      to: `${target.slug}/${target.interval}`,
      effectiveAt,
      action: 'membership_change',
    });
    return NextResponse.json({ success: true, effective: 'renewal', effectiveAt });
  } catch (error) {
    if (error instanceof PlanChangeError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    logger.error(
      'Membership change error',
      { userId: session.user.id, action: 'membership_change' },
      error
    );
    return NextResponse.json({ error: 'Unable to change your plan' }, { status: 500 });
  }
}

/** Undoes a scheduled downgrade. */
export async function DELETE() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'No membership subscription found' }, { status: 400 });
    }
    await releaseScheduleIfAny(await retrieveMembershipSubscription(user.stripeSubscriptionId));

    logger.info('Scheduled membership change cancelled', {
      userId: user.id,
      action: 'membership_change_undo',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(
      'Membership change undo error',
      { userId: session.user.id, action: 'membership_change_undo' },
      error
    );
    return NextResponse.json({ error: 'Unable to undo the plan change' }, { status: 500 });
  }
}
