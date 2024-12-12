'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';
import { CardsCarousel } from '@/components/Carousel/Carousel'
import classes from './WWALeadership.module.css';
import { UserInfoIcons } from '../UserInfoIcons/UserInfoIcons';

const features = [
  {
    icon: IconReceiptOff,
    title: 'Free and open source',
    description: 'All packages are published under MIT license, you can use Mantine in any project',
  },
  {
    icon: IconFileCode,
    title: 'TypeScript based',
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: IconCircleDotted,
    title: 'No annoying focus ring',
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: IconFlame,
    title: 'Flexible',
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];


const data = [
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
      title: 'Meet Our CEO, Sarah Johnson',
      category: 'CEO',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
      title: 'Our Visionary CTO, Michael Lee',
      category: 'CTO',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
      title: 'Head of Operations, Emily Davis',
      category: 'Operations',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
      title: 'Marketing Director, David Wilson',
      category: 'Marketing Director',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
      title: 'Finance Lead, Jessica Miller',
      category: 'Finance',
    }
  ];

export function WWALeadership() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
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
      MCSU Leadership Team
    </Title>
    <Text c="dimmed">
      Build fully functional accessible web applications faster than ever – Mantine includes
      more than 120 customizable components and hooks to cover you in any situation.
    </Text>
  </Grid.Col>

  <Grid.Col span={{ base: 12, md: 7 }}>
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
      {data.map((user, index) => (
        <UserInfoIcons key={index} name={user.title} role={user.category} img={user.image} />
      ))}
    </SimpleGrid>
  </Grid.Col>
</Grid>

    </div>
  );
}