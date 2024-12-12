import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from '@mantine/core';
import { IconLungs, IconCloudDataConnection, IconCalendar, IconHeart, IconSun } from '@tabler/icons-react'; // Replace with suitable icons
import classes from './EveryDayMindfulness.module.css';

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
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Embrace Everyday Mindfulness</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Everyday mindfulness practices help reduce stress, enhance well-being, and bring more joy to your daily life.
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
