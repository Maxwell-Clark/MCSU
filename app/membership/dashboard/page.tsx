import { redirect } from 'next/navigation';
import { MemberDashboard } from '@/components/Membership/MemberDashboard/MemberDashboard';
import { logger } from '@/lib/logger';
import {
  getMembershipBilling,
  listMembershipPayments,
  type MembershipBilling,
  type MembershipPayment,
} from '@/lib/membership-billing';
import { getTierBySlug } from '@/lib/membership-tiers';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

interface DashboardPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { session_id: checkoutSessionId } = await searchParams;
  const session = await getSession();

  if (!session) {
    redirect('/membership/signup');
  }

  const tier = getTierBySlug(session.user.membershipTier || 'curious');

  if (!tier) {
    redirect('/membership');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeCustomerId: true, stripeSubscriptionId: true },
  });

  // Billing details come live from Stripe; the page still renders tier and benefits if Stripe is unreachable
  let billing: MembershipBilling | null = null;
  let payments: MembershipPayment[] = [];
  let billingUnavailable = false;
  try {
    [billing, payments] = await Promise.all([
      getMembershipBilling(user?.stripeSubscriptionId ?? null),
      listMembershipPayments(user?.stripeCustomerId ?? null),
    ]);
  } catch (error) {
    billingUnavailable = true;
    logger.error(
      'Failed to load membership billing',
      { userId: session.user.id, action: 'membership_billing' },
      error
    );
  }

  return (
    <MemberDashboard
      name={session.user.name}
      tier={tier}
      membershipStatus={session.user.membershipStatus}
      billing={billing}
      payments={payments}
      billingUnavailable={billingUnavailable}
      // Back from Stripe Checkout, possibly before the webhook has activated the membership
      justPaid={Boolean(checkoutSessionId)}
    />
  );
}
