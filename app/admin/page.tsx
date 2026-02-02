import { Container, Title, Text, SimpleGrid, Card, Group, ThemeIcon, Stack } from '@mantine/core';
import { IconArticle, IconCheck, IconFileText } from '@tabler/icons-react';
import { prisma } from '@/lib/prisma';
import classes from './admin.module.css';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
  ]);

  return { totalPosts, publishedPosts, draftPosts };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: IconArticle,
      color: 'sage',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: IconCheck,
      color: 'green',
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: IconFileText,
      color: 'yellow',
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>Dashboard</Title>
          <Text c="dimmed" mt="xs">
            Welcome to the MCSU admin dashboard
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {statCards.map((stat) => (
            <Card key={stat.title} padding="lg" radius="md" withBorder className={classes.statCard}>
              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Text size="xl" fw={700} mt="xs">
                    {stat.value}
                  </Text>
                </div>
                <ThemeIcon size={48} radius="md" variant="light" color={stat.color}>
                  <stat.icon size={28} stroke={1.5} />
                </ThemeIcon>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
