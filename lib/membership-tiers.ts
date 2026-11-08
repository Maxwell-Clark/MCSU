export interface TierData {
  name: string;
  slug: string;
  monthlyPrice: string;
  yearlyPrice: string;
  tagline: string;
  prefix?: string;
  benefits: string[];
  featured?: boolean;
  /** Price in cents, billed monthly */
  monthlyAmount: number;
  /** Price in cents, billed yearly */
  yearlyAmount: number;
}

export const TIERS: TierData[] = [
  {
    name: 'Curious',
    slug: 'curious',
    monthlyPrice: '$10/mo',
    yearlyPrice: '$120/yr',
    tagline: 'For those just beginning to explore.',
    benefits: [
      'MCSU memento',
      'Access to the website community room',
      "Recognition on MCSU's website and social media",
    ],
    monthlyAmount: 1000,
    yearlyAmount: 12000,
  },
  {
    name: 'Kindness',
    slug: 'kindness',
    monthlyPrice: '$50/mo',
    yearlyPrice: '$600/yr',
    featured: true,
    tagline: 'For those ready to deepen their practice and their connections.',
    prefix: 'All Curious benefits, plus:',
    benefits: [
      'One half-day in-person mindfulness session specifically designed for practitioners',
      'A branded item (e.g., a mindfulness journal or tote bag)',
    ],
    monthlyAmount: 5000,
    yearlyAmount: 60000,
  },
  {
    name: 'Gratitude',
    slug: 'gratitude',
    monthlyPrice: '$100/mo',
    yearlyPrice: '$1,200/yr',
    tagline: 'For those called to lead and give generously.',
    prefix: 'All Kindness benefits, plus:',
    benefits: ['An annual whole-day silent mindfulness retreat'],
    monthlyAmount: 10000,
    yearlyAmount: 120000,
  },
];

export const TIER_SLUGS = TIERS.map((t) => t.slug);

export function getTierBySlug(slug: string): TierData | undefined {
  return TIERS.find((t) => t.slug === slug);
}

export type BillingInterval = 'month' | 'year';

/** Stripe Price lookup key for a tier/interval — created by scripts/stripe-setup.ts */
export function getPriceLookupKey(slug: string, interval: BillingInterval): string {
  return `${slug}_${interval === 'month' ? 'monthly' : 'yearly'}`;
}

/** Inverse of getPriceLookupKey — null for keys that aren't membership prices. */
export function parseLookupKey(
  key: string | null | undefined
): { slug: string; interval: BillingInterval } | null {
  const match = key?.match(/^(.+)_(monthly|yearly)$/);
  if (!match || !getTierBySlug(match[1])) {
    return null;
  }
  return { slug: match[1], interval: match[2] === 'monthly' ? 'month' : 'year' };
}

/** Cost of a tier/interval over a year, in cents — used to rank plans. */
export function getAnnualAmount(slug: string, interval: BillingInterval): number {
  const tier = getTierBySlug(slug);
  if (!tier) {
    return 0;
  }
  return interval === 'month' ? tier.monthlyAmount * 12 : tier.yearlyAmount;
}

export interface PlanChoice {
  slug: string;
  interval: BillingInterval;
}

/**
 * Upgrades (and same-cost interval switches) apply immediately; downgrades wait for renewal.
 * Stripe resets the billing cycle on an interval change anyway, so those can't be deferred cleanly.
 */
export function isUpgrade(from: PlanChoice, to: PlanChoice): boolean {
  return getAnnualAmount(to.slug, to.interval) >= getAnnualAmount(from.slug, from.interval);
}

export function isSamePlan(a: PlanChoice, b: PlanChoice): boolean {
  return a.slug === b.slug && a.interval === b.interval;
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
