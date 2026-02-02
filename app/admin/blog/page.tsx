import { Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { BlogTable } from '@/components/Admin/BlogTable/BlogTable';
import { getBlogPosts } from '@/lib/actions/blog';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Blog Posts</Title>
            <Text c="dimmed" mt="xs">
              Manage your blog posts
            </Text>
          </div>
          <Button component={Link} href="/admin/blog/new" leftSection={<IconPlus size={16} />}>
            New Post
          </Button>
        </Group>

        <Paper withBorder radius="md">
          <BlogTable posts={posts} />
        </Paper>
      </Stack>
    </Container>
  );
}
