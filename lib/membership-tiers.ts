export interface TierData {
  name: string;
  slug: string;
  monthlyPrice: string;
  yearlyPrice: string;
  tagline: string;
  prefix?: string;
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
    tagline: 'For those just beginning to explore.',
    benefits: [
      'Access to our private online community — a calm, welcoming space to connect with fellow practitioners',
      'Exclusive online content (including courses on mindfulness)',
      'A small MCSU memento to mark the beginning of your journey',
    ],
    givebutterId: 'gVYYmL',
  },
  {
    name: 'Kindness',
    slug: 'kindness',
    monthlyPrice: '$50/mo',
    yearlyPrice: '$600/yr',
    featured: true,
    tagline: 'For those ready to deepen their practice and their connections.',
    prefix: 'Everything in Curious, plus:',
    benefits: [
      'A curated mindfulness book, with quarterly live online discussions to explore it together',
      'Guided group mindfulness walks — a gentle way to move, breathe, and connect in community',
    ],
    givebutterId: 'prPPmL',
  },
  {
    name: 'Gratitude',
    slug: 'gratitude',
    monthlyPrice: '$100/mo',
    yearlyPrice: '$1,200/yr',
    tagline: 'For those called to lead and give generously.',
    prefix: 'Everything in Kindness, plus:',
    benefits: [
      'An MCSU mindfulness journal for your personal practice',
      'A complimentary half-day mindfulness retreat, hosted annually',
      'Invitations to exclusive VIP events and special gatherings',
    ],
    givebutterId: 'gBkkMp',
  },
];

export const TIER_SLUGS = TIERS.map((t) => t.slug);

export function getTierBySlug(slug: string): TierData | undefined {
  return TIERS.find((t) => t.slug === slug);
}
