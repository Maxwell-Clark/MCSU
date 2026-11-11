'use client';

import React from 'react';
import { Box, Text, Title, Container, Stack } from '@mantine/core';
import classes from './Videos.module.css';
import YouTubePlayer from '@/components/YoutubeComponent/YoutubeComponent';
import type { ContentItemView } from '@/lib/content-kinds';

interface VideosProps {
    /** Active resource videos, in display order (managed in Admin > Media & Resources) */
    items: ContentItemView[];
}

const Videos: React.FC<VideosProps> = ({ items }) => {
    const videos = items.filter((item) => item.youtubeId);
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
                    {videos.map((video) => (
                        <Box
                            key={video.id}
                            className={classes.videoCard}
                            style={{ width: '100%' }}
                        >
                            <div className={classes.video_container}>
                                <YouTubePlayer videoId={video.youtubeId!} title={video.title}/>
                            </div>
                            <div className={classes.cardContent}>
                                <Text className={classes.videoTitle}>
                                    {video.title}
                                </Text>
                                {video.creator && (
                                    <Text className={classes.videoAuthor}>
                                        {video.creator}
                                    </Text>
                                )}
                            </div>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </div>
    );
};

export default Videos;
