'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Title, Text, Paper, Button, List, ThemeIcon, Stack, Group, Modal, Alert } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';
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
  const [cancelOpened, { open: openCancel, close: closeCancel }] = useDisclosure(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/membership');
    router.refresh();
  };

  const handleCancel = async () => {
    setCancelling(true);
    setCancelError('');

    try {
      const res = await fetch('/api/membership/cancel', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        setCancelError(data.error || 'Failed to cancel membership');
        return;
      }

      closeCancel();
      router.push('/membership');
      router.refresh();
    } catch {
      setCancelError('An error occurred. Please try again.');
    } finally {
      setCancelling(false);
    }
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
                <ThemeIcon size={20} radius="xl" color="teal" aria-hidden="true">
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
            <Button variant="light" color="red" onClick={openCancel}>
              Cancel Subscription
            </Button>
            <Button variant="subtle" color="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Group>
        </Stack>
      </Paper>

      <Modal opened={cancelOpened} onClose={closeCancel} title="Cancel Subscription" centered>
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to cancel your {tier.name} membership? You will lose access to
            your member benefits immediately.
          </Text>
          <Text size="sm" c="dimmed">
            If you have any questions or feedback, feel free to reach out to us at{' '}
            <a href="mailto:kbenson@mindfulnesscsu.org">kbenson@mindfulnesscsu.org</a>.
          </Text>

          {cancelError && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
              {cancelError}
            </Alert>
          )}

          <Group justify="flex-end">
            <Button variant="default" onClick={closeCancel}>
              Keep Membership
            </Button>
            <Button color="red" onClick={handleCancel} loading={cancelling}>
              Confirm Cancellation
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
