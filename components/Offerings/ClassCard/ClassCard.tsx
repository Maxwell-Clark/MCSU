'use client';

import { Box, Text, Badge, Group, Button, Stack } from '@mantine/core';
import { IconClock, IconUser, IconMapPin, IconCalendar } from '@tabler/icons-react';
import { ClassEvent, dayNames } from '@/data/classData';
import styles from './ClassCard.module.css';

export type ClassCardVariant = 'default' | 'featured' | 'compact' | 'list';

interface ClassCardProps {
  classEvent: ClassEvent;
  variant?: ClassCardVariant;
  onJoinClick?: () => void;
  showActions?: boolean;
}

// Color mapping for categories
const categoryColors: Record<string, string> = {
  intro: 'sage',
  mbsr: 'purple',
  everyday: 'teal',
  'drop-in': 'blue',
};

export function ClassCard({
  classEvent,
  variant = 'default',
  onJoinClick,
  showActions = false,
}: ClassCardProps) {
  const categoryColor = categoryColors[classEvent.category] || classEvent.color;
  const dayName = classEvent.dayOfWeek !== undefined ? dayNames[classEvent.dayOfWeek] : 'TBD';

  if (variant === 'featured') {
    return <FeaturedCard classEvent={classEvent} categoryColor={categoryColor} onJoinClick={onJoinClick} />;
  }

  if (variant === 'list') {
    return <ListCard classEvent={classEvent} categoryColor={categoryColor} dayName={dayName} />;
  }

  if (variant === 'compact') {
    return <CompactCard classEvent={classEvent} categoryColor={categoryColor} dayName={dayName} />;
  }

  // Default variant
  return (
    <div className={`${styles.cardWrapper}`}>
      <Box
        className={styles.accentStrip}
        style={{ backgroundColor: `var(--mantine-color-${categoryColor}-6)` }}
      />
      <div className={`${styles.card}`} style={{ paddingLeft: 'calc(var(--mantine-spacing-md) + 4px)' }}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <Text className={styles.title} size="md">
              {classEvent.title}
            </Text>
            {classEvent.topic && (
              <Text className={styles.topic} size="sm">
                {classEvent.topic}
              </Text>
            )}
          </div>
          <Badge size="sm" variant="light" color={categoryColor} className={styles.badge}>
            {classEvent.type}
          </Badge>
        </div>

        <Stack gap="xs" className={styles.details}>
          {classEvent.dayOfWeek !== undefined && (
            <div className={styles.detailItem}>
              <IconCalendar size={14} className={styles.detailIcon} />
              <Text size="sm">{dayName}s</Text>
            </div>
          )}
          <div className={styles.detailItem}>
            <IconClock size={14} className={styles.detailIcon} />
            <Text size="sm">
              {classEvent.startTime} - {classEvent.endTime}
            </Text>
          </div>
          <div className={styles.detailItem}>
            <IconUser size={14} className={styles.detailIcon} />
            <Text size="sm">{classEvent.instructor}</Text>
          </div>
          <div className={styles.detailItem}>
            <IconMapPin size={14} className={styles.detailIcon} />
            <Text size="sm">{classEvent.location.name}</Text>
          </div>
        </Stack>

        {showActions && (
          <div className={styles.actions}>
            <Button
              variant="light"
              color={categoryColor}
              size="sm"
              fullWidth
              onClick={onJoinClick}
            >
              Learn More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Featured variant component
function FeaturedCard({
  classEvent,
  categoryColor,
  onJoinClick,
}: {
  classEvent: ClassEvent;
  categoryColor: string;
  onJoinClick?: () => void;
}) {
  const dayName = classEvent.dayOfWeek !== undefined ? dayNames[classEvent.dayOfWeek] : 'TBD';

  return (
    <div className={`${styles.cardWrapper}`}>
      <Box
        className={styles.accentStrip}
        style={{ backgroundColor: `var(--mantine-color-${categoryColor}-6)` }}
      />
      <div className={`${styles.card} ${styles.featured}`} style={{ paddingLeft: 'calc(var(--mantine-spacing-xl) + 4px)' }}>
        <div className={styles.featuredContent}>
          <div className={styles.featuredInfo}>
            <Group gap="sm">
              <Badge size="md" variant="filled" color={categoryColor}>
                {classEvent.category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Badge>
              <Badge size="md" variant="light" color={categoryColor}>
                {classEvent.type}
              </Badge>
            </Group>

            <Text fw={700} size="xl" mt="xs">
              {classEvent.title}
            </Text>

            {classEvent.topic && (
              <Text c="dimmed" size="md" fs="italic">
                {classEvent.topic}
              </Text>
            )}

            <div className={styles.featuredMeta}>
              {classEvent.dayOfWeek !== undefined && (
                <Group gap={6}>
                  <IconCalendar size={16} />
                  <Text size="sm" fw={500}>
                    {dayName}s
                  </Text>
                </Group>
              )}
              <Group gap={6}>
                <IconClock size={16} />
                <Text size="sm" fw={500}>
                  {classEvent.startTime} - {classEvent.endTime}
                </Text>
              </Group>
              <Group gap={6}>
                <IconUser size={16} />
                <Text size="sm" fw={500}>
                  {classEvent.instructor}
                </Text>
              </Group>
              <Group gap={6}>
                <IconMapPin size={16} />
                <Text size="sm" fw={500}>
                  {classEvent.location.name}
                </Text>
              </Group>
            </div>
          </div>

          <Button
            variant="gradient"
            gradient={{ from: categoryColor, to: `${categoryColor}.7` }}
            size="lg"
            onClick={onJoinClick}
          >
            Join Class
          </Button>
        </div>
      </div>
    </div>
  );
}

// Compact variant component
function CompactCard({
  classEvent,
  categoryColor,
  dayName,
}: {
  classEvent: ClassEvent;
  categoryColor: string;
  dayName: string;
}) {
  return (
    <div className={`${styles.card} ${styles.compact}`}>
      <Group gap="xs" justify="space-between" wrap="nowrap">
        <Group gap="xs" wrap="nowrap">
          <Box
            w={8}
            h={8}
            style={{
              borderRadius: '50%',
              backgroundColor: `var(--mantine-color-${categoryColor}-6)`,
              flexShrink: 0,
            }}
          />
          <Text fw={600} size="sm" truncate>
            {classEvent.title}
          </Text>
        </Group>
        <Badge size="xs" variant="light" color={categoryColor}>
          {classEvent.type}
        </Badge>
      </Group>

      <Group gap="md" mt={4}>
        <Group gap={4}>
          <IconClock size={12} />
          <Text size="xs" c="dimmed">
            {classEvent.startTime} - {classEvent.endTime}
          </Text>
        </Group>
        {classEvent.dayOfWeek !== undefined && (
          <Text size="xs" c="dimmed">
            {dayName}s
          </Text>
        )}
      </Group>
    </div>
  );
}

// List variant component
function ListCard({
  classEvent,
  categoryColor,
  dayName,
}: {
  classEvent: ClassEvent;
  categoryColor: string;
  dayName: string;
}) {
  return (
    <div className={`${styles.card} ${styles.list}`}>
      <Box
        w={12}
        h={12}
        style={{
          borderRadius: '50%',
          backgroundColor: `var(--mantine-color-${categoryColor}-6)`,
          flexShrink: 0,
        }}
      />
      <div className={styles.listContent}>
        <div className={styles.listInfo}>
          <Text fw={600} size="sm">
            {classEvent.title}
          </Text>
          {classEvent.topic && (
            <Text size="xs" c="dimmed" truncate>
              {classEvent.topic}
            </Text>
          )}
        </div>

        <div className={styles.listMeta}>
          {classEvent.dayOfWeek !== undefined && (
            <Badge size="sm" variant="light" color={categoryColor}>
              {dayName}s
            </Badge>
          )}
          <Group gap={4}>
            <IconClock size={14} />
            <Text size="sm" c="dimmed">
              {classEvent.startTime}
            </Text>
          </Group>
          <Group gap={4}>
            <IconMapPin size={14} />
            <Text size="sm" c="dimmed">
              {classEvent.location.name}
            </Text>
          </Group>
        </div>
      </div>
    </div>
  );
}
