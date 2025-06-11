'use client';

import {
  Title,
  SimpleGrid,
  Text,
  ThemeIcon,
  Grid,
  rem,
  Box,
  Stack,
  Divider,
  Paper,
  List,
  Card,
} from '@mantine/core';
import {
  IconLicense,
  IconBrain,
  IconMan,
  IconFirstAidKit,
} from '@tabler/icons-react';
import classes from './MBSR.module.css';

const features = [
  {
    icon: IconLicense,
    title: 'Evidence-Based Practice',
    description:
      'MBSR is backed by extensive scientific research demonstrating effectiveness for stress, chronic pain, and emotional health.',
  },
  {
    icon: IconBrain,
    title: 'Meditation & Mindfulness Techniques',
    description:
      'Practice mindful breathing, body scans, and gentle movement to cultivate present-moment awareness.',
  },
  {
    icon: IconMan,
    title: 'Focus on Body Awareness',
    description:
      'Learn to recognize tension, manage stress responses, and reconnect with your physical body.',
  },
  {
    icon: IconFirstAidKit,
    title: 'Holistic Well-being',
    description:
      'Improve emotional regulation, sleep, physical health, and overall resilience through consistent practice.',
  },
];

export function MBSR() {
  const items = features.map((feature) => (
    <Paper key={feature.title} shadow="xs" p="md" radius="md" withBorder>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'blue' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={600}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </Paper>
  ));

  return (
    <Box className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2} mb="sm">
            Discover the Benefits of Mindfulness-Based Stress Reduction (MBSR)
          </Title>
          <Text c="dimmed" mb="md">
            MBSR is a structured eight-week program developed by Jon Kabat-Zinn. It combines
            mindfulness practices and group learning to help individuals manage stress, pain,
            and emotional challenges.
          </Text>
          <Text size="sm">
            Originally created for patients unresponsive to traditional treatments, MBSR has
            expanded to support individuals worldwide. It is secular, evidence-based, and
            grounded in both science and experiential learning. The program includes weekly
            classes, a full-day retreat, and daily home practices.
          </Text>
        <Stack>
          <Title order={3} mt="sm">Science-Based Outcomes</Title>
          <Text size="sm" c="dimmed">
            MBSR is supported by hundreds of studies. In one study, adding MBSR to cardiac rehab
            reduced mortality by 41% over two years (Linden, 1996). It also shows strong outcomes for
            anxiety, depression (Khoury, 2013), and chronic pain (Anheyer et al., 2017).
          </Text>

          <Title order={3}>Well-being & Quality of Life</Title>
          <List size="sm" spacing="xs" center>
            <List.Item>Reducing stress and anxiety through awareness training</List.Item>
            <List.Item>Improving emotional regulation and self-compassion</List.Item>
            <List.Item>Supporting better sleep and physical health</List.Item>
            <List.Item>Increasing resilience and quality of life</List.Item>
          </List>
        </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

