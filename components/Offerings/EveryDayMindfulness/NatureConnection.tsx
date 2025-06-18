'use client';

import { Title, Text, Container, Accordion, ThemeIcon, rem } from '@mantine/core';
import { IconLeaf, IconWalk, IconEye, IconCalendar, IconBrain } from '@tabler/icons-react';
import classes from './NatureConnection.module.css';

const naturePractices = [
  {
    icon: IconLeaf,
    title: 'Sensory Engagement',
    content: 'Deliberately focusing on natural elements, such as the sound of wind, texture of leaves, or scent of pine, to anchor attention in the present moment and deepen environmental connection.',
  },
  {
    icon: IconWalk,
    title: 'Slow, Intentional Movement',
    content: 'Walking slowly through nature, often barefoot or with mindful steps, to heighten awareness of the ground and surroundings, similar to walking meditation mindfulness practice.',
  },
  {
    icon: IconEye,
    title: 'Awareness of Surroundings',
    content: 'Maintaining a relaxed, alert awareness of the environment, fostering a sense of unity with nature and heightened presence.',
  },
  {
    icon: IconCalendar,
    title: 'Seasonal Awareness',
    content: "Observing and appreciating seasonal changes, such as new growth in spring or autumn leaves, to cultivate gratitude and attunement to nature's cycles.",
  },
  {
    icon: IconBrain,
    title: 'Silent Contemplation',
    content: 'Sitting quietly in natural settings to observe thoughts and sensations while letting the environment guide a meditative state.',
  },
];

export function NatureConnection() {
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Connecting With Nature</Title>
      <Text size="lg" className={classes.description} mb="xl">
        Immersing oneself in an outdoors environment, especially in a forest, provides an opportunity to engage all your senses—sight, sound, smell, touch—to absorb the natural surroundings, reduce stress, and enhance mental clarity. Studies, like those in Scientific Reports (2019), show it lowers cortisol and boosts mood.
      </Text>

      <Accordion variant="separated" radius="md">
        {naturePractices.map((practice) => (
          <Accordion.Item key={practice.title} value={practice.title}>
            <Accordion.Control>
              <div className={classes.control}>
                <ThemeIcon size={34} radius="md">
                  <practice.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                </ThemeIcon>
                <Text fw={500}>{practice.title}</Text>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" c="dimmed">
                {practice.content}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
} 