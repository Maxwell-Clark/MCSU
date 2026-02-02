'use client';
import {
  Container,
  Text,
  Title,
  Stack,
  Divider,
  Collapse,
  Group,
  UnstyledButton,
  Button,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './WWAOverview.module.css';

export function WWAOverview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={classes.wrapper}>
      {/* Floating gradient orbs */}
      <div className={classes.orbContainer}>
        <div className={`${classes.orb} ${classes.orb1}`} />
        <div className={`${classes.orb} ${classes.orb2}`} />
        <div className={`${classes.orb} ${classes.orb3}`} />
      </div>

      <Container size={1000} className={classes.inner}>
        <Title order={1} ta="center" className={classes.title}>
          Overview
        </Title>
      </Container>

      <div className={classes.card} data-expanded={expanded || undefined}>
        <Stack>
          <Text className={classes.cardText}>
            The Mindfulness Center of Southern Utah exists to share the practice of mindfulness
            with our community. We envision a community motivated by compassion to wisely care
            for each other, fostering resilience, health, and character. While centered in Southern
            Utah, the borders of our community embrace all with whom we have contact. All are
            welcome to share in mindfulness.
          </Text>

          <Collapse in={expanded} transitionDuration={400} transitionTimingFunction="ease-out">
            <Divider className={classes.divider} my="md" />
            <Text className={classes.cardText}>
              To realize our vision, we are engaged in offering practical skills to train the mind and open the heart.
              The Chinese character for mindfulness is a combination of two characters: the top part represents "now"
              and the bottom part represents "heart", indicating the alignment of the present moment with your heart and mind.
            </Text>
            <Text className={classes.cardText} mt="md">
              MCSU is focused on training the mind and opening the heart to enhance the
              well-being of our community. The practical skills to accomplish this goal include
              increased self-awareness, improved attention and focus, enhanced emotional
              regulation, and better communication skills. We teach these skills through
              techniques like mindful breathing, focused awareness, body scans, and mindful
              walking. Training the mind and opening the heart helps individuals to be more
              present in the moment and to respond more intentionally to life's experiences.
            </Text>
            <Text className={classes.cardText} mt="md">
              As an organization, MCSU incorporates the truth that we become what we feel and
              think. If we think and act with a peaceful mind, then happiness follows. MCSU's
              programs are supported by science and directed toward growth in the heart and
              mind. We foster a workplace with loving-kindness, compassion, sympathetic joy,
              and evenness.
            </Text>
          </Collapse>

          <UnstyledButton
            className={classes.expandButton}
            onClick={() => setExpanded((prev) => !prev)}
            data-expanded={expanded || undefined}
          >
            <Group gap="xs">
              <span>{expanded ? 'Show Less' : 'Learn More'}</span>
              <IconChevronDown
                size={18}
                className={classes.chevron}
                data-expanded={expanded || undefined}
              />
            </Group>
          </UnstyledButton>
        </Stack>
      </div>

      <div className={classes.ctaContainer}>
        <Button
          size="lg"
          radius="xl"
          className={classes.ctaButton}
        >
          Join Us
        </Button>
      </div>
    </div>
  );
}
