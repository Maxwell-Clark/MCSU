'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container, Text, Paper, Skeleton } from '@mantine/core';
import { IconCalendarOff } from '@tabler/icons-react';
import { ClassEvent, classes } from '@/data/classData';
import { FeaturedClasses } from './FeaturedClasses';
import { ScheduleFilters, CategoryFilter } from './ScheduleFilters';
import styles from './ScheduleHub.module.css';

// Dynamic import for Leaflet map (requires browser APIs)
const ClassMap = dynamic(
  () => import('@/components/ClassMap/ClassMap').then((mod) => mod.ClassMap),
  {
    ssr: false,
    loading: () => (
      <Paper shadow="sm" radius="md" p="xl" style={{ height: '400px' }}>
        <Skeleton height="100%" radius="md" />
      </Paper>
    ),
  }
);

interface ScheduleHubProps {
  onClassClick?: (classEvent: ClassEvent) => void;
}

export function ScheduleHub({ onClassClick }: ScheduleHubProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  // Filter classes by category
  const filteredClasses =
    categoryFilter === 'all'
      ? classes
      : classes.filter((c) => c.category === categoryFilter);

  return (
    <section id="schedule" className={styles.section}>
      <Container size="xl">
        <div className={styles.header}>
          <h2 className={styles.title}>Schedule & Locations</h2>
          <Text className={styles.subtitle}>
            Find a class that fits your schedule. We offer virtual, in-person, and hybrid options
            to make mindfulness accessible to everyone.
          </Text>
        </div>

        <FeaturedClasses onClassClick={onClassClick} />

        <hr className={styles.divider} />

        <ScheduleFilters
          activeCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <div className={styles.viewContent}>
          <div className={styles.mapWrapper} style={{ minHeight: '500px' }}>
            <ClassMap />
          </div>
        </div>

        {filteredClasses.length === 0 && (
          <div className={styles.emptyState}>
            <IconCalendarOff size={48} className={styles.emptyIcon} />
            <Text fw={500}>No classes found</Text>
            <Text size="sm" c="dimmed" mt="xs">
              Try adjusting your filters to see more classes.
            </Text>
          </div>
        )}
      </Container>
    </section>
  );
}
