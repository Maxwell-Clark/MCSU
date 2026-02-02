'use client';

import dynamic from 'next/dynamic';
import { Container, Title, Text, Grid, Paper, Skeleton } from '@mantine/core';
import { ClassCalendar } from '@/components/Calendar/Calendar';
import styles from './OfferingsHero.module.css';

// Dynamic import for Leaflet map (requires browser APIs)
const ClassMap = dynamic(
  () => import('@/components/ClassMap/ClassMap').then((mod) => mod.ClassMap),
  {
    ssr: false,
    loading: () => (
      <Paper shadow="sm" radius="md" className={styles.mapPlaceholder}>
        <Skeleton height="100%" radius="md" />
      </Paper>
    ),
  }
);

export function OfferingsHero() {
  return (
    <div className={styles.hero}>
      <Container size="xl">
        <div className={styles.header}>
          <Title order={1} className={styles.title}>
            Offerings & Events
          </Title>
          <Text size="lg" className={styles.subtitle}>
            Find classes near you and explore our schedule
          </Text>
        </div>

        <Grid gutter="xl" className={styles.content}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={styles.mapContainer}>
              <Text fw={600} size="lg" mb="sm" className={styles.sectionTitle}>
                Class Locations
              </Text>
              <ClassMap />
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={styles.calendarContainer}>
              <ClassCalendar />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
