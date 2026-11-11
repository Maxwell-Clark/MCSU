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
import { categoriesInOrder, type ContentItemView } from '@/lib/content-kinds';
import classes from './Videos.module.css';

interface VideosProps {
  /** Active practice videos, in display order (managed in Admin > Media & Resources) */
  items: ContentItemView[];
}

const Videos: React.FC<VideosProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const videos = items.filter((item) => item.youtubeId);
  const categories = ['all', ...categoriesInOrder(videos).map((category) => category.toLowerCase())];
  const query = searchQuery.toLowerCase();

  const filteredVideos = videos
    .filter((video) => activeTab === 'all' || video.category?.toLowerCase() === activeTab)
    .filter(
      (video) =>
        video.title.toLowerCase().includes(query) || video.creator?.toLowerCase().includes(query)
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

        {filteredVideos.length === 0 && (
          <Text c="dimmed" ta="center">
            {videos.length === 0 ? 'Videos are coming soon.' : 'No videos match your search.'}
          </Text>
        )}

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" style={{ width: '100%' }}>
          {filteredVideos.map((video) => (
            <div key={video.id} className={classes.videoCard}>
              <div className={classes.video_container}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
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
                  {video.creator && (
                    <Text size="sm" className={classes.text}>
                      Guided by {video.creator}
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
