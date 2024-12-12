import React from 'react';
import YouTube from 'react-youtube';
import { Paper, Text } from '@mantine/core';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
  const opts = {
    height: '405',
    width: '500',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Paper shadow="md" radius="md"  style={{ maxWidth: 720, margin: 'auto' }}>
      {/* <Text size="lg"  mb="xs">
        {title}
      </Text> */}
      <YouTube videoId={videoId} opts={opts} />
      
    </Paper>
  );
};

export default YouTubePlayer;
