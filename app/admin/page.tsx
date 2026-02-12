import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  ThemeIcon,
  Stack,
  Paper,
  Button,
  Anchor,
} from '@mantine/core';
import {
  IconArticle,
  IconCalendar,
  IconSchool,
} from '@tabler/icons-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import classes from './admin.module.css';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [
    totalPosts,
    publishedPosts,
    totalClasses,
    activeClasses,
    totalPrograms,
    activePrograms,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.classEvent.count(),
    prisma.classEvent.count({ where: { active: true } }),
    prisma.program.count(),
    prisma.program.count({ where: { active: true } }),
  ]);

  return {
    totalPosts,
    publishedPosts,
    totalClasses,
    activeClasses,
    totalPrograms,
    activePrograms,
  };
}

async function getRecentActivity() {
  const recentPosts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 5,
    select: { id: true, title: true, updatedAt: true },
  });

  const items = recentPosts.map((p) => ({
    id: p.id,
    title: p.title,
    updatedAt: p.updatedAt,
    type: 'post' as const,
    href: `/admin/blog/${p.id}/edit`,
    icon: IconArticle,
  }));

  items.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  return items.slice(0, 5);
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentActivity = await getRecentActivity();

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.totalPosts,
      subtitle: `${stats.publishedPosts} published`,
      icon: IconArticle,
      color: 'sage',
      href: '/admin/blog',
    },
{
      title: 'Classes',
      value: stats.totalClasses,
      subtitle: `${stats.activeClasses} active`,
      icon: IconCalendar,
      color: 'teal',
      href: '/admin/classes',
    },
    {
      title: 'Programs',
      value: stats.totalPrograms,
      subtitle: `${stats.activePrograms} active`,
      icon: IconSchool,
      color: 'grape',
      href: '/admin/programs',
    },
  ];

  const quickActions = [
    { label: 'New Post', href: '/admin/blog/new', icon: IconArticle },
    { label: 'New Class', href: '/admin/classes/new', icon: IconCalendar },
    { label: 'New Program', href: '/admin/programs/new', icon: IconSchool },
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

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {statCards.map((stat) => (
            <Link key={stat.title} href={stat.href} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              padding="lg"
              radius="md"
              withBorder
              className={classes.statCard}
            >
              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Text size="xl" fw={700} mt="xs">
                    {stat.value}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {stat.subtitle}
                  </Text>
                </div>
                <ThemeIcon size={48} radius="md" variant="light" color={stat.color}>
                  <stat.icon size={28} stroke={1.5} />
                </ThemeIcon>
              </Group>
            </Card>
            </Link>
          ))}
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          {/* Recent Activity */}
          <Paper withBorder radius="md" p="md">
            <Title order={4} mb="md">
              Recent Activity
            </Title>
            {recentActivity.length > 0 ? (
              <Stack gap="sm">
                {recentActivity.map((item) => (
                  <Group key={`${item.type}-${item.id}`} justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" size="sm" color="gray">
                        <item.icon size={14} />
                      </ThemeIcon>
                      <Anchor href={item.href} size="sm" fw={500}>
                        {item.title}
                      </Anchor>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {timeAgo(item.updatedAt)}
                    </Text>
                  </Group>
                ))}
              </Stack>
            ) : (
              <Text c="dimmed" size="sm">
                No recent activity.
              </Text>
            )}
          </Paper>

          {/* Quick Actions */}
          <Paper withBorder radius="md" p="md">
            <Title order={4} mb="md">
              Quick Actions
            </Title>
            <SimpleGrid cols={2} spacing="sm">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  component="a"
                  href={action.href}
                  variant="light"
                  leftSection={<action.icon size={16} />}
                  fullWidth
                >
                  {action.label}
                </Button>
              ))}
            </SimpleGrid>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
