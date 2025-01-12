'use client';

import React from 'react';
import { Title, Text, Group } from '@mantine/core';
import classes from './Music.module.css';
import MP3 from '../MP3/MP3';

const mp3s = [
  {
    title: 'Meditiation Music #1',
    description: 'Relax to the sounds of gentle ocean waves.',
    src: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
  },
  {
    title: 'Meditation Music #2',
    description: 'A short audio clip of soothing meditation bells.',
    src: 'https://www.example.com/path-to-your-file/meditation-bells.mp3',
  },
  // Add more audio entries as needed
];

const Music: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Title className={classes.title}>
        Music
      </Title>
      <MP3 mp3s={mp3s} />
    </div>
  );
};

export default Music;
