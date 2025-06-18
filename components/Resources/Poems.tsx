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
import classes from './Poems.module.css';

type Poem = {
  title: string;
  author: string;
  lines: string[];
  category?: string;
};

const poems: Poem[] = [
  {
    title: 'Allow',
    author: 'Dana Faulds',
    category: 'Mindfulness',
    lines: [
      'There is no controlling life.',
      'Try corralling a lightning bolt, containing a tornado.',
      'Dam a stream and it will create a new channel.',
      'Resist, and the tide will sweep you off your feet.',
      'Allow, and grace will carry you to higher ground.',
      'The only safety lies in letting it all in –',
      'the wild and the weak –',
      'fear, fantasies, failures, and success.',
      'When loss rips off the doors of the heart',
      'or sadness veils your vision with despair,',
      'practice becomes simply bearing the truth.',
      'In the choice to let go of your known way of being,',
      'the whole world is revealed to your new eyes.',
    ],
  },
  {
    title: 'With That Moon Language',
    author: 'Hafiz',
    category: 'Love',
    lines: [
      'Admit something:',
      'Everyone you see, you say to them, "Love me."',
      'Of course you do not do this out loud, otherwise',
      'Someone would call the cops.',
      'Still, though, think about this, this great pull in us to connect.',
      'Why not become the one who lives with a',
      'Full moon in each eye that is always saying,',
      'With that sweet moon language, what every other eye in',
      'This world is dying to hear?',
    ],
  },
  {
    title: 'St. Teresa of Avilla',
    author: 'St. Teresa',
    category: 'Wisdom',
    lines: [
      'Remember,',
      'if you want to make progress',
      '',
      'on the path',
      'and ascend to the places',
      'you have longed for,',
      'the important thing',
      'is not to think much',
      'but to love much,',
      'and so to do',
      'whatever',
      'best awakens you to love.',
    ],
  },
  {
    title: 'The Guest House',
    author: 'Rumi',
    category: 'Mindfulness',
    lines: [
      'This being human is a guest house.',
      'Every morning a new arrival.',
      'A joy, a depression, a meanness,',
      'some momentary awareness comes',
      'as an unexpected visitor.',
      'Welcome and entertain them all!',
      'Even if they\'re a crowd of sorrows,',
      'who violently sweep your house',
      'empty of its furniture,',
      'still, treat each guest honorably.',
      'He may be clearing you out',
      'for some new delight.',
      'The dark thought, the shame, the malice,',
      'meet them at the door laughing,',
      'and invite them in.',
      'Be grateful for whoever comes,',
      'because each has been sent',
      'as a guide from beyond.',
    ],
  },
  {
    title: 'Wild Geese',
    author: 'Mary Oliver',
    category: 'Mindfulness',
    lines: [
      'You do not have to be good.',
      'You do not have to walk on your knees',
      'for a hundred miles through the desert repenting.',
      'You only have to let the soft animal of your body',
      'love what it loves.',
      'Tell me about despair, yours, and I will tell you mine.',
      'Meanwhile the world goes on.',
      'Meanwhile the sun and the clear pebbles of the rain',
      'are moving across the landscapes,',
      'over the prairies and the deep trees,',
      'the mountains and the rivers.',
      'Meanwhile the wild geese, high in the clean blue air,',
      'are heading home again.',
      'Whoever you are, no matter how lonely,',
      'the world offers itself to your imagination,',
      'calls to you like the wild geese, harsh and exciting -',
      'over and over announcing your place',
      'in the family of things.',
    ],
  },
  {
    title: 'Your History is Here Inside Your Body',
    author: 'Martha Elliot',
    category: 'Mindfulness',
    lines: [
      'Your history is here inside your body.',
      'Your body is your storehouse',
      'Of learnings, feelings,',
      'Thoughts, and experiences.',
      'Only waiting to be invited to',
      'Reveal your treasures to yourself.',
      'Help yourself.',
      'As you let the learning emerge',
      'And take shape, you can',
      'Appreciate the wisdom of the body.',
      'Each cell alive with',
      'Spirit, emotion, and intelligence.',
      'Ready to help you at any moment,',
      'Always with you and for you.',
    ],
  },
];

const PoemDisplay: React.FC = () => {
  const theme = useMantineTheme();
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  const categories = ['all', 'mindfulness', 'love', 'wisdom'];

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
          {filteredPoems.map((poem, index) => (
            <Card 
              key={index} 
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

