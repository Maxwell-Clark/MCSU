import { Container, Button, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './LandingHero.module.css';

export function LandingHero() {
  return (
    <div className={classes.hero}>
      {/* Floating blob decorations */}
      <div className={classes.blobContainer}>
        <div className={`${classes.blob} ${classes.blob1}`} />
        <div className={`${classes.blob} ${classes.blob2}`} />
        <div className={`${classes.blob} ${classes.blob3}`} />
      </div>

      <Container className={classes.container} size="md">
        <div className={classes.textOverlay}>
          <Image
            src="/images/MCSU final deliverable_MCSU Horizontal White.png"
            alt="Mindfulness Center of Southern Utah"
            width={400}
            height={112}
            priority
            className={classes.heroLogoHorizontal}
          />
          <Text className={classes.description} size="xl" mt="xl">
            "Training the Mind - Opening the Heart"
          </Text>

          <Button size="xl" radius="xl" className={classes.control}>
            Donate
          </Button>
        </div>
      </Container>
    </div>
  );
}
