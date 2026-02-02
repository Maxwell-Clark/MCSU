'use client';

import { useCallback, useState } from 'react';
import { Modal } from '@mantine/core';
import { OfferingsHeroModern } from '@/components/Offerings/OfferingsHeroModern';
import { ScheduleHub } from '@/components/Offerings/ScheduleHub';
import { ProgramTabs } from '@/components/Offerings/ProgramTabs';
import { ContactUs } from '@/components/ContactUs/ContactUs';
import { ClassCalendar } from '@/components/Calendar/Calendar';
import { ClassEvent } from '@/data/classData';

export default function OfferingsPage() {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const handleScrollToSchedule = useCallback(() => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScrollToPrograms = useCallback(() => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleClassClick = useCallback((classEvent: ClassEvent) => {
    setCalendarModalOpen(true);
  }, []);

  const handleJoinProgram = useCallback((programId: string) => {
    setCalendarModalOpen(true);
  }, []);

  return (
    <>
      <OfferingsHeroModern
        onScrollToSchedule={handleScrollToSchedule}
        onScrollToPrograms={handleScrollToPrograms}
      />

      <ScheduleHub onClassClick={handleClassClick} />

      <ProgramTabs onJoinClick={handleJoinProgram} />

      <div id="contact">
        <ContactUs />
      </div>

      {/* Calendar Modal for Join actions */}
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
        <ClassCalendar />
      </Modal>
    </>
  );
}
