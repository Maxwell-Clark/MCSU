'use client';

import { SegmentedControl, Group } from '@mantine/core';
import { IconCalendar, IconMap } from '@tabler/icons-react';
import styles from './ScheduleHub.module.css';

export type CategoryFilter = 'all' | 'intro' | 'mbsr' | 'everyday' | 'drop-in';
export type ViewMode = 'calendar' | 'map';

interface ScheduleFiltersProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const categories: { value: CategoryFilter; label: string; colorClass: string }[] = [
  { value: 'all', label: 'All', colorClass: '' },
  { value: 'intro', label: 'Intro', colorClass: 'filterChipIntro' },
  { value: 'mbsr', label: 'MBSR', colorClass: 'filterChipMbsr' },
  { value: 'everyday', label: 'Everyday', colorClass: 'filterChipEveryday' },
  { value: 'drop-in', label: 'Drop-in', colorClass: 'filterChipDropin' },
];

export function ScheduleFilters({
  activeCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}: ScheduleFiltersProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.filtersGroup}>
        <span className={styles.filterLabel}>Filter by:</span>
        {categories.map((category) => (
          <button
            key={category.value}
            className={`${styles.filterChip} ${
              activeCategory === category.value ? styles.filterChipActive : ''
            } ${activeCategory === category.value && category.colorClass ? styles[category.colorClass] : ''}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className={styles.viewToggle}>
        <SegmentedControl
          value={viewMode}
          onChange={(value) => onViewModeChange(value as ViewMode)}
          data={[
            {
              label: (
                <Group gap={6}>
                  <IconCalendar size={16} />
                  <span>Calendar</span>
                </Group>
              ),
              value: 'calendar',
            },
            {
              label: (
                <Group gap={6}>
                  <IconMap size={16} />
                  <span>Map</span>
                </Group>
              ),
              value: 'map',
            },
          ]}
          size="sm"
        />
      </div>
    </div>
  );
}
