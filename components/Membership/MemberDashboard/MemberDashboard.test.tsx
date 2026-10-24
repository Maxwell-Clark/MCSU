import type { MembershipBilling, MembershipPayment } from '@/lib/membership-billing';
import { getTierBySlug } from '@/lib/membership-tiers';
import { render, screen } from '@/test-utils';
import { MemberDashboard } from './MemberDashboard';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));
jest.mock('../../../lib/supabase/client', () => ({
  createClient: () => ({ auth: { signOut: jest.fn() } }),
}));

const kindness = getTierBySlug('kindness')!;
// June 1, 2030 UTC
const periodEnd = 1906934400;

const activeBilling: MembershipBilling = {
  slug: 'kindness',
  interval: 'month',
  status: 'active',
  amount: 5000,
  currentPeriodEnd: periodEnd,
  cancelAtPeriodEnd: false,
  cancelAt: null,
  pendingChange: null,
};

const payments: MembershipPayment[] = [
  {
    id: 'in_1',
    date: periodEnd - 30 * 86400,
    amount: 5000,
    status: 'paid',
    description: '1 × MCSU Kindness Membership',
    hostedUrl: 'https://invoice.stripe.com/i/1',
    pdfUrl: 'https://pay.stripe.com/invoice/1/pdf',
  },
];

function renderDashboard(overrides: Partial<React.ComponentProps<typeof MemberDashboard>> = {}) {
  return render(
    <MemberDashboard
      name="Jane"
      tier={kindness}
      membershipStatus="active"
      billing={activeBilling}
      payments={payments}
      justPaid={false}
      {...overrides}
    />
  );
}

describe('MemberDashboard', () => {
  it('shows the current plan, price and renewal date', () => {
    renderDashboard();
    expect(screen.getByText('Your Plan')).toBeInTheDocument();
    expect(screen.getByText(/billed monthly/)).toBeInTheDocument();
    expect(screen.getByText(/Renews on/)).toBeInTheDocument();
  });

  it('offers upgrades and downgrades relative to the current plan', () => {
    renderDashboard();
    expect(screen.getByRole('button', { name: /upgrade to gratitude/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /switch to curious/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /current plan/i })).toBeDisabled();
  });

  it('lists payment history with receipt links', () => {
    renderDashboard();
    expect(screen.getByText('1 × MCSU Kindness Membership')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'PDF' })).toHaveAttribute(
      'href',
      'https://pay.stripe.com/invoice/1/pdf'
    );
  });

  it('shows a resume option and disables plan changes while canceling', () => {
    renderDashboard({
      billing: { ...activeBilling, cancelAtPeriodEnd: true, cancelAt: periodEnd },
    });
    expect(screen.getByText(/Your membership ends on/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upgrade to gratitude/i })).toBeDisabled();
    expect(screen.queryByRole('button', { name: /cancel membership/i })).not.toBeInTheDocument();
  });

  it('shows a scheduled downgrade with an undo option', () => {
    renderDashboard({
      billing: {
        ...activeBilling,
        pendingChange: { slug: 'curious', interval: 'month', effectiveAt: periodEnd },
      },
    });
    expect(screen.getByText(/Switching to/)).toBeInTheDocument();
    expect(screen.getByText('Curious (monthly)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it('hides billing management for manually managed members', () => {
    renderDashboard({ membershipStatus: null, billing: null, payments: [] });
    expect(screen.getByText(/managed by our team/)).toBeInTheDocument();
    expect(screen.queryByText('Change Plan')).not.toBeInTheDocument();
    expect(screen.queryByText('Payment History')).not.toBeInTheDocument();
  });
});
