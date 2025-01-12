'use client';

import React from 'react';
import { Title, Text, Group } from '@mantine/core';
import classes from './Meditations.module.css';
import MP3 from '../MP3/MP3';

const mp3s = [
  {
    title: 'Guided Meditation for Beginners',
    description: 'Learn the basics of mindfulness and how to practice it.',
    src: 'https://www.example.com/path-to-your-file/ocean-waves.mp3',
  },
  {
    title: 'Guided Meditation for Sleep',
    description: 'Listen to renowned meditator and teacher Jon Kabbot guide you to sleep.',
    src: 'https://www.example.com/path-to-your-file/meditation-bells.mp3',
  },
  {
    title: 'Guided Meditation for Anxiety',
    description: 'Listen to renowned meditator and teacher Jon Kabbot Zin help you with anxiety.',
    src: 'https://www.example.com/path-to-your-file/meditation-bells.mp3',
  },
  // Add more audio entries as needed
];

const Meditations: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Title className={classes.title}>
        Meditations
      </Title>
      <MP3 mp3s={mp3s} />
    </div>
  );
};

export default Meditations;
