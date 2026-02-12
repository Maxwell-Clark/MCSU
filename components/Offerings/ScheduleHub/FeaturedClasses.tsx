'use client';

import { Text } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { ClassEvent } from '@/data/classData';
import { ClassCard } from '../ClassCard';
import styles from './ScheduleHub.module.css';

interface FeaturedClassesProps {
  classes: ClassEvent[];
  onClassClick?: (classEvent: ClassEvent) => void;
}

export function FeaturedClasses({ classes, onClassClick }: FeaturedClassesProps) {
  // Get scheduled classes (ones with actual times)
  const scheduledClasses = classes.filter((c) => c.dayOfWeek !== undefined && c.dayOfWeek !== null);

  // Take the first 2-3 upcoming classes for featured display
  const featuredClasses = scheduledClasses.slice(0, 3);

  if (featuredClasses.length === 0) {
    return null;
  }

  return (
    <div className={styles.featuredSection}>
      <h3 className={styles.featuredTitle}>
        <IconStar size={24} className={styles.featuredIcon} />
        Upcoming Classes
      </h3>

      <div className={styles.featuredGrid}>
        {featuredClasses.map((classEvent) => (
          <ClassCard
            key={classEvent.id}
            classEvent={classEvent}
            variant="featured"
            onJoinClick={() => onClassClick?.(classEvent)}
          />
        ))}
      </div>

      {scheduledClasses.length === 0 && (
        <div className={styles.emptyState}>
          <Text c="dimmed">No upcoming classes scheduled at this time.</Text>
          <Text c="dimmed" size="sm" mt="xs">
            Check back soon for new class announcements.
          </Text>
        </div>
      )}
    </div>
  );
}
