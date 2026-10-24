'use client';

import Link from 'next/link';
import { Button, Container, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { TierCards } from '@/components/Membership/TierCards/TierCards';
import classes from '../Community/Community.module.css';

export function Tiered() {
  const theme = useMantineTheme();

  return (
    <Container size="xl" py="xl">
      <Paper
        shadow="sm"
        radius="md"
        p="xl"
        withBorder
        style={{
          backgroundColor: theme.colors.blue[0],
          borderLeft: `4px solid ${theme.colors.blue[6]}`,
        }}
      >
        <Stack gap="xl">
          <div>
            <Title className={classes.title} order={2} ta="center">
              Mindful Membership
            </Title>
            <Text c="dimmed" className={classes.description} ta="center" mt="md">
              Practice together. Give back. Belong. Every Mindful Membership directly funds free
              mindfulness programs for those who need them most, and connects you with a like-minded
              community. Choose the level of support that fits you.
            </Text>
          </div>

          <TierCards
            renderAction={(tier) => (
              <Button
                component={Link}
                href={`/membership/signup?tier=${tier.slug}`}
                fullWidth
                size="md"
              >
                Join as {tier.name}
              </Button>
            )}
          />

          <Text ta="center" size="sm">
            <Link href="/membership">Learn more about membership</Link>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
