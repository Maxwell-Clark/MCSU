'use client';

import { ClassEvent } from '@/data/classData';
import styles from './ScheduleHub.module.css';

// 'all' or a specific ClassEvent id
export type CategoryFilter = 'all' | string;

interface ScheduleFiltersProps {
  classes: ClassEvent[];
  activeFilter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
}

export function ScheduleFilters({ classes, activeFilter, onFilterChange }: ScheduleFiltersProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.filtersGroup}>
        <span className={styles.filterLabel}>Filter by:</span>
        <button
          className={`${styles.filterChip} ${
            activeFilter === 'all' ? styles.filterChipActive : ''
          }`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        {classes.map((classEvent) => (
          <button
            key={classEvent.id}
            className={`${styles.filterChip} ${
              activeFilter === classEvent.id ? styles.filterChipActive : ''
            }`}
            style={
              activeFilter === classEvent.id
                ? {
                    background: `var(--mantine-color-${classEvent.color}-6)`,
                    borderColor: `var(--mantine-color-${classEvent.color}-6)`,
                  }
                : undefined
            }
            onClick={() => onFilterChange(classEvent.id)}
          >
            {classEvent.title}
          </button>
        ))}
      </div>
    </div>
  );
}
