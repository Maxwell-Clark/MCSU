'use client';

import { Text } from '@mantine/core';
import { IconCalendar, IconBook, IconChevronDown } from '@tabler/icons-react';
import { OfferingsBlobs } from '../shared/OfferingsBlobs';
import styles from './OfferingsHeroModern.module.css';

interface OfferingsHeroModernProps {
  onScrollToSchedule?: () => void;
  onScrollToPrograms?: () => void;
}

export function OfferingsHeroModern({
  onScrollToSchedule,
  onScrollToPrograms,
}: OfferingsHeroModernProps) {
  const handleScrollToSchedule = () => {
    if (onScrollToSchedule) {
      onScrollToSchedule();
    } else {
      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPrograms = () => {
    if (onScrollToPrograms) {
      onScrollToPrograms();
    } else {
      document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.hero}>
      <OfferingsBlobs variant="minimal" />

      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>Offerings & Events</span>
        </h1>

        <Text className={styles.subtitle}>
          Discover mindfulness programs designed to reduce stress, cultivate awareness,
          and bring more peace to your daily life
        </Text>

        <div className={styles.pillsContainer}>
          <button
            className={`${styles.pill} ${styles.pillPrimary}`}
            onClick={handleScrollToSchedule}
          >
            <IconCalendar className={styles.pillIcon} />
            View Schedule
          </button>

          <button
            className={`${styles.pill} ${styles.pillSecondary}`}
            onClick={handleScrollToPrograms}
          >
            <IconBook className={styles.pillIcon} />
            Explore Programs
          </button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <Text className={styles.scrollText}>Scroll</Text>
        <IconChevronDown size={20} />
      </div>
    </div>
  );
}
