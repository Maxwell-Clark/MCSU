'use client';

import {
  IconLungs,
  IconEye,
  IconWind,
  IconHeartbeat,
  IconLungsOff,
  IconClock,
  IconRepeat,
  IconRefresh,
  IconBrain,
  IconHeart,
} from '@tabler/icons-react';
import {
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
  Title,
  Container,
} from '@mantine/core';
import classes from './BreathingExercise.module.css';

const mockdata = [
  { 
    title: 'Find a Comfortable Position', 
    description: 'Sit upright or lie down in a quiet space, with shoulders relaxed and hands resting on your lap or abdomen.',
    icon: IconHeart, 
    color: 'blue' 
  },
  { 
    title: 'Close Your Eyes', 
    description: 'Gently close your eyes or soften your gaze to minimize distractions and turn attention inward.',
    icon: IconEye, 
    color: 'indigo' 
  },
  { 
    title: 'Begin with Natural Breathing', 
    description: 'Inhale and exhale through your nose for a few breaths, noticing the natural rhythm without forcing it.',
    icon: IconWind, 
    color: 'cyan' 
  },
  { 
    title: 'Inhale Deeply', 
    description: 'Breathe in slowly through your nose for a count of 4, filling your belly and chest with air.',
    icon: IconLungs, 
    color: 'teal' 
  },
  { 
    title: 'Top Off the Breath', 
    description: 'At the end of the inhale, take a small extra sip of air to fully expand your lungs, feeling a slight stretch in your chest.',
    icon: IconLungsOff, 
    color: 'green' 
  },
  { 
    title: 'Pause Briefly', 
    description: 'Hold the breath for a count of 2, staying relaxed without straining.',
    icon: IconClock, 
    color: 'lime' 
  },
  { 
    title: 'Exhale Slowly', 
    description: 'Release the breath gently through your nose or mouth for a count of 6, letting go of tension as you empty your lungs completely.',
    icon: IconWind, 
    color: 'blue' 
  },
  { 
    title: 'Pause Again', 
    description: 'Rest at the end of the exhale for a count of 2, noticing the stillness before the next inhale.',
    icon: IconClock, 
    color: 'indigo' 
  },
  { 
    title: 'Repeat the Cycle', 
    description: 'Continue for 5–10 rounds, maintaining focus on the topping-off sensation and smooth, controlled breathing.',
    icon: IconRepeat, 
    color: 'cyan' 
  },
  { 
    title: 'Return to Natural Breathing', 
    description: 'After completing the cycles, let your breath return to its natural rhythm for a minute, observing any changes in calmness or awareness.',
    icon: IconRefresh, 
    color: 'teal' 
  },
];

export function BreathingExercise() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="sm" mt={7} fw={500}>
        {item.title}
      </Text>
      <Text size="xs" c="dimmed" mt={4} ta="center">
        {item.description}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Guided Breathing Exercise</Title>
      <Text size="lg" className={classes.description} mb="xl">
        Follow these steps to practice mindful breathing and promote relaxation
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items}
      </SimpleGrid>
    </Container>
  );
} 