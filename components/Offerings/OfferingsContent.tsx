'use client';

import { useCallback } from 'react';
import { OfferingsHeroModern } from '@/components/Offerings/OfferingsHeroModern';
import { ScheduleHub } from '@/components/Offerings/ScheduleHub';
import { ProgramTabs } from '@/components/Offerings/ProgramTabs';
import { ClassEvent, ClassLocation } from '@/data/classData';

interface OfferingsContentProps {
  classes: ClassEvent[];
  locations: ClassLocation[];
}

export function OfferingsContent({ classes, locations }: OfferingsContentProps) {
  const handleScrollToSchedule = useCallback(() => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToPrograms = useCallback(() => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <OfferingsHeroModern
        onScrollToSchedule={handleScrollToSchedule}
        onScrollToPrograms={handleScrollToPrograms}
      />

      <ScheduleHub classes={classes} locations={locations} />

      <ProgramTabs />
    </>
  );
}
