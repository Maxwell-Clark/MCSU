'use client';
import { Box, Container, Text, Button, Group, Card, Title } from '@mantine/core';
import classes from './WWAOverview.module.css';

export function WWAOverview() {
  return (
    <div  className={classes.wrapper}>
      <Container size={1000} className={classes.inner}>
        <h1 className={classes.title}>
          {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'white' }} inherit>
          Learn More about MCSU 
          </Text>{' '}
          
        </h1>

<Card
  radius="md"
  padding="xl"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // semi-transparent white
    backdropFilter: 'blur(5px)', // softens what's behind
    maxWidth: 800,
    margin: '4rem auto 0 auto', 
  }}
>

    <Title order={3} mb="md" ta="center">
    Overview
  </Title>
  <Text size="md" style={{ lineHeight: 1.6 }}>
    The Mindfulness Center of Southern Utah exists to share the practice of mindfulness
    with our community. We envision a community motivated by compassion to wisely care
    for each other, fostering resilience, health, and character. While centered in Southern
    Utah, the borders of our community embrace all with whom we have contact. All are
    welcome to share in mindfulness.

    <br /><br />

    To realize our vision, we are engaged in offering practical skills to train the mind and open the heart.
    The Chinese character for mindfulness is a combination of two characters: the top part represents “now”
    and the bottom part represents “heart”, indicating the alignment of the present moment with your heart and mind.
  </Text>
</Card>        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'blue' }}
          >
            Join Us
          </Button>

          {/* <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button> */}
        </Group>
                <Card
        shadow="md"
        radius="md"
        padding="xl"
        withBorder
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // semi-transparent white
    backdropFilter: 'blur(5px)', // softens what's behind
    maxWidth: 800,
    margin: '4rem auto 0 auto', 
  }}
      >
        <Title order={3} mb="md"  ta="center">
          Training the Mind & Opening the Heart
        </Title>
        <Text size="md" color="dark.7" style={{ lineHeight: 1.7 }}>
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
      </Card>
      </Container>
    </div>

  );
}
