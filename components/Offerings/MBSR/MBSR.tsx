'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconLicense, IconBrain, IconMan, IconFirstAidKit } from '@tabler/icons-react'; // Replace these with relevant icons
import classes from './MBSR.module.css';

const features = [
  {
    icon: IconLicense,
    title: 'Evidence-Based Practice',
    description: 'MBSR is backed by research showing its effectiveness in reducing stress and improving well-being.',
  },
  {
    icon: IconBrain,
    title: 'Meditation and Mindfulness Techniques',
    description: 'Learn various meditation techniques, including mindful breathing, body scans, and mindful movement.',
  },
  {
    icon: IconMan,
    title: 'Focus on Body Awareness',
    description: 'Increase your awareness of physical sensations and reduce stress-related tension in the body.',
  },
  {
    icon: IconFirstAidKit,
    title: 'Enhances Overall Well-being',
    description: 'MBSR promotes a more balanced approach to life, fostering resilience and emotional regulation.',
  },
];

export function MBSR() {
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
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            Discover the Benefits of Mindfulness-Based Stress Reduction
          </Title>
          <Text c="dimmed">
            MBSR offers structured techniques to help you reduce stress, manage emotions, and improve overall well-being through mindfulness practices.
          </Text>

          {/* <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'green', to: 'teal' }}
            size="lg"
            radius="md"
            mt="xl"
          >
            Start Your Journey
          </Button> */}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
