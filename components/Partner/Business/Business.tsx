'use client';
import { Title, Text, Container, Paper, Stack, useMantineTheme } from '@mantine/core';
import classes from './Business.module.css';
import InfiniteScroll from '../../InfiniteScroll/InfiniteScroll';

const scroll_items = [
  {
    src: 'https://southernutahcares.com/wp-content/uploads/2014/07/SwitchPointLogo.png',
    alt: 'Switch Point',
  },
  {
    src: 'https://rescuesaltlake.org/wp-content/uploads/2019/09/logo-retina.png',
    alt: 'Rescue Salt Lake',
  },
  {
    src: 'data:image/jpeg;base64,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',
    alt: 'Nature 4',
  },
];

export function Business() {
  const theme = useMantineTheme();

  return (
    <Container size="xl" py="xl">
      <Paper 
        shadow="sm" 
        radius="md" 
        p="xl" 
        withBorder
        style={{ 
          backgroundColor: theme.colors.blue[0],
          borderLeft: `4px solid ${theme.colors.blue[6]}`
        }}
      >
        <Stack gap="xl">
          <div>
            <Title className={classes.title} order={2} ta="center">
              Business Partnerships
            </Title>
            <Text c="dimmed" className={classes.description} ta="center" mt="md">
              We are proud to partner with a variety of organizations and individuals to bring our programs to the community.
              Our partners include local businesses, schools, and civic organizations. Together, we are working to create a more mindful and compassionate community.
            </Text>
          </div>

          <div>
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}