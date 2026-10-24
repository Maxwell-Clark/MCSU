'use client';

import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { TierCards } from './TierCards/TierCards';
import classes from './MembershipPage.module.css';

export function MembershipPage() {
  return (
    <Container size="xl" py="xl" className={classes.section}>
      {/* Hero Section */}
      <div className={classes.heroSection}>
        <Title order={1} className={classes.heroTitle}>
          Mindful Membership
        </Title>
        <Text className={classes.heroSubtitle}>
          Practice together. Give back. Belong.
        </Text>
        <Text className={classes.heroText}>
          Mindfulness changes lives — quietly, gradually, and profoundly. We believe everyone
          deserves access to the tools and community that make mindful living possible, regardless
          of their circumstances.
        </Text>
        <Text className={classes.heroText}>
          Every Mindful Membership directly funds free mindfulness programs for those who need them
          most — including residents at Switchpoint Community Resource Center and patrons of the
          Washington County Library System.
        </Text>
        <Text className={classes.heroText}>
          Membership is also an opportunity to practice generosity as a form of mindfulness — to
          give with intention, connect with a like-minded community, and know that your support
          creates real, tangible change.
        </Text>
      </div>

      {/* Tiers Section */}
      <Title order={2} className={classes.tiersTitle}>
        Choose your level of practice
      </Title>

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

      {/* Closing Section */}
      <div className={classes.closingSection}>
        <Text className={classes.closingText}>
          Not ready for membership? Any contribution is welcome and deeply appreciated.
        </Text>
        <Group justify="center" mt="md">
          <Button component={Link} href="/donate" variant="light" size="md">
            Donate here
          </Button>
        </Group>
        <Text className={classes.closingNote}>
          Mindful Memberships are partially tax-deductible. The deductible portion equals your
          contribution minus the fair market value of member benefits received.
        </Text>
      </div>
    </Container>
  );
}
