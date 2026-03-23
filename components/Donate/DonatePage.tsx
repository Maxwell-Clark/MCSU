'use client';

import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IconHeartHandshake, IconBook, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './DonatePage.module.css';

const IMPACT_AREAS = [
  {
    icon: IconUsers,
    title: 'Community Programs',
    description:
      'Fund workshops, group meditations, and community events that bring people together through mindfulness.',
  },
  {
    icon: IconBook,
    title: 'Mindfulness Education',
    description:
      'Support evidence-based curricula, teacher training, and educational materials for learners of all ages.',
  },
  {
    icon: IconHeartHandshake,
    title: 'Accessible Resources',
    description:
      'Help us keep guided meditations, wellness tools, and contemplative resources free and open to everyone.',
  },
];

export function DonatePage() {
  return (
    <Container size="xl" py="xl" className={classes.section}>
      {/* Hero */}
      <div className={classes.heroSection}>
        <Title order={1} className={classes.heroTitle}>
          Support Our Mission
        </Title>
        <Text className={classes.heroText}>
          The Mindfulness Center of Southern Utah is dedicated to fostering mindfulness and
          well-being in our community. Your generous donation helps us continue offering programs,
          resources, and events that make a real difference in people&apos;s lives.
        </Text>
        <Text className={classes.heroText}>
          Every contribution — no matter the size — supports our workshops, guided meditations,
          educational materials, and community partnerships. Thank you for helping us grow.
        </Text>
      </div>

      {/* Impact Cards */}
      <div className={classes.impactGrid}>
        {IMPACT_AREAS.map((area) => (
          <div key={area.title} className={classes.impactCard}>
            <area.icon size={40} stroke={1.5} className={classes.impactIcon} />
            <div className={classes.impactTitle}>{area.title}</div>
            <Text className={classes.impactText}>{area.description}</Text>
          </div>
        ))}
      </div>

      {/* Givebutter Widget */}
      <div className={classes.widgetSection}>
        <Title order={2} className={classes.widgetTitle}>
          Make Your Gift
        </Title>
        <givebutter-widget id="gKwwRg"></givebutter-widget>
      </div>

      {/* Closing */}
      <div className={classes.closingSection}>
        <Text className={classes.closingText}>
          Prefer ongoing support? Consider becoming a member to sustain our work year-round and
          unlock exclusive benefits.
        </Text>
        <Group justify="center">
          <Button component={Link} href="/membership" variant="outline" size="md">
            Become a Member
          </Button>
        </Group>
        <Text className={classes.closingNote}>
          The Mindfulness Center of Southern Utah is a 501(c)(3) nonprofit organization. Your
          donation may be tax-deductible to the extent allowed by law. Please consult your tax
          advisor for details.
        </Text>
      </div>
    </Container>
  );
}
