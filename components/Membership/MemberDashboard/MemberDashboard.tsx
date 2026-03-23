'use client';

import { useRouter } from 'next/navigation';
import { Container, Title, Text, Paper, Button, List, ThemeIcon, Stack, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { createClient } from '@/lib/supabase/client';
import type { TierData } from '@/lib/membership-tiers';
import Link from 'next/link';
import classes from './MemberDashboard.module.css';

interface MemberDashboardProps {
  name: string;
  tier: TierData;
}

export function MemberDashboard({ name, tier }: MemberDashboardProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/membership');
    router.refresh();
  };

  return (
    <Container size="sm" py="xl" className={classes.wrapper}>
      <Title order={2} ta="center">
        Welcome, {name}
      </Title>
      <Text c="dimmed" ta="center" mt="xs" mb="xl">
        {tier.name} Member
      </Text>

      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Stack gap="lg">
          <div>
            <Title order={4} mb="sm">Your Benefits</Title>
            <List
              spacing="xs"
              icon={
                <ThemeIcon size={20} radius="xl" color="teal">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {tier.benefits.map((benefit) => (
                <List.Item key={benefit}>{benefit}</List.Item>
              ))}
            </List>
          </div>

          <div>
            <Title order={4} mb="sm">Membership Details</Title>
            <Text size="sm">
              Tier: <strong>{tier.name}</strong> &middot; {tier.monthlyPrice} ({tier.yearlyPrice})
            </Text>
          </div>

          <Group>
            <Button component={Link} href="/membership/payment" variant="light">
              Manage Payment
            </Button>
            <Button component={Link} href="/account/profile" variant="light">
              Edit Profile
            </Button>
            <Button variant="subtle" color="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
