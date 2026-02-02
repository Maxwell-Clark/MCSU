'use client';

import { Text, Title, Container, Box, rem } from '@mantine/core';
import {
  IconHeart,
  IconSparkles,
  IconMoodSmile,
  IconScale,
  IconShield,
  IconEyeHeart,
  IconMoodSad,
  IconFlame,
  IconCloudRain,
} from '@tabler/icons-react';
import classes from './OpeningHeart.module.css';

interface EmotionalBenefit {
  title: string;
  description: string;
  icon: React.FC<any>;
}

interface CategoryData {
  title: string;
  colorClass: string;
  benefits: EmotionalBenefit[];
}

const CATEGORIES: CategoryData[] = [
  {
    title: 'Cultivating Positive Emotions',
    colorClass: 'sage',
    benefits: [
      {
        title: 'Compassion',
        description: 'Strengthens empathy toward self and others',
        icon: IconHeart,
      },
      {
        title: 'Gratitude',
        description: 'Amplifies appreciation for small experiences',
        icon: IconSparkles,
      },
      {
        title: 'Calmness/Serenity',
        description: 'Promotes peace and emotional stability',
        icon: IconMoodSmile,
      },
    ],
  },
  {
    title: 'Emotional Regulation',
    colorClass: 'purple',
    benefits: [
      {
        title: 'Equanimity',
        description: 'Maintains balance during challenges',
        icon: IconScale,
      },
      {
        title: 'Resilience',
        description: 'Improves recovery from negative emotions',
        icon: IconShield,
      },
      {
        title: 'Self-Awareness',
        description: 'Better recognition of emotional states',
        icon: IconEyeHeart,
      },
    ],
  },
  {
    title: 'Reducing Difficult Emotions',
    colorClass: 'paleSage',
    benefits: [
      {
        title: 'Anxiety & Fear',
        description: 'Decreases anxious responses',
        icon: IconMoodSad,
      },
      {
        title: 'Anger',
        description: 'Fosters calmer responses',
        icon: IconFlame,
      },
      {
        title: 'Sadness/Rumination',
        description: 'Reduces self-referential negative thinking',
        icon: IconCloudRain,
      },
    ],
  },
];

function BenefitItem({ title, description, icon: Icon }: EmotionalBenefit) {
  return (
    <Box className={classes.benefitItem}>
      <Icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} className={classes.benefitIcon} />
      <div className={classes.benefitContent}>
        <Text fw={600} className={classes.benefitTitle}>{title}</Text>
        <Text size="sm" className={classes.benefitDescription}>{description}</Text>
      </div>
    </Box>
  );
}

function CategoryColumn({ title, colorClass, benefits }: CategoryData) {
  return (
    <Box className={`${classes.category} ${classes[colorClass]}`}>
      <Title order={4} className={classes.categoryTitle}>{title}</Title>
      <div className={classes.benefitsList}>
        {benefits.map((benefit) => (
          <BenefitItem key={benefit.title} {...benefit} />
        ))}
      </div>
    </Box>
  );
}

export function OpeningHeart() {
  return (
    <Container className={classes.wrapper} size="lg">
      <Title order={2} className={classes.sectionTitle}>
        Opening the Heart
      </Title>
      <Text className={classes.tagline}>
        Not only does mindfulness help sculpt the brain, it leads to an open spaciousness where the heart can flourish. Mindfulness practices like loving-kindness, body awareness, gratitude exercises, and visualization all help develop open heartedness, strengthening wholesome emotions and weakening the power of emotions that threaten our well-being.
      </Text>
      <Box className={classes.grid}>
        {CATEGORIES.map((category) => (
          <CategoryColumn key={category.title} {...category} />
        ))}
      </Box>
    </Container>
  );
}
