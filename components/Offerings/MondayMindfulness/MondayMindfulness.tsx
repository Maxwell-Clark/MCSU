'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconNotebook, IconUsers, IconCalendar, IconVideo } from '@tabler/icons-react';
import classes from './MondayMindfulness.module.css';

const features = [
  {
    icon: IconCalendar,
    title: 'Weekly Sessions',
    description: 'Join us every Monday to start your week with a guided mindfulness session.',
  },
  {
    icon: IconVideo,
    title: 'Virtual Meetups',
    description: 'Practice mindfulness from the comfort of your home through our virtual platform.',
  },
  {
    icon: IconNotebook,
    title: 'Mindfulness Techniques',
    description: 'Explore different mindfulness practices, including breathing exercises and meditation.',
  },
  {
    icon: IconUsers,
    title: 'Inclusive Community',
    description: 'Connect with a supportive community focused on personal growth and well-being.',
  },
];

export function MondayMindfulness() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'blue' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 7 }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
        <Title className={classes.title} order={2}>
            Monday Mindfulness: Start Your Week with Intention
          </Title>
          <Text c="dimmed">
            Join our weekly virtual mindfulness sessions every Monday. Together, we practice
            techniques to bring calm, focus, and positivity into our lives.
          </Text>
          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'blue' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Join Us
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
