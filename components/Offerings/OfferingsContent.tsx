'use client';

import { useCallback, useState } from 'react';
import { Modal } from '@mantine/core';
import { OfferingsHeroModern } from '@/components/Offerings/OfferingsHeroModern';
import { ScheduleHub } from '@/components/Offerings/ScheduleHub';
import { ProgramTabs } from '@/components/Offerings/ProgramTabs';
import { ClassCalendar } from '@/components/Calendar/Calendar';
import { ClassEvent, ClassLocation } from '@/data/classData';

interface ProgramData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  color: string;
  iconName: string;
  ctaText: string;
  learnMoreContent: string | null;
  features: {
    id: string;
    title: string;
    description: string | null;
    iconName: string;
    listItems: string | null;
    sortOrder: number;
  }[];
}

interface OfferingsContentProps {
  classes: ClassEvent[];
  locations: ClassLocation[];
  programs: ProgramData[];
}

export function OfferingsContent({ classes, locations, programs }: OfferingsContentProps) {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const handleScrollToSchedule = useCallback(() => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToPrograms = useCallback(() => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleClassClick = useCallback(() => {
    setCalendarModalOpen(true);
  }, []);

  const handleJoinProgram = useCallback(() => {
    setCalendarModalOpen(true);
  }, []);

  return (
    <>
      <OfferingsHeroModern
        onScrollToSchedule={handleScrollToSchedule}
        onScrollToPrograms={handleScrollToPrograms}
      />

      <ScheduleHub classes={classes} locations={locations} onClassClick={handleClassClick} />

      <ProgramTabs programs={programs} onJoinClick={handleJoinProgram} />

      <Modal
        opened={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        size="100%"
        styles={{
          header: {
            height: 0,
            minHeight: 0,
            margin: 0,
            padding: 0,
            overflow: 'hidden',
          },
        }}
      >
        <ClassCalendar classes={classes} />
      </Modal>
    </>
  );
}
