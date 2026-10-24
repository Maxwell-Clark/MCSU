import type Stripe from 'stripe';
import { z } from 'zod';
import {
  retrieveMembershipSubscription,
  toMembershipBilling,
  type MembershipBilling,
} from '@/lib/membership-billing';
import { isSamePlan, isUpgrade, TIER_SLUGS, type PlanChoice } from '@/lib/membership-tiers';
import { prisma } from '@/lib/prisma';

export const planChangeSchema = z.object({
  tier: z.enum(TIER_SLUGS as [string, ...string[]]),
  interval: z.enum(['month', 'year']),
});

export class PlanChangeError extends Error {
  constructor(
    message: string,
    public status = 400
  ) {
    super(message);
  }
}

export interface PlanChangeContext {
  userId: string;
  subscription: Stripe.Subscription;
  billing: MembershipBilling;
  current: PlanChoice;
  target: PlanChoice;
  upgrade: boolean;
}

/** Loads the member's subscription and checks that switching to `target` is allowed. */
export async function getPlanChangeContext(
  userId: string,
  target: PlanChoice
): Promise<PlanChangeContext> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.stripeSubscriptionId) {
    throw new PlanChangeError('No membership subscription found');
  }

  const subscription = await retrieveMembershipSubscription(user.stripeSubscriptionId);
  const billing = toMembershipBilling(subscription);

  if (subscription.status !== 'active' && subscription.status !== 'trialing') {
    throw new PlanChangeError('Your membership must be active to change plans');
  }
  if (billing.cancelAtPeriodEnd || billing.cancelAt) {
    throw new PlanChangeError('Resume your membership before changing plans');
  }
  if (!billing.slug || !billing.interval) {
    throw new PlanChangeError('Your current plan cannot be changed online. Please contact us.');
  }

  const current = { slug: billing.slug, interval: billing.interval };
  if (isSamePlan(current, target)) {
    throw new PlanChangeError('You are already on this plan');
  }

  return {
    userId,
    subscription,
    billing,
    current,
    target,
    upgrade: isUpgrade(current, target),
  };
}
