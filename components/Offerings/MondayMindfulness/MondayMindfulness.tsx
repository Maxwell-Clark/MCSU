'use client';

import { Container, SimpleGrid, Text, ThemeIcon, Title, Overlay, useMantineTheme } from '@mantine/core';
import { IconCalendar, IconUsers, IconBrain, IconHeart, IconClock } from '@tabler/icons-react';
import classes from './MondayMindfulness.module.css';

const MOCKDATA = [
  {
    icon: IconCalendar,
    title: 'Weekly Virtual Session',
    description: "Monday Mindfulness is a 45 minute offering beginning at 8:00 pm each Monday evening. Join to receive our weekly news letter and an invitation to our virtual platform. Participation in the mindfulness session is completely voluntary, just drop in when you can.",
  },
  {
    icon: IconClock,
    title: 'Weekly In-person Session',
    description: "Wake-up Wednesday is an hour long offering beginning at 5:15 pm in the conference room of Dr. Tate's office. His address is 321 N. Mall Dr., Suite I-201, St. George, Utah. Just drop-in when you can.",
  },
  {
    icon: IconBrain,
    title: 'Mindfulness Techniques',
    description:
      'In both drop-in sessions, you have an opportunity to practice different mindfulness techniques like focused or open awareness, body scans, loving-kindness, and other meditations. We also discuss a mindfulness related topic like how the mind works, fostering joy, relationships, how to interact with difficult emotions, and many more.',
  },
  {
    icon: IconUsers,
    title: 'Mindful Community',
    description:
      'We have the opportunity each week to practice together and hear the thoughts and feelings of other practitioners in our community. These classes help to build friendships and community.',
  },
  {
    icon: IconHeart,
    title: 'Personal Practice',
    description:
      'Each week a drop-in class can be a reminder to continue your personal practice. It is an opportunity to deepen and strengthen your personal practice.',
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
        <Icon size={18} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7} fw={500}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function MondayMindfulness() {
  const theme = useMantineTheme();
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <>
      <div className={classes.wrapper}>
        <Overlay color={theme.colors.blue[7]} opacity={0.85} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Drop-in{' '}
            <Text component="span" inherit className={classes.highlight}>
              Mindfulness
            </Text>
          </Title>

          <Container size={560} p={0}>
            <Text size="lg" className={classes.description}>
              Monday Mindfulness is led by Kirk Benson and Wake-up Wednesday is led by Dr. David B. Tate.
            </Text>
          </Container>
        </div>
      </div>

      <Container className={classes.content}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 'xl', md: 50 }}
          verticalSpacing={{ base: 'xl', md: 50 }}
        >
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
}
