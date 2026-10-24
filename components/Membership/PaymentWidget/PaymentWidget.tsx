'use client';

import { Title, Container, Paper, Button } from '@mantine/core';
import Link from 'next/link';
import type { TierData } from '@/lib/membership-tiers';
import { MembershipCheckout } from '@/components/Membership/MembershipCheckout/MembershipCheckout';
import classes from './PaymentWidget.module.css';

interface PaymentWidgetProps {
  tier: TierData;
}

export function PaymentWidget({ tier }: PaymentWidgetProps) {
  return (
    <Container size="sm" py="xl" className={classes.wrapper}>
      <Title order={2} ta="center" mb="xl">
        Complete Your {tier.name} Membership
      </Title>

      <Paper withBorder shadow="md" p="xl" radius="md" className={classes.widgetContainer}>
        <MembershipCheckout tier={tier} />
      </Paper>

      <Button component={Link} href="/membership/dashboard" variant="subtle" fullWidth mt="lg">
        Back to Dashboard
      </Button>
    </Container>
  );
}
