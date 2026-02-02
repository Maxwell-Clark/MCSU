'use client';

import { Text, Title, Container, Box, rem, List } from '@mantine/core';
import {
  IconBrain,
  IconFocus,
  IconMoodSmile,
  IconHeartbeat,
  IconEye,
  IconNetwork,
} from '@tabler/icons-react';
import { useStaggeredAnimation } from '../../../hooks/useScrollAnimation';
import YouTubePlayer from '../../YoutubeComponent/YoutubeComponent';
import classes from './TrainingBrain.module.css';

interface BrainRegionData {
  title: string;
  abbreviation?: string;
  change: string;
  benefits: string[];
  icon: React.FC<any>;
  colorClass: string;
}

const BRAIN_REGIONS: BrainRegionData[] = [
  {
    title: 'Prefrontal Cortex',
    abbreviation: 'PFC',
    change: 'Increased gray matter density/thickness',
    benefits: ['Attention', 'Decision making', 'Self-awareness', 'Planning', 'Emotional control'],
    icon: IconBrain,
    colorClass: 'sage',
  },
  {
    title: 'Anterior Cingulate Cortex',
    abbreviation: 'ACC',
    change: 'Increased gray matter volume',
    benefits: ['Attention', 'Reduced DMN activity', 'Less mind-wandering'],
    icon: IconFocus,
    colorClass: 'purple',
  },
  {
    title: 'Hippocampus',
    change: 'Increased gray matter density, new neuron growth',
    benefits: ['Memory', 'Learning', 'Stress regulation'],
    icon: IconMoodSmile,
    colorClass: 'paleSage',
  },
  {
    title: 'Amygdala',
    change: 'Decreased gray matter volume/activity',
    benefits: ['Reduced stress/emotional reactivity', 'Improved emotional regulation'],
    icon: IconHeartbeat,
    colorClass: 'sage',
  },
  {
    title: 'Insula',
    change: 'Increased gray matter thickness/activation',
    benefits: ['Awareness of internal bodily states', 'Empathy', 'Self-awareness'],
    icon: IconEye,
    colorClass: 'purple',
  },
  {
    title: 'Default Mode Network',
    abbreviation: 'DMN',
    change: 'Reduced activity and connectivity',
    benefits: ['Decreased self-referential thoughts', 'Less mind-wandering', 'Reduced rumination'],
    icon: IconNetwork,
    colorClass: 'paleSage',
  },
];

function BrainRegionCard({ title, abbreviation, change, benefits, icon: Icon, colorClass, style }: BrainRegionData & { style?: React.CSSProperties }) {
  return (
    <Box className={`${classes.card} ${classes[colorClass]}`} style={style}>
      <div className={classes.cardHeader}>
        <Icon style={{ width: rem(32), height: rem(32) }} stroke={1.5} className={classes.icon} />
        <Title order={4} className={classes.cardTitle}>
          {title}
          {abbreviation && <span className={classes.abbreviation}> ({abbreviation})</span>}
        </Title>
      </div>
      <div className={classes.changeSection}>
        <Text size="sm" fw={600} className={classes.changeLabel}>Change:</Text>
        <Text size="sm" className={classes.changeText}>{change}</Text>
      </div>
      <div className={classes.benefitsSection}>
        <Text size="sm" fw={600} className={classes.benefitsLabel}>Benefits:</Text>
        <List size="sm" className={classes.benefitsList}>
          {benefits.map((benefit) => (
            <List.Item key={benefit} className={classes.benefitItem}>{benefit}</List.Item>
          ))}
        </List>
      </div>
    </Box>
  );
}

export function TrainingBrain() {
  const { ref, isVisible, getItemStyle } = useStaggeredAnimation({
    itemCount: BRAIN_REGIONS.length,
    staggerDelay: 100,
    threshold: 0.1,
  });

  return (
    <Container className={classes.wrapper} size="lg">
      {/* Background gradient orbs */}
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
      </div>

      <Title order={2} className={classes.sectionTitle}>
        Train the Mind
      </Title>
      <Text className={classes.tagline}>
        Research shows that regular mindfulness practice creates measurable changes in brain structure and function.
      </Text>

      <Box className={classes.grid} ref={ref as React.RefObject<HTMLDivElement>}>
        {BRAIN_REGIONS.map((region, index) => (
          <BrainRegionCard
            key={region.title}
            {...region}
            style={getItemStyle(index)}
          />
        ))}
      </Box>

      <Box className={classes.neuroplasticitySection}>
        <Title order={3} className={classes.neuroplasticityTitle}>
          Neuroplasticity
        </Title>
        <Text className={classes.neuroplasticityText}>
          Recent discoveries have shown that the brain reorganizes its structure and connections in response to stimulus. This is called neuroplasticity. Through directing our attention and managing our awareness, mindfulness can help shape the brain, creating stronger or new neural pathways.
        </Text>
        <Box className={classes.videoGrid}>
          <YouTubePlayer videoId="dmEOJyWVQj4" title="Neuroplasticity" />
          <YouTubePlayer videoId="7TN23YiGkAQ" title="Mindfulness and the Brain" />
        </Box>
      </Box>
    </Container>
  );
}
