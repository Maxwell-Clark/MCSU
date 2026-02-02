'use client';

import React from 'react';
import { Accordion, Card, Text, Title, Group } from '@mantine/core';
import classes from './Meditations.module.css';
import { BodyScan} from './BodyScan';
import { MindfulnessOfBreathing } from './Breathing'
import { Walking } from './Walking'
import { LovingKindness } from './LovingKindness'
import { OpenAwareness } from './OpenAwareness'

const Meditations: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      {/* Background gradient orbs */}
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
      </div>

      <Title className={classes.title}>
        Meditation Instruction
      </Title>

      <div className={classes.content}>
        <BodyScan />
        <MindfulnessOfBreathing />
        <Walking />
        <LovingKindness />
        <OpenAwareness />
      </div>
    </div>
  );
};

export default Meditations;
