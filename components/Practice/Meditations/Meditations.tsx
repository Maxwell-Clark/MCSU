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
      <Title className={classes.title}>
        Meditation Instruction
      </Title>

        <BodyScan />
        <MindfulnessOfBreathing />
        <Walking />
        <LovingKindness />
        <OpenAwareness />
    </div>
  );
};

export default Meditations;

