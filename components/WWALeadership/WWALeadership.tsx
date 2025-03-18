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
      title: 'Kirk A. Benson',
      name: 'Kirk A. Benson',
      category: 'Leadership',
      description: 'With Gael’s support and direction, I’ve developed a keen interest in providing mindfulness programs in the community where we live.  I’ve received training to teach mindfulness based stress reduction through Brown University and have completed the Mindfulness Meditation Teacher Certification Program with Tara Barach and Jack Kornfield.  But most importantly, I’ve developed a consistent personal practice.'
    },
    {
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
      title: 'Alieta Gael Benson',
      name: 'Alieta Gael Benson',
      description: 'I have been a practicing mother for 50 years.  I’ve discovered the importance of paying attention to what I experience – my friends, family, and community. A few years ago, I had the opportunity to visit with the Dalai Lama at his home and temple compound in Dharamsala, India.  Western scientists specializing in K-12 education presented to the Dalai Lama their research on the impact of mindfulness in education.  The Dalai Lama provided feedback in dialogue with the scientists. I was very impressed with the benefits mindfulness can provide our children and have since been a firm supporter of making mindfulness widely accessible.  Our efforts at the Mindfulness Center of Southern Utah is to that end.',
      category: 'Leadership',
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
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
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
