/**
 * Creates (or updates) the Stripe Products and Prices for membership tiers.
 * Idempotent — safe to re-run. Run once per Stripe mode (test, then live):
 *
 *   npx tsx --env-file=.env scripts/stripe-setup.ts
 */
import Stripe from 'stripe';
import { getPriceLookupKey, TIERS, type BillingInterval } from '../lib/membership-tiers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function findOrCreateProduct(slug: string, name: string): Promise<string> {
  const existing = await stripe.products.search({
    query: `metadata['tier_slug']:'${slug}' AND active:'true'`,
  });
  if (existing.data[0]) {
    return existing.data[0].id;
  }
  const product = await stripe.products.create({
    name: `MCSU ${name} Membership`,
    metadata: { tier_slug: slug },
  });
  console.log(`  created product ${product.id}`);
  return product.id;
}

async function ensurePrice(
  productId: string,
  slug: string,
  interval: BillingInterval,
  amount: number
) {
  const lookupKey = getPriceLookupKey(slug, interval);
  const { data } = await stripe.prices.list({ lookup_keys: [lookupKey], active: true });
  const current = data[0];

  if (
    current &&
    current.unit_amount === amount &&
    current.recurring?.interval === interval &&
    current.product === productId
  ) {
    console.log(`  ${lookupKey}: up to date (${current.id})`);
    return;
  }

  // New price takes over the lookup key; the old one is archived
  const price = await stripe.prices.create({
    product: productId,
    currency: 'usd',
    unit_amount: amount,
    recurring: { interval },
    lookup_key: lookupKey,
    transfer_lookup_key: true,
  });
  if (current) {
    await stripe.prices.update(current.id, { active: false });
  }
  console.log(`  ${lookupKey}: created ${price.id}`);
}

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  const mode = process.env.STRIPE_SECRET_KEY.startsWith('sk_live') ? 'LIVE' : 'test';
  console.log(`Setting up membership prices in Stripe ${mode} mode`);

  for (const tier of TIERS) {
    console.log(`${tier.name}:`);
    const productId = await findOrCreateProduct(tier.slug, tier.name);
    await ensurePrice(productId, tier.slug, 'month', tier.monthlyAmount);
    await ensurePrice(productId, tier.slug, 'year', tier.yearlyAmount);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
