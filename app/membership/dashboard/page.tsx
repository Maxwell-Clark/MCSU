import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { getTierBySlug } from '@/lib/membership-tiers';
import { MemberDashboard } from '@/components/Membership/MemberDashboard/MemberDashboard';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/membership/signup');
  }

  const tier = getTierBySlug(session.user.membershipTier || 'curious');

  if (!tier) {
    redirect('/membership');
  }

  return <MemberDashboard name={session.user.name} tier={tier} />;
}
