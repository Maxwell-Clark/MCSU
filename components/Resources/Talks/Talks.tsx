'use client';

import React from 'react';
import { Title, Text, Group } from '@mantine/core';
import classes from './Talks.module.css';
import MP3 from '../../Practice/MP3/MP3';

const mp3s = [
  {
    title: 'Stay with the breath',
    description: 'Stay with the breath.',
    src: 'https://www.dhammatalks.org/Archive/basics_collection/03%20Stay%20with%20the%20Breath.mp3',
  },
  {
    title: 'Breath by breath',
    description: 'A talk on the importance of compassion and loving-kindness.',
    src: 'https://www.dhammatalks.org/Archive/basics_collection/04%20Breath%20by%20Breath.mp3',
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
