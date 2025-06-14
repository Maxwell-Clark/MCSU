'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem, Modal } from '@mantine/core';
import { IconNotebook, IconUsers, IconCalendar, IconVideo } from '@tabler/icons-react';

import { useState } from 'react';

import classes from './MondayMindfulness.module.css';
import { ClassCalendar } from '@/components/Calendar/Calendar';

const features = [
  {
    icon: IconCalendar,
    title: 'Weekly Sessions',
    description: 'Join us every Monday evening @ 8:15pm to start your week with a guided mindfulness session.',
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

  
  const [calendarOpened, setCalendarOpen] = useState(false);

  function openCalendar() {
    setCalendarOpen(true);
  }
  
  function  closeCalendar() {
    setCalendarOpen(false)
  }

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
            Drop-in Mindfulness: Weekly Virtual Sessions
          </Title>
          <Text c="dimmed">
           Join our free virtual mindfulness sessions every Monday and Wednesday. 
    Kirk Benson hosts the Monday evening class, and Dr. David Tate leads the Wednesday session.
    Together, we practice techniques to bring calm, focus, and presence into our lives.
          </Text>
          <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'blue' }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={openCalendar}
          >
            Join Us
          </Button>
          <Modal opened={calendarOpened} onClose={closeCalendar} size='lg'>
            <ClassCalendar />
          </Modal>
        </Grid.Col>
      </Grid>
    </div>
  );
}
