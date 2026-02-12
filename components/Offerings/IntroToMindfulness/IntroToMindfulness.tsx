'use client';
import {
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    Button,
    rem,
    useMantineTheme,
    Overlay,
    List,
  } from '@mantine/core';
  import { IconBrain, IconBook, IconCalendar } from '@tabler/icons-react';
  import classes from './IntroToMindfulness.module.css';
  
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

    return (
      <>
        <div className={classes.wrapper}>
          <Overlay color={theme.colors.blue[7]} opacity={0.85} zIndex={1} />
          <div className={classes.inner}>
            <Title className={classes.title}>
              Introduction to Mindfulness
            </Title>

            <Container size={640}>
              <Text size="lg" className={classes.description}>
                This offering consists of one 90 minute class per week for six weeks. It is an introduction to mindfulness and follows the general design of MBSR, but isn't as rigorous in its homework requirements.
              </Text>
            </Container>
          </div>
        </div>

        <Container className={classes.content}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            {features}
          </SimpleGrid>

          <Container size="sm" mt="xl" ta="center">
            <Button variant="gradient" gradient={{ from: 'blue', to: 'blue' }} size="lg" mt="xl" component="a" href="/offerings">
              Join Us
            </Button>
          </Container>
        </Container>
      </>
    );
  }
  