'use client';

import React from 'react';
import { Text, Group } from '@mantine/core';
import classes from './MP3.module.css';


const MP3: React.FC<{ mp3s: { title: string; description: string; src: string; }[] }> = ({ mp3s }) => {
  return (
    <div className={classes.wrapper}>

      {mp3s.map((mp3, index) => (
        <div key={index} className={classes.audio_container}>
          <Group style={{ marginBottom: 5, marginTop: 5 }}>
            <Text fw={700} size="lg">
              {mp3.title}
            </Text>
          </Group>

          <Text size="sm" style={{ lineHeight: 1.5, marginBottom: 5 }}>
            {mp3.description}
          </Text>

          {/* HTML Audio element */}
          <audio controls className={classes.audio_player}>
            <source src={mp3.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default MP3;
