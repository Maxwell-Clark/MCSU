'use client';

import React, { useState } from 'react';
import { Title } from '@mantine/core';
import classes from './Meditations.module.css';
import { BodyScan } from './BodyScan';
import { MindfulnessOfBreathing } from './Breathing';
import { Walking } from './Walking';
import { LovingKindness } from './LovingKindness';
import { OpenAwareness } from './OpenAwareness';

const MEDITATION_TYPES = [
  { key: 'bodyScan', label: 'Body Scan' },
  { key: 'breathing', label: 'Breathing' },
  { key: 'walking', label: 'Walking' },
  { key: 'lovingKindness', label: 'Loving-Kindness' },
  { key: 'openAwareness', label: 'Open Awareness' },
] as const;

type MeditationType = (typeof MEDITATION_TYPES)[number]['key'];

const Meditations: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MeditationType>('bodyScan');

  return (
    <div className={classes.wrapper}>
      <Title className={classes.title}>
        Meditation Instruction
      </Title>

      <div className={classes.typeSelector}>
        {MEDITATION_TYPES.map(({ key, label }) => (
          <button
            key={key}
            className={`${classes.typePill} ${selectedType === key ? classes.typePillActive : ''}`}
            onClick={() => setSelectedType(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className={classes.content}>
        {selectedType === 'bodyScan' && <BodyScan />}
        {selectedType === 'breathing' && <MindfulnessOfBreathing />}
        {selectedType === 'walking' && <Walking />}
        {selectedType === 'lovingKindness' && <LovingKindness />}
        {selectedType === 'openAwareness' && <OpenAwareness />}
      </div>
    </div>
  );
};

export default Meditations;
