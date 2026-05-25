'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container, Text, Paper, Skeleton, Modal, Button, Stack, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarOff, IconMapPin, IconVideo, IconClock } from '@tabler/icons-react';
import { ClassEvent, ClassLocation, dayNames } from '@/data/classData';
import { FeaturedClasses } from './FeaturedClasses';
import { ScheduleFilters, CategoryFilter } from './ScheduleFilters';
import styles from './ScheduleHub.module.css';

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

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
  classes: ClassEvent[];
  locations: ClassLocation[];
}

export function ScheduleHub({ classes, locations }: ScheduleHubProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [selected, setSelected] = useState<ClassEvent | null>(null);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  // In-person classes go straight to Google Maps; virtual/hybrid open a modal
  // (hybrid offers both directions and the join link).
  const handleJoinClick = (classEvent: ClassEvent) => {
    if (classEvent.type === 'in-person') {
      const query = classEvent.location.address || classEvent.location.name;
      window.open(mapsUrl(query), '_blank', 'noopener,noreferrer');
      return;
    }
    setSelected(classEvent);
    openModal();
  };

  // Filter classes by category
  const filteredClasses =
    categoryFilter === 'all'
      ? classes
      : classes.filter((c) => c.category === categoryFilter);

  // Derive visible locations from filtered classes
  const filteredLocationIds = new Set(filteredClasses.map((c) => c.location.id));
  const filteredLocations = locations.filter((l) => filteredLocationIds.has(l.id));

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

        <FeaturedClasses classes={classes} onClassClick={handleJoinClick} />

        <div id="calendar" className={styles.calendarEmbed}>
          <h3 className={styles.calendarHeading}>Upcoming Events</h3>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c8e66becd95ebd3f118ddf8a99bb2ca0dab0fa98ee1535e668d581cc336e7849%40group.calendar.google.com&ctz=America%2FDenver"
            className={styles.calendarIframe}
            title="MCSU Events Calendar"
          />
        </div>

        <hr className={styles.divider} />

        <ScheduleFilters
          activeCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <div className={styles.viewContent}>
          <div className={styles.mapWrapper} style={{ minHeight: '500px' }}>
            <ClassMap key={categoryFilter} classes={filteredClasses} locations={filteredLocations} />
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

      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={selected ? `Join ${selected.title}` : 'Join Class'}
        centered
      >
        {selected && (
          <Stack gap="md">
            <Group gap={6} c="dimmed">
              <IconClock size={16} />
              <Text size="sm">
                {selected.dayOfWeek != null ? `${dayNames[selected.dayOfWeek]}s` : 'TBD'}
                {' · '}
                {selected.startTime} - {selected.endTime}
              </Text>
            </Group>

            {selected.type === 'hybrid' && (
              <Button
                component="a"
                href={mapsUrl(selected.location.address || selected.location.name)}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                leftSection={<IconMapPin size={16} />}
                fullWidth
              >
                Get Directions
              </Button>
            )}

            {selected.meetingUrl ? (
              <Button
                component="a"
                href={selected.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<IconVideo size={16} />}
                fullWidth
              >
                Join Virtually
              </Button>
            ) : (
              <Text size="sm" c="dimmed">
                The meeting link hasn&rsquo;t been added yet. Please check the calendar above
                or contact us for the join link.
              </Text>
            )}
          </Stack>
        )}
      </Modal>
    </section>
  );
}
