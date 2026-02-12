'use client';

import React, { useState } from 'react';
import {
  Text,
  Group,
  Title,
  Stack,
  SimpleGrid,
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
    <div className={classes.wrapper}>
      <Stack align="center" gap="xl">
        <div>
          <Title className={classes.sectionTitle} order={2}>
            Guided Meditations
          </Title>
          <Text className={classes.tagline}>
            Explore our collection of guided meditations designed to help you cultivate mindfulness and inner peace.
            Each session is carefully crafted to support your practice, whether you're new to meditation or have been practicing for years.
          </Text>
        </div>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          className={classes.tabs}
          classNames={{
            list: classes.tabsList,
            tab: classes.tab,
          }}
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
          className={classes.searchInput}
          radius="lg"
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" style={{ width: '100%' }}>
          {filteredVideos.map((video, index) => (
            <div key={index} className={classes.videoCard}>
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
              <div className={classes.cardContent}>
                <Title order={3} className={classes.cardTitle}>
                  {video.title}
                </Title>
                <Group gap="xs">
                  {video.instructor && (
                    <Text size="sm" className={classes.text}>
                      Guided by {video.instructor}
                    </Text>
                  )}
                  {video.duration && (
                    <Badge className={classes.badge} variant="light">
                      {video.duration}
                    </Badge>
                  )}
                </Group>
              </div>
            </div>
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
};

export default Videos;
