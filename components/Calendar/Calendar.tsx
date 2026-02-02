'use client';

import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import {
  Indicator,
  Tooltip,
  Box,
  Text,
  Paper,
  Stack,
  Title,
  Group,
  SegmentedControl,
  Badge,
} from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconUser,
  IconMapPin,
  IconLayoutGrid,
  IconLayoutList,
} from '@tabler/icons-react';
import { classes, getClassesByDay, dayNames } from '@/data/classData';
import styles from './Calendar.module.css';

type ViewMode = 'monthly' | 'weekly';

export function ClassCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get classes for selected date (based on day of week)
  const selectedDayClasses = selectedDate ? getClassesByDay(selectedDate.getDay()) : [];

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder className={styles.calendarPaper}>
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <IconCalendar size={24} />
          <Title order={4}>Class Schedule</Title>
        </Group>
        <SegmentedControl
          value={viewMode}
          onChange={(value) => setViewMode(value as ViewMode)}
          data={[
            {
              label: (
                <Group gap={4}>
                  <IconLayoutGrid size={16} />
                  <span className={styles.segmentLabel}>Monthly</span>
                </Group>
              ),
              value: 'monthly',
            },
            {
              label: (
                <Group gap={4}>
                  <IconLayoutList size={16} />
                  <span className={styles.segmentLabel}>Weekly</span>
                </Group>
              ),
              value: 'weekly',
            },
          ]}
          size="xs"
        />
      </Group>

      {viewMode === 'monthly' ? (
        <div className={styles.monthlyView}>
          <Calendar
            size="md"
            styles={{
              calendarHeader: {
                marginBottom: '0.5rem',
              },
              day: {
                fontSize: '0.9rem',
                height: '2.2rem',
              },
            }}
            getDayProps={(date) => ({
              onClick: () => setSelectedDate(new Date(date)),
            })}
            renderDay={(date) => {
              const dateObj = new Date(date);
              const dayOfWeek = dateObj.getDay();
              const dayClasses = getClassesByDay(dayOfWeek);
              const isSelected =
                selectedDate && dateObj.toDateString() === selectedDate.toDateString();

              if (dayClasses.length === 0) {
                return <div>{dateObj.getDate()}</div>;
              }

              const tooltipContent = (
                <Stack gap="xs">
                  {dayClasses.map((c) => (
                    <Group key={c.id} gap="xs">
                      <Indicator color={c.color} size={8} />
                      <Text size="sm" fw={500}>
                        {c.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {c.startTime}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              );

              return (
                <Tooltip withArrow withinPortal label={tooltipContent}>
                  <div className={isSelected ? styles.selectedDay : undefined}>
                    <Indicator color={dayClasses[0].color} offset={-2} size={8}>
                      <div>{dateObj.getDate()}</div>
                    </Indicator>
                  </div>
                </Tooltip>
              );
            }}
          />

          {selectedDate && selectedDayClasses.length > 0 && (
            <Box mt="md" className={styles.selectedDateDetails}>
              <Text size="sm" fw={600} mb="xs">
                {dayNames[selectedDate.getDay()]} Classes:
              </Text>
              <Stack gap="xs">
                {selectedDayClasses.map((c) => (
                  <ClassCard key={c.id} classEvent={c} compact />
                ))}
              </Stack>
            </Box>
          )}

          {selectedDate && selectedDayClasses.length === 0 && (
            <Box mt="md" className={styles.noClasses}>
              <Text size="sm" c="dimmed">
                No scheduled classes on {dayNames[selectedDate.getDay()]}s
              </Text>
            </Box>
          )}
        </div>
      ) : (
        <WeeklyView />
      )}
    </Paper>
  );
}

function WeeklyView() {
  // Get all days that have classes
  const daysWithClasses = [0, 1, 2, 3, 4, 5, 6].filter(
    (day) => getClassesByDay(day).length > 0
  );

  return (
    <Stack gap="md" className={styles.weeklyView}>
      {daysWithClasses.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl">
          No recurring classes scheduled
        </Text>
      ) : (
        daysWithClasses.map((dayOfWeek) => {
          const dayClasses = getClassesByDay(dayOfWeek);
          const firstClassColor = dayClasses[0].color;

          return (
            <Box
              key={dayOfWeek}
              p="md"
              className={styles.dayBlock}
              style={{
                borderLeftColor: `var(--mantine-color-${firstClassColor}-6)`,
              }}
            >
              <Text fw={700} size="md" mb="xs" c={`${firstClassColor}.7`}>
                {dayNames[dayOfWeek]}
              </Text>
              <Stack gap="xs">
                {dayClasses.map((c) => (
                  <ClassCard key={c.id} classEvent={c} />
                ))}
              </Stack>
            </Box>
          );
        })
      )}
    </Stack>
  );
}

interface ClassCardProps {
  classEvent: (typeof classes)[0];
  compact?: boolean;
}

function ClassCard({ classEvent, compact = false }: ClassCardProps) {
  return (
    <Box className={styles.classCard}>
      <Group gap="xs" justify="space-between" wrap="nowrap">
        <Group gap="xs" wrap="nowrap">
          <Indicator color={classEvent.color} size={8} />
          <Text fw={600} size={compact ? 'xs' : 'sm'}>
            {classEvent.title}
          </Text>
        </Group>
        <Badge size="xs" variant="light" color={classEvent.color}>
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
      </Group>

      {!compact && (
        <>
          <Group gap={4} mt={2}>
            <IconUser size={12} />
            <Text size="xs" c="dimmed">
              {classEvent.instructor}
            </Text>
          </Group>
          <Group gap={4} mt={2}>
            <IconMapPin size={12} />
            <Text size="xs" c="dimmed">
              {classEvent.location.name}
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mt={4} fs="italic">
            {classEvent.topic}
          </Text>
        </>
      )}
    </Box>
  );
}
