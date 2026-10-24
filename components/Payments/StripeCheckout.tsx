'use client';

import { useCallback, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { IconAlertCircle } from '@tabler/icons-react';
import { Alert } from '@mantine/core';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
  /** API route that creates a Checkout Session and returns `{ clientSecret }` */
  endpoint: string;
  body: Record<string, unknown>;
}

/** Stripe Embedded Checkout, mounted inline. Remount (change `key`) to start a new session. */
export function StripeCheckout({ endpoint, body }: StripeCheckoutProps) {
  const [error, setError] = useState('');
  const payload = JSON.stringify(body);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
    const data = await res.json();
    if (!res.ok || !data.clientSecret) {
      const message = data.error || 'Unable to start checkout. Please try again.';
      setError(message);
      throw new Error(message);
    }
    return data.clientSecret as string;
  }, [endpoint, payload]);

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
        {error}
      </Alert>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
