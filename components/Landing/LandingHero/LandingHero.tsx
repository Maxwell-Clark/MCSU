'use client';

import { Container, Button, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import Image from 'next/image';
import { useDonateModal } from '../../Donate/DonateModal';
import classes from './LandingHero.module.css';

export function LandingHero() {
  const { open: openDonate } = useDonateModal();
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
            alt="Mindfulness Center of Southern Utah logo"
            width={400}
            height={112}
            priority
            className={classes.heroLogoHorizontal}
          />
          <Text className={classes.description} size="xl" mt="xl">
            "Training the Mind - Opening the Heart"
          </Text>

          <div className={classes.heroButtons}>
            <Button component="a" href="/membership" size="xl" radius="xl" className={classes.control}>
              Join Us
            </Button>
            <Button
              onClick={openDonate}
              size="xl"
              radius="xl"
              variant="outline"
              className={classes.donateControl}
            >
              Donate
            </Button>
          </div>
        </div>

        <button
          className={classes.scrollArrow}
          onClick={() =>
            document.getElementById('training-brain')?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll to next section"
        >
          <IconChevronDown size={36} stroke={2} />
        </button>
      </Container>
    </div>
  );
}
