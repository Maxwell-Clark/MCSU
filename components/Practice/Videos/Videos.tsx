'use client';

import React from 'react';
import {
  Card,
  Box,
  Text,
  Group,
  Title,
  Divider,
  Stack,
  Container,
} from '@mantine/core';
import YouTubePlayer from '@/components/YoutubeComponent/YoutubeComponent';

type Video = {
  title: string;
  instructor?: string;
  duration?: string;
  videoId: string;
};

type VideoGroup = {
  category: string;
  videos: Video[];
};

const videoSections: VideoGroup[] = [
  {
    category: 'Body Scan',
    videos: [
      {
        title: 'Body Scan Meditation',
        instructor: 'Jon Kabat-Zinn',
        duration: '29 minutes',
        videoId: '15q-N-_kkrU',
      },
      {
        title: 'Body Scan Practice',
        instructor: 'Mark Williams',
        duration: '14 minutes',
        videoId: 'CyKhfUdOEgs',
      },
    ],
  },
  {
    category: 'Focused Awareness',
    videos: [
      {
        title: 'Focused Awareness Meditation',
        instructor: 'Mark Williams',
        duration: '8 minutes',
        videoId: 'fUeEnkjKyDs',
      },
      {
        title: 'Breath Awareness with Jon Kabat-Zinn',
        duration: '10 minutes',
        videoId: '2GjZanuXWWk',
      },
      {
        title: 'Guided Breath Meditation',
        videoId: 'MUxwA1TDMnY',
      },
    ],
  },
  {
    category: 'Moving Meditation',
    videos: [
      {
        title: 'Walking Meditation',
        videoId: '4RPShl45ixc',
      },
      {
        title: 'Seated Yoga for Mindfulness',
        videoId: 'G8BsLlPE1m4',
      },
    ],
  },
  {
    category: 'Loving-Kindness',
    videos: [
      {
        title: 'Loving-Kindness Guided Practice',
        videoId: 'sz7cpV7ERsM',
      },
      {
        title: '10-Minute Loving-Kindness – Sharon Salzberg',
        videoId: 'VPZO58oWkkw',
      },
    ],
  },
  {
    category: 'Open Awareness',
    videos: [
      {
        title: 'Open Awareness Practice',
        videoId: 'ZKhzGwGb5Es',
      },
      {
        title: 'Guided Open Monitoring Meditation',
        videoId: 'VPZO58oWkkw',
      },
    ],
  },
];

const Videos: React.FC = () => {
  return (
    <Container size="lg" py="lg">
      <Title order={2} ta="center" mb="md">
        Guided Meditation Library
      </Title>

      <Divider my="md" />

      {videoSections.map((section, i) => (
        <Box key={i} mb="xl">
          <Title order={3} mb="sm">
            {section.category}
          </Title>
          <Stack gap="lg">
            {section.videos.map((video, j) => (
              <Card
                key={j}
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
                style={{ overflow: 'hidden' }}
              >
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>{video.title}</Text>
                  {video.duration && (
                    <Text size="sm" c="dimmed">
                      {video.duration}
                    </Text>
                  )}
                </Group>
                {video.instructor && (
                  <Text size="sm" c="dimmed" mb="xs">
                    Guided by {video.instructor}
                  </Text>
                )}
                <YouTubePlayer videoId={video.videoId} title={video.title} />
              </Card>
            ))}
          </Stack>
        </Box>
      ))}
    </Container>
  );
};

export default Videos;
