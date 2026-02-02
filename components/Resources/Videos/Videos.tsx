'use client';

import React from 'react';
import { Box, Text, Title, Container, Stack } from '@mantine/core';
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
];

const Videos: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            {/* Gradient orbs */}
            <div className={classes.gradientOrbs}>
                <div className={classes.orb1} />
                <div className={classes.orb2} />
            </div>

            <Container size="md" className={classes.content}>
                <Title className={classes.title}>Videos</Title>

                <Stack gap="xl" align="center" style={{ maxWidth: 800, margin: '0 auto' }}>
                    {videos.map((video, index) => (
                        <Box
                            key={index}
                            className={classes.videoCard}
                            style={{ width: '100%' }}
                        >
                            <div className={classes.video_container}>
                                <YouTubePlayer videoId={video.videoId} title={video.title}/>
                            </div>
                            <div className={classes.cardContent}>
                                <Text className={classes.videoTitle}>
                                    {video.title}
                                </Text>
                                <Text className={classes.videoAuthor}>
                                    {video.description}
                                </Text>
                            </div>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </div>
    );
};

export default Videos;
