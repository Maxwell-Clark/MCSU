'use client';
import {
  Box,
  Container,
  Text,
  Button,
  Group,
  Card,
  Title,
  Stack,
  Divider,
  Collapse,
} from '@mantine/core';
import { useState } from 'react';
import classes from './WWAOverview.module.css';

export function WWAOverview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Container size={1000} className={classes.inner}>
        <Title order={1} ta="center" className={classes.title}>
          <Text component="span" variant="gradient" gradient={{ from: 'white', to: 'white' }} inherit>
            Overview
          </Text>
        </Title>
      </Container>

      <Card
        radius="lg"
        padding="xl"
        style={{
          backgroundColor: 'rgba(0, 128, 0, 0.15)',
          backdropFilter: 'blur(8px)',
          maxWidth: 900,
          margin: '3rem auto',
        }}
        shadow="lg"
        withBorder
      >
        <Stack >
          <Text
            size="md"
            fw={900}
            variant="gradient"
            gradient={{ from: 'white', to: 'white', deg: 90 }}
            style={{ lineHeight: 1.8 }}
          >
            The Mindfulness Center of Southern Utah exists to share the practice of mindfulness
            with our community. We envision a community motivated by compassion to wisely care
            for each other, fostering resilience, health, and character. While centered in Southern
            Utah, the borders of our community embrace all with whom we have contact. All are
            welcome to share in mindfulness.
          </Text>

          <Collapse in={expanded} transitionDuration={300}>
            <Divider variant="dashed" color="blue" my="md" />
            <Text
              size="md"
              fw={900}
              variant="gradient"
              gradient={{ from: 'white', to: 'white', deg: 90 }}
              style={{ lineHeight: 1.8 }}
            >
              To realize our vision, we are engaged in offering practical skills to train the mind and open the heart.
              The Chinese character for mindfulness is a combination of two characters: the top part represents “now”
              and the bottom part represents “heart”, indicating the alignment of the present moment with your heart and mind.
              <br /><br />
              MCSU is focused on training the mind and opening the heart to enhance the
              well-being of our community. The practical skills to accomplish this goal include
              increased self-awareness, improved attention and focus, enhanced emotional
              regulation, and better communication skills. We teach these skills through
              techniques like mindful breathing, focused awareness, body scans, and mindful
              walking. Training the mind and opening the heart helps individuals to be more
              present in the moment and to respond more intentionally to life’s experiences.
              <br /><br />
              As an organization, MCSU incorporates the truth that we become what we feel and
              think. If we think and act with a peaceful mind, then happiness follows. MCSU’s
              programs are supported by science and directed toward growth in the heart and
              mind. We foster a workplace with loving-kindness, compassion, sympathetic joy,
              and evenness.
            </Text>
          </Collapse>

          <Button
            variant="subtle"
            color="white"
            onClick={() => setExpanded((prev) => !prev)}
            style={{ alignSelf: 'center' }}
          >
            {expanded ? 'Show Less' : 'Learn More'}
          </Button>
        </Stack>
      </Card>

      <Container size={1000} style={{ margin: '3rem auto' }}>
        <Group justify="center" mt="md" mb="md">
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: 'blue', to: 'blue' }}
            radius="xl"
            style={{ paddingInline: '2rem' }}
          >
            Join Us
          </Button>
        </Group>
      </Container>
    </div>
  );
}

