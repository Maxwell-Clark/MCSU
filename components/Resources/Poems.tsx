'use client';

import React, { useState } from 'react';
import {
  Card,
  Title,
  Container,
  Text,
  Box,
  Stack,
  Group,
  Button,
  ScrollArea,
  useMantineTheme,
  Tabs,
  Badge,
  Modal
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { categoriesInOrder, type ContentItemView } from '@/lib/content-kinds';
import classes from './Poems.module.css';

type Poem = {
  id: string;
  title: string;
  author: string;
  lines: string[];
  category?: string;
};

interface PoemDisplayProps {
  /** Active poems, in display order (managed in Admin > Media & Resources) */
  items: ContentItemView[];
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ items }) => {
  const theme = useMantineTheme();
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  const poems: Poem[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    author: item.creator ?? '',
    lines: (item.body ?? '').split('\n'),
    category: item.category ?? undefined,
  }));

  const categories = ['all', ...categoriesInOrder(items).map((category) => category.toLowerCase())];

  const filteredPoems = activeTab === 'all'
    ? poems
    : poems.filter(poem => poem.category?.toLowerCase() === activeTab);

  return (
    <Container size="xl" py="xl">
      <Title className={classes.title} ta="center" mb="xl">Poems</Title>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        mb="xl"
      >
        <Tabs.List>
          {categories.map((category) => (
            <Tabs.Tab
              key={category}
              value={category}
              leftSection={<IconHeart size={16} />}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <Box maw={1000} mx="auto">
        <Stack gap="xl">
          {filteredPoems.map((poem) => (
            <Card
              key={poem.id}
              shadow="sm"
              radius="md"
              p="xl"
              withBorder
              style={{
                borderLeft: `4px solid ${theme.colors.blue[6]}`,
                backgroundColor: theme.colors.blue[0]
              }}
            >
              <Group justify="space-between" mb="md">
                <Box>
                  <Title order={3} mb="xs" c={theme.colors.dark[7]}>
                    {poem.title}
                  </Title>
                  <Group gap="xs">
                    <Text size="sm" fw={500} c="dimmed">
                      {poem.author}
                    </Text>
                    {poem.category && (
                      <Badge color="blue" variant="light">
                        {poem.category}
                      </Badge>
                    )}
                  </Group>
                </Box>
                <Button
                  variant="subtle"
                  color="blue"
                  onClick={() => setSelectedPoem(poem)}
                >
                  Read Full Poem
                </Button>
              </Group>
              <Text
                size="md"
                style={{
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8,
                  color: theme.colors.dark[7]
                }}
              >
                {poem.lines.slice(0, 3).join('\n')}...
              </Text>
            </Card>
          ))}
        </Stack>
      </Box>

      <Modal
        opened={selectedPoem !== null}
        onClose={() => setSelectedPoem(null)}
        size="lg"
        centered
        styles={{
          header: {
            height: 0,
            minHeight: 0,
            margin: 0,
            padding: 0,
            overflow: 'hidden',
          },
          content: {
            backgroundColor: theme.white
          }
        }}
      >
        {selectedPoem && (
          <ScrollArea h={500}>
            <Box p="xl">
              <Title order={2} mb="xs" c={theme.colors.dark[7]}>
                {selectedPoem.title}
              </Title>
              <Text size="sm" fw={500} c="dimmed" mb="xl">
                {selectedPoem.author}
              </Text>
              <Text
                size="lg"
                style={{
                  whiteSpace: 'pre-line',
                  lineHeight: 2,
                  color: theme.colors.dark[7]
                }}
              >
                {selectedPoem.lines.join('\n')}
              </Text>
            </Box>
          </ScrollArea>
        )}
      </Modal>
    </Container>
  );
};

export default PoemDisplay;

