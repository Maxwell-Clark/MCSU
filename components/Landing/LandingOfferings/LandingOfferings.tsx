"use client";

import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
  import classes from './LandingOfferings.module.css';

  const mockdata = [
    {
      title: 'Enhanced Focus',
      description:
        'Mindfulness trains your brain to stay present, helping you enhance focus and productivity in daily tasks. It’s like a mental workout to strengthen attention and clarity.',
      icon: IconGauge,
    },
    {
      title: 'Inner Peace',
      description:
        'Practicing mindfulness allows you to connect deeply with yourself, reducing stress and fostering a sense of inner calm and balance in your life.',
      icon: IconUser,
    },
    {
      title: 'Judgment-Free Awareness',
      description:
        'Mindfulness encourages a non-judgmental awareness of your thoughts and emotions, helping you observe without reacting, leading to better emotional resilience.',
      icon: IconCookie,
    },
  ];
  
  
  export function LandingOfferings() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon
          style={{ width: rem(50), height: rem(50) }}
          stroke={2}
          color={theme.colors.sage[5]}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
  
    return (
      <Container size="lg" py="xl">
        <Group justify="center">
          <Badge variant="filled" size="lg">
            Be Here Now
          </Badge>
        </Group>
  
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Join us During Our Offerings
        </Title>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          We meet regularly to discuss meditation and mindfulness topics and to sit together
        </Text>
  
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }