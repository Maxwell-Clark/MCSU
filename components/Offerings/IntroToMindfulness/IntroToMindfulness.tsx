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
  } from '@mantine/core';
  import { IconPlant2, IconBrain, IconLungs, IconHeart } from '@tabler/icons-react'; // Replace these with relevant icons
  import classes from './IntroToMindfulness.module.css';
  
  const mockdata = [
    {
      title: 'Mindful Breathing',
      description:
        'Take a few moments throughout the day to focus on your breathing. It helps calm the mind and brings you back to the present moment.',
      icon: IconLungs,
    },
    {
      title: 'Gratitude Practice',
      description:
        'Cultivate a sense of gratitude by reflecting on the positive aspects of your day, helping improve mood and overall well-being.',
      icon: IconHeart,
    },
    {
      title: 'Connecting with Nature',
      description:
        'Spend time outside to reconnect with nature. Observing your surroundings mindfully reduces stress and promotes inner peace.',
      icon: IconPlant2,
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
      </Card>
    ));
  
    return (
      <Container size="lg" py="xl" className={classes.wrapper}>
        <Group justify="center">
          <Badge variant="filled" size="lg" color="blue">
            Mindfulness Practices
          </Badge>
        </Group>
  
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Embrace Mindfulness in Your Everyday Life
        </Title>
  
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Discover simple mindfulness techniques to enhance your daily life, reduce stress, and promote well-being. Embrace the power of being present.
        </Text>
  
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
  
        <Container size="sm" mt="xl" ta="center">
          <Text fz="md" c="dimmed" mt="md">
            By practicing mindfulness, we can develop a greater awareness of our thoughts, emotions, and surroundings. These practices empower us to live more fully in each moment.
          </Text>
  
          <Button variant="gradient" gradient={{ from: 'blue', to: 'blue' }} size="lg" mt="xl">
            Join Us
          </Button>
        </Container>
      </Container>
    );
  }
  