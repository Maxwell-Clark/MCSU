/**
 * @jest-environment node
 */
import { POST } from '@/app/api/webhooks/stripe/route';
import { sendEmail } from '@/lib/email/send';
import { prisma } from '@/lib/prisma';

const mockConstructEvent = jest.fn();

jest.mock('@/lib/email/send', () => ({ sendEmail: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/prisma', () => ({
  prisma: { user: { update: jest.fn(), findFirst: jest.fn() } },
}));
jest.mock('@/lib/stripe', () => ({
  getStripe: () => ({ webhooks: { constructEvent: (...args: unknown[]) => mockConstructEvent(...args) } }),
  getSiteUrl: () => 'https://mindfulnesscsu.org',
}));
jest.mock('@/lib/logger', () => ({ logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() } }));

const sendMock = sendEmail as jest.Mock;
const updateMock = prisma.user.update as jest.Mock;
const findFirstMock = prisma.user.findFirst as jest.Mock;

function deliver(event: unknown) {
  mockConstructEvent.mockReturnValue(event);
  return POST(
    new Request('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      headers: { 'stripe-signature': 'sig' },
      body: '{}',
    })
  );
}

const donationSession = {
  id: 'cs_donation',
  mode: 'payment',
  payment_status: 'paid',
  amount_total: 2500,
  created: 1_700_000_000,
  customer_details: { email: 'donor@example.com', name: 'Jordan Lee' },
};

const membershipSession = {
  id: 'cs_member',
  mode: 'subscription',
  payment_status: 'paid',
  amount_total: 5000,
  subscription: 'sub_123',
  customer: 'cus_123',
  metadata: { userId: 'user-1', tier: 'kindness' },
};

describe('Stripe webhook emails', () => {
  beforeAll(() => {
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
  });

  beforeEach(() => {
    jest.clearAllMocks();
    updateMock.mockResolvedValue({ id: 'user-1', email: 'member@example.com', name: 'Sam Rivera' });
  });

  it('emails a donation thank-you keyed on the checkout session', async () => {
    const res = await deliver({ type: 'checkout.session.completed', data: { object: donationSession } });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'donor@example.com',
        subject: 'Thank you for your $25 donation',
        idempotencyKey: 'donation-thank-you/cs_donation',
      })
    );
  });

  it('skips the donation email when payment has not cleared', async () => {
    await deliver({
      type: 'checkout.session.completed',
      data: { object: { ...donationSession, payment_status: 'unpaid' } },
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('sends a membership welcome keyed on the subscription', async () => {
    const res = await deliver({ type: 'checkout.session.completed', data: { object: membershipSession } });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'member@example.com',
        idempotencyKey: 'membership-welcome/sub_123',
      })
    );
    expect(sendMock.mock.calls[0][0].text).toContain('Kindness member');
  });

  it('waits for payment before welcoming a pending membership', async () => {
    await deliver({
      type: 'checkout.session.completed',
      data: { object: { ...membershipSession, payment_status: 'unpaid' } },
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('welcomes a member when a pending subscription becomes active', async () => {
    findFirstMock.mockResolvedValue({
      id: 'user-1',
      email: 'member@example.com',
      name: 'Sam',
      membershipStatus: 'pending',
      membershipTier: 'kindness',
      stripeSubscriptionId: 'sub_123',
    });
    await deliver({
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_123',
          status: 'active',
          customer: 'cus_123',
          metadata: {},
          items: { data: [{ price: { lookup_key: 'kindness_monthly' } }] },
        },
      },
    });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ idempotencyKey: 'membership-welcome/sub_123' })
    );
  });

  it('does not email on routine updates to an active membership', async () => {
    findFirstMock.mockResolvedValue({
      id: 'user-1',
      email: 'member@example.com',
      name: 'Sam',
      membershipStatus: 'active',
      membershipTier: 'kindness',
      stripeSubscriptionId: 'sub_123',
    });
    await deliver({
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_123',
          status: 'active',
          customer: 'cus_123',
          metadata: {},
          items: { data: [{ price: { lookup_key: 'gratitude_monthly' } }] },
        },
      },
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('still acknowledges the webhook when the email fails', async () => {
    sendMock.mockResolvedValueOnce(false);
    const res = await deliver({ type: 'checkout.session.completed', data: { object: donationSession } });
    expect(res.status).toBe(200);
  });
});
