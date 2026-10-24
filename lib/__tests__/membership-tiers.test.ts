import {
  formatCents,
  getAnnualAmount,
  getPriceLookupKey,
  getTierBySlug,
  isSamePlan,
  isUpgrade,
  parseLookupKey,
  TIER_SLUGS,
  TIERS,
} from '../membership-tiers';

describe('membership-tiers', () => {
  describe('TIERS', () => {
    it('has exactly three tiers', () => {
      expect(TIERS).toHaveLength(3);
    });

    it('each tier has required fields', () => {
      for (const tier of TIERS) {
        expect(tier.name).toBeTruthy();
        expect(tier.slug).toBeTruthy();
        expect(tier.monthlyPrice).toBeTruthy();
        expect(tier.yearlyPrice).toBeTruthy();
        expect(tier.tagline).toBeTruthy();
        expect(tier.benefits.length).toBeGreaterThan(0);
        expect(tier.monthlyAmount).toBeGreaterThan(0);
        expect(tier.yearlyAmount).toBe(tier.monthlyAmount * 12);
      }
    });

    it('has exactly one featured tier', () => {
      const featured = TIERS.filter((t) => t.featured);
      expect(featured).toHaveLength(1);
      expect(featured[0].slug).toBe('kindness');
    });

    it('tiers have unique slugs', () => {
      const slugs = TIERS.map((t) => t.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('display prices match amounts', () => {
      for (const tier of TIERS) {
        expect(tier.monthlyPrice).toBe(`$${(tier.monthlyAmount / 100).toLocaleString('en-US')}/mo`);
        expect(tier.yearlyPrice).toBe(`$${(tier.yearlyAmount / 100).toLocaleString('en-US')}/yr`);
      }
    });
  });

  describe('TIER_SLUGS', () => {
    it('contains all tier slugs', () => {
      expect(TIER_SLUGS).toEqual(['curious', 'kindness', 'gratitude']);
    });
  });

  describe('getPriceLookupKey', () => {
    it('builds monthly and yearly keys', () => {
      expect(getPriceLookupKey('kindness', 'month')).toBe('kindness_monthly');
      expect(getPriceLookupKey('kindness', 'year')).toBe('kindness_yearly');
    });
  });

  describe('getTierBySlug', () => {
    it('returns correct tier for valid slug', () => {
      const tier = getTierBySlug('curious');
      expect(tier).toBeDefined();
      expect(tier?.name).toBe('Curious');
    });

    it('returns undefined for invalid slug', () => {
      expect(getTierBySlug('nonexistent')).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      expect(getTierBySlug('')).toBeUndefined();
    });
  });

  describe('parseLookupKey', () => {
    it('round-trips getPriceLookupKey', () => {
      for (const slug of TIER_SLUGS) {
        for (const interval of ['month', 'year'] as const) {
          expect(parseLookupKey(getPriceLookupKey(slug, interval))).toEqual({ slug, interval });
        }
      }
    });

    it('returns null for unknown or missing keys', () => {
      expect(parseLookupKey('platinum_monthly')).toBeNull();
      expect(parseLookupKey('kindness_weekly')).toBeNull();
      expect(parseLookupKey(null)).toBeNull();
      expect(parseLookupKey(undefined)).toBeNull();
    });
  });

  describe('getAnnualAmount', () => {
    it('annualizes monthly prices', () => {
      expect(getAnnualAmount('curious', 'month')).toBe(12000);
      expect(getAnnualAmount('curious', 'year')).toBe(12000);
      expect(getAnnualAmount('gratitude', 'month')).toBe(120000);
    });

    it('returns 0 for unknown tiers', () => {
      expect(getAnnualAmount('nope', 'month')).toBe(0);
    });
  });

  describe('isUpgrade', () => {
    it('treats a higher tier as an upgrade', () => {
      expect(
        isUpgrade({ slug: 'curious', interval: 'month' }, { slug: 'kindness', interval: 'month' })
      ).toBe(true);
    });

    it('treats a lower tier as a downgrade', () => {
      expect(
        isUpgrade({ slug: 'gratitude', interval: 'year' }, { slug: 'kindness', interval: 'year' })
      ).toBe(false);
    });

    it('applies same-tier interval switches immediately', () => {
      expect(
        isUpgrade({ slug: 'kindness', interval: 'year' }, { slug: 'kindness', interval: 'month' })
      ).toBe(true);
    });
  });

  describe('isSamePlan', () => {
    it('compares tier and interval', () => {
      expect(
        isSamePlan({ slug: 'curious', interval: 'month' }, { slug: 'curious', interval: 'month' })
      ).toBe(true);
      expect(
        isSamePlan({ slug: 'curious', interval: 'month' }, { slug: 'curious', interval: 'year' })
      ).toBe(false);
    });
  });

  describe('formatCents', () => {
    it('formats whole and fractional dollars', () => {
      expect(formatCents(1000)).toBe('$10');
      expect(formatCents(120000)).toBe('$1,200');
      expect(formatCents(1234)).toBe('$12.34');
    });
  });
});
