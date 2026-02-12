'use client';

import React, { useState, useEffect } from 'react';
import { Container, Tabs, Text, Title } from '@mantine/core';
import { IconCalendar, IconBrain, IconVideo, IconMusic } from '@tabler/icons-react';
import PracticeCalendar from '@/components/Practice/PracticeCalendar/PracticeCalendar';
import Meditations from '@/components/Practice/Meditations/Meditations';
import Videos from '@/components/Practice/Videos/Videos';
import Music from '@/components/Practice/Music/Music';
import { ClassEvent } from '@/data/classData';
import classes from './PracticeDashboard.module.css';

const TAB_CONFIG = [
  { value: 'schedule', label: 'Schedule', icon: IconCalendar },
  { value: 'meditations', label: 'Meditations', icon: IconBrain },
  { value: 'videos', label: 'Videos', icon: IconVideo },
  { value: 'music', label: 'Music', icon: IconMusic },
] as const;

type TabValue = (typeof TAB_CONFIG)[number]['value'];

const VALID_TABS = new Set<string>(TAB_CONFIG.map((t) => t.value));

function getInitialTab(): TabValue {
  if (typeof window === 'undefined') return 'schedule';
  const hash = window.location.hash.replace('#', '');
  return VALID_TABS.has(hash) ? (hash as TabValue) : 'schedule';
}

interface PracticeDashboardProps {
  classEvents: ClassEvent[];
}

export default function PracticeDashboard({ classEvents }: PracticeDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabValue>(getInitialTab);

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Listen for popstate (browser back/forward)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.has(hash)) {
        setActiveTab(hash as TabValue);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleTabChange = (value: string | null) => {
    if (value && VALID_TABS.has(value)) {
      setActiveTab(value as TabValue);
    }
  };

  return (
    <div className={classes.shell}>
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
        <div className={classes.orb3} />
      </div>

      <Container size="lg" className={classes.container}>
        <div className={classes.header}>
          <Title className={classes.pageTitle}>Practice</Title>
          <Text className={classes.pageSubtitle}>
            Tools and resources for your meditation practice
          </Text>
        </div>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <div className={classes.tabBarWrap}>
            <Tabs.List grow className={classes.tabList}>
              {TAB_CONFIG.map(({ value, label, icon: Icon }) => (
                <Tabs.Tab
                  key={value}
                  value={value}
                  leftSection={<Icon size={18} stroke={1.5} />}
                  className={classes.tab}
                >
                  <span className={classes.tabLabel}>{label}</span>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </div>

          <div className={classes.content}>
            {/* Music uses display:none to keep YT player alive */}
            <div style={{ display: activeTab === 'music' ? 'block' : 'none' }}>
              <Music />
            </div>

            {activeTab !== 'music' && (
              <div key={activeTab} className={classes.fadeIn}>
                {activeTab === 'schedule' && <PracticeCalendar classEvents={classEvents} />}
                {activeTab === 'meditations' && <Meditations />}
                {activeTab === 'videos' && <Videos />}
              </div>
            )}

            {activeTab === 'music' && (
              <div key="music-fade" className={classes.fadeIn} style={{ display: 'none' }} />
            )}
          </div>
        </Tabs>
      </Container>
    </div>
  );
}
