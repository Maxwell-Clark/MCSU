'use client';

import React from 'react';
import { Title, Text, Group } from '@mantine/core';
import classes from './Talks.module.css';
import MP3 from '../MP3/MP3';

const mp3s = [
  {
    title: 'Dharma Talk #1',
    description: 'Listen to a talk on the nature of suffering and how to overcome it.',
    src: 'https://www.example.com/path-to-your-file/ocean-waves.mp3',
  },
  {
    title: 'Dharma Talk #2',
    description: 'A talk on the importance of compassion and loving-kindness.',
    src: 'https://www.example.com/path-to-your-file/meditation-bells.mp3',
  },
  // Add more audio entries as needed
];

const Talks: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Title className={classes.title}>
        Talks
      </Title>
      <MP3 mp3s={mp3s} />
    </div>
  );
};

export default Talks;
