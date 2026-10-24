import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { logger } from '@/lib/logger';
import { parseLookupKey } from '@/lib/membership-tiers';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

/**
 * Stripe webhook handler.
 * Configure in Stripe Dashboard > Developers > Webhooks with events:
 *   checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
 * Locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
 */
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Signature is computed over the raw body, so read it as text
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch (error) {
    logger.warn('Stripe webhook signature verification failed', {
      action: 'stripe_webhook',
      reason: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event.data.object);
        break;
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error(
      'Stripe webhook error',
      { action: 'stripe_webhook', eventType: event.type },
      error
    );
    // 500 so Stripe retries — handlers are idempotent
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode === 'payment') {
    logger.info('Donation received', {
      action: 'donation_complete',
      email: session.customer_details?.email ?? undefined,
      amount: session.amount_total,
    });
    return;
  }

  if (session.mode !== 'subscription') {
    return;
  }

  const userId = session.metadata?.userId || session.client_reference_id;
  const tier = session.metadata?.tier;
  if (!userId || !tier) {
    logger.warn('Subscription checkout missing metadata', {
      action: 'membership_activate',
      sessionId: session.id,
    });
    return;
  }

  const subscriptionId =
    typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;

  await prisma.user.update({
    where: { id: userId },
    data: {
      membershipTier: tier,
      // Async payment methods can complete checkout before payment; subscription.updated activates later
      membershipStatus: session.payment_status === 'unpaid' ? 'pending' : 'active',
      stripeSubscriptionId: subscriptionId ?? null,
      ...(customerId && { stripeCustomerId: customerId }),
    },
  });

  logger.info('Membership activated', { userId, tier, action: 'membership_activate' });
}

function toMembershipStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case 'active':
    case 'trialing':
      return 'active';
    case 'past_due':
    case 'unpaid':
    case 'paused':
      return 'past_due';
    case 'incomplete':
      return 'pending';
    default:
      return 'canceled';
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { stripeSubscriptionId: subscription.id },
        ...(subscription.metadata?.userId ? [{ id: subscription.metadata.userId }] : []),
        { stripeCustomerId: customerId },
      ],
    },
  });
  if (!user) {
    logger.warn('No user for subscription', {
      action: 'subscription_sync',
      subscriptionId: subscription.id,
    });
    return;
  }

  // Ignore events for an old subscription once the user has a newer one
  if (user.stripeSubscriptionId && user.stripeSubscriptionId !== subscription.id) {
    return;
  }

  const status = toMembershipStatus(subscription.status);
  // Plan changes (upgrades, scheduled downgrades taking effect, portal switches) arrive here too
  const price = subscription.items.data[0]?.price;
  const plan = parseLookupKey(typeof price === 'object' ? price.lookup_key : null);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      membershipStatus: status,
      stripeSubscriptionId: subscription.id,
      ...(status === 'canceled' ? { membershipTier: null } : plan && { membershipTier: plan.slug }),
    },
  });

  logger.info('Membership status synced', {
    userId: user.id,
    status,
    tier: plan?.slug,
    action: 'subscription_sync',
  });
}
