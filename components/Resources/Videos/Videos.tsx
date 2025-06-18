'use client';

import React from 'react';
import { Card, Box, Text, Group, Title, Container, Stack, useMantineTheme } from '@mantine/core';
import classes from './Videos.module.css';
import YouTubePlayer from '@/components/YoutubeComponent/YoutubeComponent';

const videos = [
    {
        title: 'How mindfulness changes the emotional life of our brains',
        description: 'Richard J. Davidson',
        videoId: '7CBfCW67xT8',
    },
    {
        title: 'The Power of Mindfulness: What You Practice Grows Stronger',
        description: 'Shauna Shapiro',
        videoId: 'IeblJdB2-Vo',
    },
    {
        title: 'The Three Components of Self-Compassion',
        description: 'Kristin Neff',
        videoId: '11U0h0DPu7k',
    },
    {
        title: 'The True Meaning of METTA',
        description: 'Sharon Salzberg',
        videoId: 'p117V-RQ_MA',
    },


    // Add more videos as needed
];

const Videos: React.FC = () => {
    const theme = useMantineTheme();

    return (
        <Container size="md" py="xl">
            <Title className={classes.title} ta="center" mb="xl">Videos</Title>
            
            <Stack gap="xl" align="center" style={{ maxWidth: 800, margin: '0 auto' }}>
                {videos.map((video, index) => (
                    <Card 
                        key={index} 
                        shadow="sm" 
                        radius="md" 
                        p="md" 
                        withBorder
                        style={{ 
                            width: '100%'
                        }}
                    >
                        <Box className={classes.video_container}>
                            <YouTubePlayer videoId={video.videoId} title={video.title}/>
                        </Box>
                        
                            <Title order={3} size="h4" c={theme.colors.dark[7]}>
                                {video.title}
                            </Title>
                            <Text size="sm" c="dimmed">
                                {video.description}
                            </Text>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default Videos;
