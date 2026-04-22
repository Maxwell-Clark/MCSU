import { TIERS, TIER_SLUGS, getTierBySlug } from '../membership-tiers';

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
        expect(tier.givebutterId).toBeTruthy();
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

    it('tiers have unique givebutter IDs', () => {
      const ids = TIERS.map((t) => t.givebutterId);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('TIER_SLUGS', () => {
    it('contains all tier slugs', () => {
      expect(TIER_SLUGS).toEqual(['curious', 'kindness', 'gratitude']);
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
});
