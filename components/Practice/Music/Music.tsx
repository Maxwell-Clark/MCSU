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
import classes from './Music.module.css';

type MusicVideo = {
  title: string;
  artist?: string;
  duration?: string;
  videoId: string;
  category?: string;
};

type MusicGroup = {
  category: string;
  videos: MusicVideo[];
};

const musicSections: MusicGroup[] = [
  {
    category: 'melodic',
    videos: [
      {
        title: 'Your Smiling Face',
        artist: 'James Taylor',
        duration: '3:34 Minutes',
        videoId: 'ZSsfNlS42Cc',
        category: 'Melodic',
      },
      {
        title: 'Orinoco Flow',
        artist: 'Enya ',
        duration: '3:34 Minutes',
        videoId: 'LTrk4X9ACtw',
        category: 'Melodic',
      },
      {
        title: 'Why Worry?',
        artist: 'Clannad ',
        duration: '4:28 Minutes',
        videoId: '4Wns465rgGo',
        category: 'Melodic',
      },
    ],
  },
  {
    category: 'Meditation',
    videos: [
      {
        title: 'Life is Love',
        artist: 'Deuter',
        duration: '7:12 minutes',
        videoId: 'hc5q94wu1E8',
        category: 'Meditation',
      },
      {
        title: 'Grass Grows By Itself',
        artist: 'Deuter',
        duration: '7:14 minutes',
        videoId: 'gKLEmy4d2h0',
        category: 'Meditation',
      },
      {
        title: 'The Man Who Danced Too Slowly',
        artist: 'Baka Beyond',
        duration: '6:07 minutes',
        videoId: 'JSBRb7MFy30',
        category: 'Meditation',
      },
    ],
  },
  {
    category: 'Nature',
    videos: [
      {
        title: 'Ngombi',
        artist: 'Baka Beyond',
        duration: '4:53 minutes',
        videoId: '89PBXCp-MSI',
        category: 'Nature',
      },
      {
        title: 'Wilderness ',
        artist: 'Clannad',
        duration: '2:06 minutes',
        videoId: 'qg0ZkKEZLcs',
        category: 'Nature',
      },
      {
        title: 'Highway In the Sun',
        artist: 'Kohala',
        duration: '3:33 minutes',
        videoId: 'xuuqviYcZcU',
        category: 'Nature',
      },
    ],
  },
];

const Music: React.FC = () => {
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...musicSections.map(section => section.category.toLowerCase())];

  const filteredVideos = musicSections
    .filter(section => activeTab === 'all' || section.category.toLowerCase() === activeTab)
    .flatMap(section => section.videos)
    .filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="xl" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div>
          <Title className={classes.title} order={2} ta="center">
            Meditation Music
          </Title>
          <Text c="dimmed" className={classes.text} ta="center" mt="md">
            Explore our collection of calming music and nature sounds designed to enhance your meditation practice.
            Each track is carefully selected to help you find peace and focus.
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
          placeholder="Search music..."
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
              <div className={classes.audio_container}>
                <iframe
                  width="100%"
                  height="80"
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0`}
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
                    {video.artist && (
                      <Text size="sm" c="dimmed" className={classes.text}>
                        {video.artist}
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

export default Music;
