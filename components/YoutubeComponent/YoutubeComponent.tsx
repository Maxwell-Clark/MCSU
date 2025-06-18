import React from 'react';
import YouTube from 'react-youtube';
import { Paper } from '@mantine/core';
import styles from './YouTubePlayer.module.css'; // We'll define .videoContainer in here

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    // <Paper shadow="md" radius="md" style={{ maxWidth: 1500, margin: 'auto' }}>
      <div >
        <YouTube  videoId={videoId} opts={opts} />
      </div>
    // </Paper>
  );
};

export default YouTubePlayer;
