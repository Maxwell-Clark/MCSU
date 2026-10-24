import Stripe from 'stripe';

let stripeClient: Stripe | undefined;

/**
 * Server-side Stripe client. Created lazily so builds don't fail when
 * STRIPE_SECRET_KEY isn't set (e.g. CI type checks).
 */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}
