import { donationThankYouEmail, formatUsd, membershipWelcomeEmail } from '@/lib/email/templates';
import { getTierBySlug } from '@/lib/membership-tiers';

const siteUrl = 'https://mindfulnesscsu.org';

describe('formatUsd', () => {
  it('drops cents for whole dollars and keeps them otherwise', () => {
    expect(formatUsd(5000)).toBe('$50');
    expect(formatUsd(123456)).toBe('$1,234.56');
    expect(formatUsd(1050)).toBe('$10.50');
  });
});

describe('donationThankYouEmail', () => {
  const email = donationThankYouEmail({
    name: 'Jordan Lee',
    amountCents: 2500,
    date: new Date('2026-11-10T18:00:00Z'),
    siteUrl,
  });

  it('puts the amount in the subject and receipt', () => {
    expect(email.subject).toBe('Thank you for your $25 donation');
    expect(email.text).toContain('Amount: $25');
    expect(email.text).toContain('Date: November 10, 2026');
    expect(email.text).toContain('Donor: Jordan Lee');
    expect(email.text).toContain('Dear Jordan,');
  });

  it('includes the tax acknowledgement in both versions', () => {
    const line = 'No goods or services were provided in exchange for this contribution.';
    expect(email.text).toContain(line);
    expect(email.html).toContain(line);
  });

  it('escapes donor-supplied names in the HTML', () => {
    const html = donationThankYouEmail({
      name: '<script>x</script> Smith',
      amountCents: 500,
      date: new Date(),
      siteUrl,
    }).html;
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('falls back to a generic greeting without a name', () => {
    const anon = donationThankYouEmail({ amountCents: 500, date: new Date(), siteUrl });
    expect(anon.text.startsWith('Hello,')).toBe(true);
    expect(anon.text).not.toContain('Donor:');
  });
});

describe('membershipWelcomeEmail', () => {
  const tier = getTierBySlug('kindness')!;

  it('names the tier, lists benefits and links to the dashboard', () => {
    const email = membershipWelcomeEmail({ name: 'Sam', tier, amountCents: 5000, siteUrl });
    expect(email.text).toContain('Welcome, Sam!');
    expect(email.text).toContain('Kindness member');
    expect(email.text).toContain('Your first payment of $50 has been received.');
    for (const benefit of tier.benefits) {
      expect(email.text).toContain(benefit);
    }
    expect(email.html).toContain('href="https://mindfulnesscsu.org/membership/dashboard"');
  });

  it('omits the payment line when the amount is unknown', () => {
    const email = membershipWelcomeEmail({ name: null, tier, siteUrl });
    expect(email.text).toContain('Welcome!');
    expect(email.text).not.toContain('first payment');
  });
});
