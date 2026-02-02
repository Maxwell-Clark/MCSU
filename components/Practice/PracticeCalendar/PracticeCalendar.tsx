'use client';

import React from 'react';
import { Badge, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconUser, IconMapPin } from '@tabler/icons-react';
import { getScheduledClasses, dayNames, ClassEvent } from '@/data/classData';
import classes from './PracticeCalendar.module.css';

const PracticeCalendar: React.FC = () => {
  const scheduledClasses = getScheduledClasses();

  // Sort classes by day of week
  const sortedClasses = [...scheduledClasses].sort(
    (a, b) => (a.dayOfWeek ?? 0) - (b.dayOfWeek ?? 0)
  );

  const getTypeColor = (type: ClassEvent['type']) => {
    switch (type) {
      case 'virtual':
        return 'blue';
      case 'in-person':
        return 'sage';
      case 'hybrid':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'var(--color-info)';
      case 'indigo':
        return 'var(--color-secondary)';
      case 'sage':
        return 'var(--color-primary)';
      case 'purple':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-primary)';
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
      </div>

      <Container size="md" className={classes.container}>
        <Title className={classes.title}>Weekly Class Schedule</Title>
        <Text className={classes.subtitle}>
          Join our drop-in meditation sessions. All levels welcome.
        </Text>

        <Stack gap="md" className={classes.classList}>
          {sortedClasses.map((classEvent) => (
            <Card
              key={classEvent.id}
              className={classes.classCard}
              style={{
                borderLeftColor: getBorderColor(classEvent.color),
              }}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <div className={classes.dayLabel}>
                  {dayNames[classEvent.dayOfWeek ?? 0]}
                </div>
                <Badge
                  color={getTypeColor(classEvent.type)}
                  variant="light"
                  size="sm"
                  className={classes.typeBadge}
                >
                  {classEvent.type}
                </Badge>
              </Group>

              <Title order={4} className={classes.classTitle}>
                {classEvent.title}
              </Title>

              <Text className={classes.classTime}>
                {classEvent.startTime} - {classEvent.endTime}
              </Text>

              <Group gap="lg" className={classes.classDetails}>
                <Group gap="xs">
                  <IconUser size={16} className={classes.detailIcon} />
                  <Text size="sm" className={classes.detailText}>
                    {classEvent.instructor}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={16} className={classes.detailIcon} />
                  <Text size="sm" className={classes.detailText}>
                    {classEvent.location.name}
                  </Text>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default PracticeCalendar;
