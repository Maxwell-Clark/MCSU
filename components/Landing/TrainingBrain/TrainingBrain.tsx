'use client';

import { useState } from 'react';
import { Text, Title, Container, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { BrainImage } from './BrainImage';
import { BrainRegionPanel } from './BrainRegionPanel';
import { getRegionData, type BrainRegionId } from './brainRegions';
import YouTubePlayer from '../../YoutubeComponent/YoutubeComponent';
import classes from './TrainingBrain.module.css';

export function TrainingBrain() {
  const [activeRegion, setActiveRegion] = useState<BrainRegionId | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<BrainRegionId | null>(null);
  const isMobile = useMediaQuery('(max-width: 62em)') ?? false;

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const displayedRegion = isMobile ? activeRegion : (hoveredRegion ?? activeRegion);

  const handleRegionClick = (id: BrainRegionId) => {
    setActiveRegion((prev) => (prev === id ? null : id));
  };

  const handleRegionHover = (id: BrainRegionId | null) => {
    setHoveredRegion(id);
  };

  return (
    <Container className={classes.wrapper} size="lg">
      {/* Background gradient orbs */}
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
      </div>

      <Title order={2} className={classes.sectionTitle}>
        Train the Mind
      </Title>
      <Text className={classes.tagline}>
        Research shows that regular mindfulness practice creates measurable changes in brain structure and function.
      </Text>

      <Box
        ref={ref as React.RefObject<HTMLDivElement>}
        className={classes.brainLayout}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease, transform 500ms ease',
        }}
      >
        <div className={classes.brainColumn}>
          <BrainImage
            activeRegion={activeRegion}
            hoveredRegion={hoveredRegion}
            onRegionHover={handleRegionHover}
            onRegionClick={handleRegionClick}
            isMobile={isMobile}
          />
        </div>
        <div className={classes.panelColumn}>
          <BrainRegionPanel
            region={displayedRegion ? getRegionData(displayedRegion) ?? null : null}
            isMobile={isMobile}
          />
        </div>
      </Box>

      <Box className={classes.neuroplasticitySection}>
        <Title order={3} className={classes.neuroplasticityTitle}>
          Neuroplasticity
        </Title>
        <div className={classes.neuroplasticityAccent} />
        <Text className={classes.neuroplasticityText}>
          Recent discoveries have shown that the brain reorganizes its structure and connections in response to stimulus. This is called neuroplasticity. Through directing our attention and managing our awareness, mindfulness can help shape the brain, creating stronger or new neural pathways.
        </Text>
        <Box className={classes.videoGrid}>
          <div className={classes.videoCard}>
            <div className={classes.videoEmbed}>
              <YouTubePlayer videoId="dmEOJyWVQj4" title="Neuroplasticity" />
            </div>
            <div className={classes.videoLabel}>
              <span className={classes.videoLabelDot} />
              Neuroplasticity
            </div>
          </div>
          <div className={classes.videoCard}>
            <div className={classes.videoEmbed}>
              <YouTubePlayer videoId="7TN23YiGkAQ" title="Mindfulness and the Brain" />
            </div>
            <div className={classes.videoLabel}>
              <span className={classes.videoLabelDot} />
              Mindfulness and the Brain
            </div>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
