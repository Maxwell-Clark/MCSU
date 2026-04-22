'use client';

import { useEffect, useState } from 'react';
import { Title, Text, Container, Paper, Button } from '@mantine/core';
import Link from 'next/link';
import type { TierData } from '@/lib/membership-tiers';
import classes from './PaymentWidget.module.css';

declare global {
  interface Window {
    Givebutter?: { init: () => void };
  }
}

interface PaymentWidgetProps {
  tier: TierData;
}

export function PaymentWidget({ tier }: PaymentWidgetProps) {
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    // Re-initialize Givebutter widgets after client-side navigation
    window.Givebutter?.init();
  }, []);

  // Listen for Givebutter payment success events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'givebutter' && event.data?.event === 'donation_complete') {
        setPaymentComplete(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Container size="sm" py="xl" className={classes.wrapper}>
      <Title order={2} ta="center">
        Complete Your {tier.name} Membership
      </Title>
      <Text c="dimmed" ta="center" mt="sm" mb="xl">
        {tier.monthlyPrice} &middot; {tier.yearlyPrice}
      </Text>

      <Paper withBorder shadow="md" p="xl" radius="md" className={classes.widgetContainer}>
        <div className={classes.widgetCenter}>
          <givebutter-widget id={tier.givebutterId}></givebutter-widget>
        </div>
      </Paper>

      <Button
        component={Link}
        href="/membership/dashboard"
        variant={paymentComplete ? 'filled' : 'subtle'}
        fullWidth
        mt="lg"
      >
        {paymentComplete ? 'Payment Complete — Go to Dashboard' : 'Go to Dashboard'}
      </Button>
    </Container>
  );
}
