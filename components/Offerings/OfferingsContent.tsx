'use client';

import { useCallback } from 'react';
import { OfferingsHeroModern } from '@/components/Offerings/OfferingsHeroModern';
import { ScheduleHub } from '@/components/Offerings/ScheduleHub';
import { ClassEvent, ClassLocation } from '@/data/classData';

interface OfferingsContentProps {
  classes: ClassEvent[];
  locations: ClassLocation[];
}

export function OfferingsContent({ classes, locations }: OfferingsContentProps) {
  const handleScrollToSchedule = useCallback(() => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <OfferingsHeroModern onScrollToSchedule={handleScrollToSchedule} />

      <ScheduleHub classes={classes} locations={locations} />
    </>
  );
}
