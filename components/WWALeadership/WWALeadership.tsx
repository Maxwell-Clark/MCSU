'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';
import classes from './WWALeadership.module.css';
import { UserInfoIcons } from '../UserInfoIcons/UserInfoIcons';
import { useDisclosure } from '@mantine/hooks';

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
      name: 'Sarah Johnson',
      category: 'CEO',
      description: 'As the Chief Executive Officer, Sarah Johnson is the guiding force behind the company’s mission and vision. With years of leadership experience, she has a proven track record of navigating complex business landscapes, fostering innovation, and inspiring teams to reach new heights. Sarah’s passion for growth, combined with her forward-thinking strategy, helps steer the company toward sustainable success and ensures that every decision aligns with our core values and purpose.'
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
      title: 'Our Visionary CTO, Michael Lee',
      name: 'Michael Lee',
      description: 'As the Chief Technology Officer, Michael Lee is responsible for the company’s technical vision and strategy. With a background in software engineering and a passion for innovation, Michael leads the development of cutting-edge products and solutions that drive business growth and enhance customer experiences. His expertise in emerging technologies and commitment to excellence ensure that our products are always at the forefront of the industry.',
      category: 'CTO',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
      title: 'Head of Operations, Emily Davis',
      name: 'Emily Davis',
      description: 'As the Head of Operations, Emily Davis oversees the day-to-day activities that keep the company running smoothly. With a focus on efficiency and quality, Emily leads a team of dedicated professionals to ensure that our operations are streamlined, effective, and aligned with our strategic goals. Her commitment to excellence and passion for process improvement help drive the company forward and ensure that we deliver exceptional results to our customers.',
      category: 'Operations',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
      title: 'Marketing Director, David Wilson',
      name: 'David Wilson',
      description: 'As the Marketing Director, David Wilson is responsible for developing and executing the company’s marketing strategy. With a focus on brand awareness and customer engagement, David leads a team of creative professionals to drive growth and build lasting relationships with our customers. His innovative approach to marketing and deep understanding of consumer behavior help position the company as a leader in the industry.',
      category: 'Marketing Director',
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
      title: 'Finance Lead, Jessica Miller',
      name: 'Jessica Miller',
      description: 'As the Finance Lead, Jessica Miller oversees the company’s financial operations and strategy. With a background in finance and a keen eye for detail, Jessica ensures that our financial processes are efficient, accurate, and compliant with industry standards. Her expertise in financial analysis and reporting helps drive informed decision-making',
      category: 'Finance',
    }
  ];

export function WWALeadership() {
  const [opened, { close, open }] = useDisclosure(false);

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
        <UserInfoIcons onOpen={open} key={index} name={user.name} title={user.category} description={user.description} role={user.category} img={user.image}  opened={opened} onClose={close} />
      ))}
    </SimpleGrid>
  </Grid.Col>
</Grid>

    </div>
  );
}