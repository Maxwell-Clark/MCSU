'use client';

import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { TIERS } from '@/lib/membership-tiers';
import classes from './MembershipPage.module.css';

export function MembershipPage() {
  return (
    <Container size="xl" py="xl" className={classes.section}>
      {/* Hero Section */}
      <div className={classes.heroSection}>
        <Title order={1} className={classes.heroTitle}>
          Mindful Membership
        </Title>
        <Text className={classes.heroText}>
          When you become a member of the Mindfulness Center of Southern Utah, you are joining a
          community rooted in presence, compassion, and shared growth. Your membership directly
          sustains the programs, resources, and spaces that make mindfulness accessible to everyone
          in our region.
        </Text>
        <Text className={classes.heroText}>
          Whether you are just beginning your mindfulness journey or deepening a long-standing
          practice, your support helps us continue offering evidence-based programs, community
          events, and contemplative resources for all.
        </Text>
        <Group justify="center" mt="lg">
          <Button component={Link} href="/donate" variant="outline" size="md">
            Donate Instead
          </Button>
        </Group>
      </div>

      {/* Tiers Section */}
      <Title order={2} className={classes.tiersTitle}>
        Mindful Membership Levels
      </Title>

      <div className={classes.tiersGrid}>
        {TIERS.map((tier) => (
          <div
            key={tier.slug}
            className={`${classes.tierCard} ${tier.featured ? classes.tierCardFeatured : ''}`}
          >
            {tier.featured && <div className={classes.featuredBadge}>Most Popular</div>}

            <div className={classes.tierName}>{tier.name}</div>

            <div className={classes.tierPriceBlock}>
              <div className={classes.tierPrice}>{tier.monthlyPrice}</div>
              <div className={classes.tierPriceAlt}>{tier.yearlyPrice}</div>
            </div>

            <ul className={classes.benefitsList}>
              {tier.benefits.map((benefit) => (
                <li key={benefit} className={classes.benefitItem}>
                  <IconCheck size={20} className={classes.benefitIcon} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              component={Link}
              href={`/membership/signup?tier=${tier.slug}`}
              fullWidth
              size="md"
            >
              Join as {tier.name}
            </Button>
          </div>
        ))}
      </div>

      {/* Closing Section */}
      <div className={classes.closingSection}>
        <Text className={classes.closingText}>
          Your generosity is an investment in our shared well-being. Every membership helps us
          expand access to mindfulness education, support our teachers, and strengthen the fabric of
          our community.
        </Text>
        <Text className={classes.closingNote}>
          The Mindfulness Center of Southern Utah is a 501(c)(3) nonprofit organization. Your
          membership may be tax-deductible to the extent allowed by law. Please consult your tax
          advisor for details.
        </Text>
      </div>
    </Container>
  );
}
