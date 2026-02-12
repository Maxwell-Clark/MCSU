import { Container, Text, Title } from '@mantine/core';
import classes from './WWAOverview.module.css';

export function WWAOverview() {
  return (
    <div className={classes.wrapper}>
      <Container size={800}>
        <Text className={classes.label}>Our Mission</Text>
        <Title order={1} className={classes.title}>
          Who We Are
        </Title>
        <div className={classes.divider} />
        <Text className={classes.tagline}>
          Training the mind, opening the heart
        </Text>
        <Text className={classes.paragraph}>
          The Mindfulness Center of Southern Utah exists to share the practice of mindfulness
          with our community. We envision a community motivated by compassion to wisely care
          for each other, fostering resilience, health, and character. While centered in Southern
          Utah, the borders of our community embrace all with whom we have contact. All are
          welcome to share in mindfulness.
        </Text>
        <Text className={classes.paragraph}>
          To realize our vision, we are engaged in offering practical skills to train the mind
          and open the heart. MCSU is focused on training the mind and opening the heart to
          enhance the well-being of our community. The practical skills to accomplish this goal
          include increased self-awareness, improved attention and focus, enhanced emotional
          regulation, and better communication skills. We teach these skills through techniques
          like mindful breathing, focused awareness, body scans, and mindful walking.
        </Text>
      </Container>
    </div>
  );
}
