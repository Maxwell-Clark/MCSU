'use client';

import React from 'react';
import { Card, Title, Container, Text, Box, Stack } from '@mantine/core';

type Poem = {
  title: string;
  author: string;
  lines: string[];
};

const poems: Poem[] = [
  {
    title: 'Allow',
    author: 'Dana Faulds',
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
    lines: [
      'Admit something:',
      'Everyone you see, you say to them, “Love me.”',
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
    lines: [
      'This being human is a guest house.',
      'Every morning a new arrival.',
      'A joy, a depression, a meanness,',
      'some momentary awareness comes',
      'as an unexpected visitor.',
      'Welcome and entertain them all!',
      'Even if they’re a crowd of sorrows,',
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
  return (
	<Container>
	<Title ta='center' >Poems</Title> 
    <Box maw={900} mx="auto" mt="xl">
      <Stack >
        {poems.map((poem, index) => (
          <Card key={index} shadow="md" radius="md" p="lg" withBorder>
            <Title order={3} mb="xs">{poem.title}</Title>
            <Text size="sm" c="dimmed" mb="sm">
              {poem.author}
            </Text>
            <Text size="md" style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
              {poem.lines.join('\n')}
            </Text>
          </Card>
        ))}
      </Stack>
    </Box>
    </Container>
  );
};

export default PoemDisplay;

