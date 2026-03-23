export interface TierData {
  name: string;
  slug: string;
  monthlyPrice: string;
  yearlyPrice: string;
  benefits: string[];
  featured?: boolean;
  givebutterId: string;
}

export const TIERS: TierData[] = [
  {
    name: 'Curious',
    slug: 'curious',
    monthlyPrice: '$10/mo',
    yearlyPrice: '$120/yr',
    benefits: [
      'Access to member-only guided meditations',
      'Monthly mindfulness newsletter',
      'Discounts on workshops and events',
    ],
    givebutterId: 'gVYYmL',
  },
  {
    name: 'Kindness',
    slug: 'kindness',
    monthlyPrice: '$50/mo',
    yearlyPrice: '$600/yr',
    featured: true,
    benefits: [
      'All Curious benefits',
      'Priority registration for programs',
      'Invitation to exclusive member gatherings',
    ],
    givebutterId: 'prPPmL',
  },
  {
    name: 'Gratitude',
    slug: 'gratitude',
    monthlyPrice: '$100/mo',
    yearlyPrice: '$1,200/yr',
    benefits: [
      'All Kindness benefits',
      'One-on-one mindfulness consultation',
      'Recognition as a sustaining supporter',
      'Complimentary guest passes for friends and family',
    ],
    givebutterId: 'gBkkMp',
  },
];

export const TIER_SLUGS = TIERS.map((t) => t.slug);

export function getTierBySlug(slug: string): TierData | undefined {
  return TIERS.find((t) => t.slug === slug);
}
