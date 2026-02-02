'use client';

import { useState } from 'react';
import { Container, Text, Button, Modal, ScrollArea, Group, rem } from '@mantine/core';
import { programs, Program, ProgramFeature } from '@/data/programData';
import styles from './ProgramTabs.module.css';

interface ProgramTabsProps {
  defaultTab?: string;
  onJoinClick?: (programId: string) => void;
}

export function ProgramTabs({ defaultTab = 'intro', onJoinClick }: ProgramTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  const activeProgram = programs.find((p) => p.id === activeTab) || programs[0];

  const getActiveTabClass = (color: string) => {
    const colorMap: Record<string, string> = {
      sage: styles.tabActiveSage,
      purple: styles.tabActivePurple,
      teal: styles.tabActiveTeal,
      blue: styles.tabActiveBlue,
    };
    return colorMap[color] || styles.tabActive;
  };

  return (
    <section id="programs" className={styles.section}>
      <Container size="xl">
        <div className={styles.header}>
          <h2 className={styles.title}>Our Programs</h2>
          <Text className={styles.subtitle}>
            From introductory courses to advanced practices, find the right path for your
            mindfulness journey
          </Text>
        </div>

        <div className={styles.tabsRoot}>
          {/* Tab List */}
          <div className={styles.tabsList} role="tablist">
            {programs.map((program) => {
              const Icon = program.icon;
              const isActive = activeTab === program.id;

              return (
                <button
                  key={program.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${program.id}`}
                  className={`${styles.tab} ${
                    isActive ? `${styles.tabActive} ${getActiveTabClass(program.color)}` : ''
                  }`}
                  onClick={() => setActiveTab(program.id)}
                >
                  <Icon className={styles.tabIcon} stroke={1.5} />
                  {program.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Tab Panel */}
          <div
            key={activeTab}
            role="tabpanel"
            id={`panel-${activeTab}`}
            className={styles.tabPanel}
          >
            <ProgramContent
              program={activeProgram}
              onJoinClick={() => onJoinClick?.(activeProgram.id)}
              onLearnMoreClick={
                activeProgram.learnMoreContent ? () => setLearnMoreOpen(true) : undefined
              }
            />
          </div>
        </div>
      </Container>

      {/* Learn More Modal for MBSR */}
      {activeProgram.learnMoreContent && (
        <Modal
          opened={learnMoreOpen}
          onClose={() => setLearnMoreOpen(false)}
          size="lg"
          title={`Research on ${activeProgram.shortTitle}`}
          centered
        >
          <ScrollArea h={400}>
            <div className={styles.learnMoreContent}>
              <Text className={styles.learnMoreText}>{activeProgram.learnMoreContent}</Text>
            </div>
          </ScrollArea>
        </Modal>
      )}
    </section>
  );
}

interface ProgramContentProps {
  program: Program;
  onJoinClick?: () => void;
  onLearnMoreClick?: () => void;
}

function ProgramContent({ program, onJoinClick, onLearnMoreClick }: ProgramContentProps) {
  const Icon = program.icon;

  return (
    <div className={styles.programContent}>
      <div className={styles.programOverview}>
        <Group gap="md" align="flex-start">
          <Icon
            style={{ width: rem(48), height: rem(48) }}
            stroke={1.5}
            color={`var(--mantine-color-${program.color}-6)`}
          />
          <div>
            <h3 className={styles.programTitle}>{program.title}</h3>
            <p className={styles.programTagline}>{program.tagline}</p>
          </div>
        </Group>

        <Text className={styles.programDescription}>{program.description}</Text>

        <Group gap="md" className={styles.programCta}>
          <Button
            variant="gradient"
            gradient={{ from: program.color, to: `${program.color}.7` }}
            size="lg"
            onClick={onJoinClick}
          >
            {program.ctaText}
          </Button>
          {onLearnMoreClick && (
            <Button variant="outline" color={program.color} size="lg" onClick={onLearnMoreClick}>
              Learn More
            </Button>
          )}
        </Group>
      </div>

      <div className={styles.featuresGrid}>
        {program.features.slice(0, 6).map((feature, index) => (
          <FeatureCard key={index} feature={feature} color={program.color} />
        ))}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  feature: ProgramFeature;
  color: string;
}

function FeatureCard({ feature, color }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className={styles.featureCard}>
      <Icon
        className={styles.featureIcon}
        stroke={1.5}
        color={`var(--mantine-color-${color}-6)`}
      />
      <h4 className={styles.featureTitle}>{feature.title}</h4>
      {feature.description && (
        <Text className={styles.featureDescription}>{feature.description}</Text>
      )}
      {feature.list && (
        <ul className={styles.featureList}>
          {feature.list.map((item, index) => (
            <li key={index} className={styles.featureListItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
