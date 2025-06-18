'use client';
import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    Button,
    rem,
    useMantineTheme,
    Modal,
    Paper,
    List,
    Stack,
    Divider,
  } from '@mantine/core';
  import { IconPlant2, IconBrain, IconLungs, IconHeart, IconBook, IconSchool, IconCalendar } from '@tabler/icons-react';
  import classes from './IntroToMindfulness.module.css';
  import { ClassCalendar } from '../../Calendar/Calendar';
import { useState } from 'react';
  
  const mockdata = [
    {
      title: 'Mindfulness Techniques',
      icon: IconBook,
      list: [
        'Body Scan',
        'Focused Awareness',
        'Mindful Movement (yoga or walking)',
        'Loving Kindness',
        'Open Awareness'
      ]
    },
    {
      title: 'Mindfulness Teachings',
      description: 'The classes begin with a discussion of the body and its importance in helping us stay in the present moment. The classes also helps one understand the workings of the mind including our relationship to thoughts and emotions.',
      icon: IconBrain,
    },
    {
      title: 'Current Classes',
      description: 'Currently the class is taught through the Institute for Continuing Learning, part of the continuing learning program associated with Utah Tech University. The course is taught twice in the fall and twice in the winter semesters. The class can also be taught virtually.',
      icon: IconCalendar,
    },
  ];
  
  export function IntroToMindfulness() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon
          style={{ width: rem(50), height: rem(50) }}
          stroke={2}
          color={theme.colors.blue[6]}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
        {feature.list && (
          <List size="sm" spacing="xs" mt="md">
            {feature.list.map((item) => (
              <List.Item key={item}>
                <Text size="sm" c="dimmed">{item}</Text>
              </List.Item>
            ))}
          </List>
        )}
      </Card>
    ));

    const [calendarOpened, setCalendarOpen] = useState(false);

    function openCalendar() {
      setCalendarOpen(true);
    }
    
    function  closeCalendar() {
      setCalendarOpen(false)
    }
  
    return (
      <Container className={classes.wrapper}>
        <Title className={classes.title}>
          Introduction to Mindfulness
        </Title>

        <Container size={560} p={0}>
          <Text size="sm" className={classes.description}>
            This offering consists of one 90 minute class per week for six weeks. It is an introduction to mindfulness and follows the general design of MBSR, but isn't as rigorous in its homework requirements.
          </Text>
        </Container>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>

        <Container size="sm" mt="xl" ta="center">
          <Button variant="gradient" gradient={{ from: 'blue', to: 'blue' }} size="lg" mt="xl" onClick={openCalendar}>
            Join Us
          </Button>

          <Modal opened={calendarOpened} onClose={closeCalendar} size='lg'>
            <ClassCalendar />
          </Modal>
        </Container>
      </Container>
    );
  }
  