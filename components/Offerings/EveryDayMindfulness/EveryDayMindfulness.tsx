'use client';
import { ThemeIcon, Text, Title, Container, SimpleGrid, rem, Overlay, useMantineTheme } from '@mantine/core';
import { IconLungs, IconCloudDataConnection, IconCalendar, IconHeart, IconSun } from '@tabler/icons-react'; // Replace with suitable icons
import classes from './EveryDayMindfulness.module.css';
import { BreathingExercise } from '../MBSR/BreathingExercise';
import { STOPTechnique } from './STOPTechnique';
import { NatureConnection } from './NatureConnection';

export const MOCKDATA = [
  {
    icon: IconLungs,
    title: 'Mindful Breathing',
    description:
      'Take moments throughout the day to focus on your breath, grounding yourself in the present moment and calming your mind.',
  },
  {
    icon: IconCloudDataConnection,
    title: 'Connection with Nature',
    description:
      'Spend time outdoors and observe the sights, sounds, and smells around you. Nature offers a unique way to reconnect and reduce stress.',
  },
  {
    icon: IconCalendar,
    title: 'Daily Meditation',
    description:
      'Start or end your day with a few minutes of meditation. It can improve your focus, reduce anxiety, and foster inner peace.',
  },
  {
    icon: IconHeart,
    title: 'Gratitude Practice',
    description:
      'Take time to acknowledge the positive aspects of your day. Practicing gratitude can shift your perspective and improve well-being.',
  },
  {
    icon: IconSun,
    title: 'Mindful Awareness',
    description:
      'Observe your thoughts and emotions without judgment. Recognize them as passing experiences, helping you respond more calmly.',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function EveryDayMindfulness() {
  const theme = useMantineTheme();
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <>
      <div className={classes.wrapper}>
        <Overlay color={theme.colors.blue[7]} opacity={0.85} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Embrace{' '}
            <Text component="span" inherit className={classes.highlight}>
              Everyday Mindfulness
            </Text>
          </Title>

          <Container size={560} p={0}>
            <Text size="lg" className={classes.description}>
              Everyday mindfulness practices help reduce stress, enhance well-being, and bring more joy to your daily life.
            </Text>
          </Container>
        </div>
      </div>

      <Container className={classes.content}>
        <BreathingExercise />
        <STOPTechnique />
        <NatureConnection />
      </Container>
    </>
  );
}
