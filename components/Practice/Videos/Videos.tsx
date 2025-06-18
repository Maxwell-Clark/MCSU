'use client';

import React, { useState } from 'react';
import {
  Card,
  Box,
  Text,
  Group,
  Title,
  Stack,
  Container,
  useMantineTheme,
  Tabs,
  TextInput,
  Badge,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './Videos.module.css';

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
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...videoSections.map(section => section.category.toLowerCase())];

  const filteredVideos = videoSections
    .filter(section => activeTab === 'all' || section.category.toLowerCase() === activeTab)
    .flatMap(section => section.videos)
    .filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="xl" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div>
          <Title className={classes.title} order={2} ta="center">
            Guided Meditations
          </Title>
          <Text c="dimmed" className={classes.text} ta="center" mt="md">
            Explore our collection of guided meditations designed to help you cultivate mindfulness and inner peace.
            Each session is carefully crafted to support your practice, whether you're new to meditation or have been practicing for years.
          </Text>
        </div>

        <Tabs 
          value={activeTab} 
          onChange={setActiveTab}
          mb="xl"
          style={{ width: '100%' }}
        >
          <Tabs.List>
            {categories.map((category) => (
              <Tabs.Tab 
                key={category} 
                value={category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>

        <TextInput
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          style={{ width: '100%' }}
          mb="xl"
        />

        <Stack gap="xl" style={{ width: '100%' }}>
          {filteredVideos.map((video, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              style={{ width: '100%' }}
            >
              <div className={classes.video_container}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <Group justify="space-between" mt="md">
                <Box>
                  <Title order={3} className={classes.title}>
                    {video.title}
                  </Title>
                  <Group gap="xs">
                    {video.instructor && (
                      <Text size="sm" c="dimmed" className={classes.text}>
                        Guided by {video.instructor}
                      </Text>
                    )}
                    {video.duration && (
                      <Badge color="blue" variant="light">
                        {video.duration}
                      </Badge>
                    )}
                  </Group>
                </Box>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Videos;
