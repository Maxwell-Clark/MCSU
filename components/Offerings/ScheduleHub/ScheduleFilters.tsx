'use client';

import styles from './ScheduleHub.module.css';

export type CategoryFilter = 'all' | 'intro' | 'mbsr' | 'everyday' | 'drop-in';

interface ScheduleFiltersProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
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
    </div>
  );
}
