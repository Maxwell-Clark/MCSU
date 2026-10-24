import type Stripe from 'stripe';
import {
  getPriceLookupKey,
  parseLookupKey,
  type BillingInterval,
  type PlanChoice,
} from '@/lib/membership-tiers';
import { getStripe } from '@/lib/stripe';

export interface PendingPlanChange extends PlanChoice {
  /** Unix seconds when the new plan takes effect */
  effectiveAt: number;
}

export interface MembershipBilling {
  slug: string | null;
  interval: BillingInterval | null;
  /** Raw Stripe subscription status */
  status: Stripe.Subscription.Status;
  /** Recurring amount in cents */
  amount: number | null;
  /** Unix seconds */
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
  /** Unix seconds, when the subscription is set to end */
  cancelAt: number | null;
  pendingChange: PendingPlanChange | null;
}

export interface MembershipPayment {
  id: string;
  /** Unix seconds */
  date: number;
  amount: number;
  status: Stripe.Invoice.Status | null;
  description: string;
  hostedUrl: string | null;
  pdfUrl: string | null;
}

function priceOf(price: string | Stripe.Price | Stripe.DeletedPrice): Stripe.Price | null {
  return typeof price === 'object' && !('deleted' in price && price.deleted)
    ? (price as Stripe.Price)
    : null;
}

export async function retrieveMembershipSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return getStripe().subscriptions.retrieve(subscriptionId, {
    expand: ['items.data.price', 'schedule.phases.items.price'],
  });
}

/** The Stripe Price for a tier/interval, looked up by the key scripts/stripe-setup.ts assigns. */
export async function getMembershipPrice(plan: PlanChoice): Promise<Stripe.Price> {
  const lookupKey = getPriceLookupKey(plan.slug, plan.interval);
  const { data } = await getStripe().prices.list({ lookup_keys: [lookupKey], active: true });
  if (!data[0]) {
    throw new Error(`Missing Stripe price for ${lookupKey}`);
  }
  return data[0];
}

/** Next phase of an attached schedule, if it switches to a different membership price. */
function getPendingChange(subscription: Stripe.Subscription): PendingPlanChange | null {
  const schedule = subscription.schedule;
  if (!schedule || typeof schedule === 'string' || schedule.status !== 'active') {
    return null;
  }
  const now = Date.now() / 1000;
  const next = schedule.phases.find((phase) => phase.start_date > now);
  const price = next?.items[0] ? priceOf(next.items[0].price) : null;
  const plan = parseLookupKey(price?.lookup_key);
  if (!next || !plan) {
    return null;
  }
  return { ...plan, effectiveAt: next.start_date };
}

export function toMembershipBilling(subscription: Stripe.Subscription): MembershipBilling {
  const item = subscription.items.data[0];
  const price = item ? priceOf(item.price) : null;
  const plan = parseLookupKey(price?.lookup_key);

  return {
    slug: plan?.slug ?? null,
    interval: plan?.interval ?? (price?.recurring?.interval as BillingInterval | undefined) ?? null,
    status: subscription.status,
    amount: price?.unit_amount ?? null,
    currentPeriodEnd: item?.current_period_end ?? null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at,
    pendingChange: getPendingChange(subscription),
  };
}

export async function getMembershipBilling(
  subscriptionId: string | null
): Promise<MembershipBilling | null> {
  if (!subscriptionId) {
    return null;
  }
  return toMembershipBilling(await retrieveMembershipSubscription(subscriptionId));
}

export async function listMembershipPayments(
  customerId: string | null
): Promise<MembershipPayment[]> {
  if (!customerId) {
    return [];
  }
  const { data } = await getStripe().invoices.list({ customer: customerId, limit: 24 });
  return data
    .filter((invoice) => invoice.status !== 'draft')
    .map((invoice) => ({
      id: invoice.id ?? invoice.number ?? String(invoice.created),
      date: invoice.status_transitions?.paid_at ?? invoice.created,
      amount: invoice.status === 'paid' ? invoice.amount_paid : invoice.amount_due,
      status: invoice.status,
      description: invoice.lines?.data[0]?.description || invoice.description || 'Membership',
      hostedUrl: invoice.hosted_invoice_url ?? null,
      pdfUrl: invoice.invoice_pdf ?? null,
    }));
}

/** Drops a pending scheduled change so the subscription can be updated directly again. */
export async function releaseScheduleIfAny(subscription: Stripe.Subscription): Promise<void> {
  const schedule = subscription.schedule;
  if (!schedule) {
    return;
  }
  const scheduleId = typeof schedule === 'string' ? schedule : schedule.id;
  const status = typeof schedule === 'string' ? null : schedule.status;
  if (status && status !== 'active' && status !== 'not_started') {
    return;
  }
  await getStripe().subscriptionSchedules.release(scheduleId);
}
