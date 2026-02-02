'use client';

import { Text, Title, Container, Box, rem } from '@mantine/core';
import {
  IconButterfly,
  IconFlower,
  IconLeaf,
  IconYoga,
  IconFeather,
  IconEye,
  IconHeartHandshake,
  IconWaveSine,
} from '@tabler/icons-react';
import classes from './AttitudesGrid.module.css';

interface TileData {
  title: string;
  description: string;
  icon: React.FC<any>;
  position: number;
  colorClass: string;
}

const ATTITUDES_DATA: TileData[] = [
  {
    position: 0,
    title: 'Patience',
    description: "Certain things can't be hurried but they do unfold in their time",
    icon: IconButterfly,
    colorClass: 'lightCyan',
  },
  {
    position: 1,
    title: "Beginner's Mind",
    description: 'See things as if for the first time, with openness, wonder and curiosity',
    icon: IconFlower,
    colorClass: 'lightCyan',
  },
  {
    position: 2,
    title: 'Acceptance',
    description: 'Actively, not passively, recognising that things are the way they are.',
    icon: IconLeaf,
    colorClass: 'teal',
  },
  {
    position: 3,
    title: 'Non-Striving',
    description:
      "Not seeking a special state or forcing an outcome. Just being fully 'with' the process, and accepting it.",
    icon: IconYoga,
    colorClass: 'teal',
  },
  {
    position: 5,
    title: 'Letting-Go',
    description:
      'Allow all experiences to pass, good, bad or neutral.. Not clinging, grasping, avoiding, or giving up.',
    icon: IconFeather,
    colorClass: 'lightCyan',
  },
  {
    position: 6,
    title: 'Non-Judgement',
    description:
      'Become aware of how we judge ourselves, others, thoughts and situations. And impartially witness.',
    icon: IconEye,
    colorClass: 'darkBlue',
  },
  {
    position: 7,
    title: 'Gratitude',
    description:
      'Intentionally feeling and expressing gratitude daily, to proactively nourish our health and wellbeing.',
    icon: IconHeartHandshake,
    colorClass: 'lightCyan',
  },
  {
    position: 8,
    title: 'Trust',
    description: 'Develop a basic trust in your feelings, intuition and capacity to heal.',
    icon: IconWaveSine,
    colorClass: 'teal',
  },
];

function AttitudeTile({ title, description, icon: Icon, position, colorClass }: TileData) {
  const cornerClass = [0, 2, 6, 8].includes(position)
    ? classes[`corner${position}` as keyof typeof classes]
    : '';

  return (
    <Box className={`${classes.tile} ${classes[colorClass]} ${cornerClass}`}>
      <Icon style={{ width: rem(40), height: rem(40) }} stroke={1.5} className={classes.icon} />
      <Title order={4} className={classes.tileTitle}>
        {title}
      </Title>
      <Text size="sm" className={classes.tileDescription}>
        {description}
      </Text>
      {position === 8 && (
        <Text size="xs" className={classes.subtitle}>
          Waking Waves
        </Text>
      )}
    </Box>
  );
}

function CenterTile() {
  return (
    <Box className={`${classes.tile} ${classes.centerTile}`}>
      <Title order={3} className={classes.centerTitle}>
        Attitudes of Mindfulness
      </Title>
    </Box>
  );
}

export function AttitudesGrid() {
  // Create array with 9 positions, inserting center tile at position 4
  const sortedTiles = [...ATTITUDES_DATA].sort((a, b) => a.position - b.position);

  return (
    <Container className={classes.wrapper} size="lg">
      <Text className={classes.tagline}>
        In the midst of daily life, there are countless opportunities to pause, breathe, and
        reconnect. Each moment offers a chance to train the mind and open the heart!
      </Text>
      <Box className={classes.gridWrapper}>
        <Box className={classes.grid}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => {
            if (pos === 4) {
              return <CenterTile key="center" />;
            }
            const tile = sortedTiles.find((t) => t.position === pos);
            return tile ? <AttitudeTile key={tile.title} {...tile} /> : null;
          })}
        </Box>
      </Box>
    </Container>
  );
}
