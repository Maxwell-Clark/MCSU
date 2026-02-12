'use client';

import { Text, Title, List, rem } from '@mantine/core';
import { type BrainRegionData } from './brainRegions';
import classes from './BrainRegionPanel.module.css';

interface BrainRegionPanelProps {
  region: BrainRegionData | null;
  isMobile: boolean;
}

export function BrainRegionPanel({ region, isMobile }: BrainRegionPanelProps) {
  if (!region) {
    return (
      <div className={classes.panel} aria-live="polite">
        <div className={classes.placeholder}>
          <Text className={classes.placeholderText}>
            {isMobile
              ? 'Tap a brain region to explore how meditation changes it.'
              : 'Hover over a brain region to explore how meditation changes it.'}
          </Text>
        </div>
      </div>
    );
  }

  const Icon = region.icon;

  return (
    <div className={classes.panel} aria-live="polite">
      <div className={`${classes.panelInner} ${classes.visible} ${classes[region.colorClass]}`}>
        <div className={classes.header}>
          <Icon style={{ width: rem(32), height: rem(32) }} stroke={1.5} className={classes.icon} />
          <Title order={4} className={classes.title}>
            {region.title}
            {region.abbreviation && (
              <span className={classes.abbreviation}> ({region.abbreviation})</span>
            )}
          </Title>
        </div>

        <div className={classes.changeSection}>
          <Text size="sm" fw={600} className={classes.changeLabel}>
            Change:
          </Text>
          <Text size="sm" className={classes.changeText}>
            {region.change}
          </Text>
        </div>

        <div className={classes.benefitsSection}>
          <Text size="sm" fw={600} className={classes.benefitsLabel}>
            Benefits:
          </Text>
          <List size="sm" className={classes.benefitsList}>
            {region.benefits.map((benefit) => (
              <List.Item key={benefit} className={classes.benefitItem}>
                {benefit}
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
