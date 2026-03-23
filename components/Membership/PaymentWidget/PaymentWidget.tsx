'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    // Re-initialize Givebutter widgets after client-side navigation
    window.Givebutter?.init();
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
        <givebutter-widget id={tier.givebutterId}></givebutter-widget>
      </Paper>

      <Button component={Link} href="/membership/dashboard" variant="subtle" fullWidth mt="lg">
        Go to Dashboard
      </Button>
    </Container>
  );
}
