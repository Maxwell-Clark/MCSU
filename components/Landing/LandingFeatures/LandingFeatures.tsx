import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconStars, IconMessage2, IconLock } from '@tabler/icons-react';
import classes from './LandingFeatures.module.css';

export const MOCKDATA = [
    {
      icon: IconGauge,
      title: 'Find Balance',
      description:
        'Create a space for inner calm and strength by reconnecting with yourself. Just like nature, you too can find harmony within.',
    },
    {
      icon: IconUser,
      title: 'Embrace Awareness',
      description:
        'In every moment, there’s an opportunity to breathe, observe, and let go. Presence is powerful, even in the simplest of acts.',
    },
    {
      icon: IconCookie,
      title: 'Nourish Yourself',
      description:
        'True mindfulness requires tending to both mind and body. Make time for nourishment that brings you joy and energy.',
    },
    {
      icon: IconStars,
      title: 'Practice Gratitude',
      description:
        'Embrace what each day brings with gratitude. Every experience, whether challenging or comforting, offers a lesson.',
    },
    {
      icon: IconMessage2,
      title: 'Connect with Others',
      description:
        'Mindfulness is enriched when shared. Find moments to connect, support, and listen to those around you with compassion.',
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

export function LandingFeatures() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Sit. Be Still. Breathe.</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
        In the midst of daily life, there are countless opportunities to pause, breathe, and reconnect. Each moment offers a chance to nourish your spirit and embrace calm.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}