'use client';

import { useState } from 'react';
import { SegmentedControl, Stack } from '@mantine/core';
import { StripeCheckout } from '@/components/Payments/StripeCheckout';
import type { BillingInterval, TierData } from '@/lib/membership-tiers';

interface MembershipCheckoutProps {
  tier: TierData;
}

/** Monthly/yearly toggle + Stripe Embedded Checkout for a membership subscription. */
export function MembershipCheckout({ tier }: MembershipCheckoutProps) {
  const [interval, setInterval] = useState<BillingInterval>('month');

  return (
    <Stack gap="lg">
      <SegmentedControl
        fullWidth
        value={interval}
        onChange={(value) => setInterval(value as BillingInterval)}
        data={[
          { label: `Monthly · ${tier.monthlyPrice}`, value: 'month' },
          { label: `Yearly · ${tier.yearlyPrice}`, value: 'year' },
        ]}
      />
      {/* Re-keyed so switching interval starts a fresh Checkout Session */}
      <StripeCheckout
        key={interval}
        endpoint="/api/checkout/membership"
        body={{ tier: tier.slug, interval }}
      />
    </Stack>
  );
}
