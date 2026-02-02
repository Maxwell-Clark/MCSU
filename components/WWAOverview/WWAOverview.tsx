'use client';

import { Container, Text, Title, Box, Button, rem } from '@mantine/core';
import { IconBrain, IconHeart, IconUsers } from '@tabler/icons-react';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import classes from './WWAOverview.module.css';

interface ValueData {
  icon: React.FC<any>;
  title: string;
  description: string;
  colorClass: string;
}

const VALUES: ValueData[] = [
  {
    icon: IconBrain,
    title: 'Train the Mind',
    description:
      'Practical skills for self-awareness, attention, and emotional regulation through mindful breathing, body scans, and focused awareness.',
    colorClass: 'sage',
  },
  {
    icon: IconHeart,
    title: 'Open the Heart',
    description:
      'Fostering loving-kindness, compassion, sympathetic joy, and evenness in our workplace and community.',
    colorClass: 'purple',
  },
  {
    icon: IconUsers,
    title: 'Serve the Community',
    description:
      'Centered in Southern Utah, but embracing all with whom we have contact. All are welcome to share in mindfulness.',
    colorClass: 'paleSage',
  },
];

function ValueCard({
  icon: Icon,
  title,
  description,
  colorClass,
  style,
}: ValueData & { style?: React.CSSProperties }) {
  return (
    <Box className={`${classes.valueCard} ${classes[colorClass]}`} style={style}>
      <div className={classes.cardHeader}>
        <Icon
          style={{ width: rem(36), height: rem(36) }}
          stroke={1.5}
          className={classes.icon}
        />
        <Title order={4} className={classes.cardTitle}>
          {title}
        </Title>
      </div>
      <Text className={classes.cardDescription}>{description}</Text>
    </Box>
  );
}

export function WWAOverview() {
  const { ref, getItemStyle } = useStaggeredAnimation({
    itemCount: VALUES.length,
    staggerDelay: 120,
    threshold: 0.1,
  });

  return (
    <div className={classes.wrapper}>
      {/* Floating gradient orbs */}
      <div className={classes.orbContainer}>
        <div className={`${classes.orb} ${classes.orb1}`} />
        <div className={`${classes.orb} ${classes.orb2}`} />
        <div className={`${classes.orb} ${classes.orb3}`} />
      </div>

      <Container size={1000} className={classes.inner}>
        <Title order={1} ta="center" className={classes.title}>
          Who We Are
        </Title>
        <Text className={classes.tagline}>
          Training the mind, opening the heart
        </Text>
      </Container>

      {/* Mission Card - Glass morphism */}
      <div className={classes.missionCard}>
        <Text className={classes.missionText}>
          The Mindfulness Center of Southern Utah exists to share the practice of mindfulness
          with our community. We envision a community motivated by compassion to wisely care
          for each other, fostering resilience, health, and character.
        </Text>
      </div>

      {/* Values Grid */}
      <Container size="lg" className={classes.valuesContainer}>
        <Box className={classes.valuesGrid} ref={ref as React.RefObject<HTMLDivElement>}>
          {VALUES.map((value, index) => (
            <ValueCard key={value.title} {...value} style={getItemStyle(index)} />
          ))}
        </Box>
      </Container>

      <div className={classes.ctaContainer}>
        <Button size="lg" radius="xl" className={classes.ctaButton}>
          Join Us
        </Button>
      </div>
    </div>
  );
}
