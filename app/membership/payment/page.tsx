import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { getTierBySlug } from '@/lib/membership-tiers';
import { PaymentWidget } from '@/components/Membership/PaymentWidget/PaymentWidget';

export default async function PaymentPage() {
  const session = await getSession();

  if (!session) {
    redirect('/membership/signup');
  }

  const tier = getTierBySlug(session.user.membershipTier || 'curious');

  if (!tier) {
    redirect('/membership');
  }

  return <PaymentWidget tier={tier} />;
}
