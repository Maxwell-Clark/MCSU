'use client';

import { type KeyboardEvent } from 'react';
import Image from 'next/image';
import { BRAIN_REGIONS, type BrainRegionId } from './brainRegions';
import classes from './BrainImage.module.css';

interface BrainImageProps {
  activeRegion: BrainRegionId | null;
  hoveredRegion: BrainRegionId | null;
  onRegionHover: (id: BrainRegionId | null) => void;
  onRegionClick: (id: BrainRegionId) => void;
  isMobile: boolean;
}

export function BrainImage({
  activeRegion,
  hoveredRegion,
  onRegionHover,
  onRegionClick,
  isMobile,
}: BrainImageProps) {
  const highlighted = hoveredRegion ?? activeRegion;

  const handleKeyDown = (id: BrainRegionId) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRegionClick(id);
    }
  };

  return (
    <div className={classes.container}>
      <Image
        src="/images/brain-sagittal.svg"
        alt="Sagittal cross-section of the human brain"
        width={295}
        height={326}
        className={classes.brainImage}
        priority
      />

      {/* Hotspot markers overlaid on the image */}
      {BRAIN_REGIONS.map((region) => {
        const isActive = highlighted === region.id;
        const label = region.abbreviation ?? region.title;

        return (
          <button
            key={region.id}
            className={`${classes.hotspot} ${classes[region.colorClass]}${isActive ? ` ${classes.active}` : ''}`}
            style={{
              left: `${region.hotspot.x}%`,
              top: `${region.hotspot.y}%`,
            }}
            aria-label={`${region.title} brain region`}
            aria-pressed={activeRegion === region.id}
            onMouseEnter={isMobile ? undefined : () => onRegionHover(region.id)}
            onMouseLeave={isMobile ? undefined : () => onRegionHover(null)}
            onClick={() => onRegionClick(region.id)}
            onKeyDown={handleKeyDown(region.id)}
          >
            <span className={classes.hotspotDot} />
            <span className={classes.hotspotLabel}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
