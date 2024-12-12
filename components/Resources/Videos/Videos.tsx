'use client';

import React from 'react';
import { Card, Box, Image, Text, Group, Button, Title, Divider } from '@mantine/core';
import YouTubePlayer from '@/components/YoutubeComponent/YoutubeComponent';

const videos = [
    {
        title: 'A five minute meditation',
        description: 'Learn the basics of mindfulness and how to practice it.',
        videoId: '7WnZisfYMsE',
    },
    {
        title: 'Your Thoughts are Bubbles',
        description: 'Listen to renowned meditator and teacher Jon Kabbot Zin explain your thoughts.',
        videoId: 'w8Nsa45d0XE',
    },
    // Add more videos as needed
];

const Videos: React.FC = () => {
    return (
        <div>
            <Title order={2}>Videos</Title>
            {/* <Divider my="sm" /> */}
            {videos.map((video, index) => (
                <Box key={index} style={{ marginBottom: '20px' }}>
                    {/* <Card.Section>
                        <Image src={video.thumbnail} alt={video.title} />
                    </Card.Section> */}
                    <Group  style={{ marginBottom: 5, marginTop: 5 }}>
                        <Text >{video.title}</Text>
                    </Group>
                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                        {video.description}
                    </Text>
                    <YouTubePlayer videoId={video.videoId} title={video.title}/>
                </Box>
            ))}
        </div>
    );
};

export default Videos;