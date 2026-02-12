'use client';

import { useState } from 'react';
import { Table, Badge, ActionIcon, Group, Text, Menu, Anchor, TextInput } from '@mantine/core';
import { IconEdit, IconTrash, IconDots, IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteBlogPost, toggleBlogPostPublished } from '@/lib/actions/blog';
import classes from './BlogTable.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  createdAt: Date;
  author: {
    name: string | null;
  };
}

interface BlogTableProps {
  posts: BlogPost[];
}

export function BlogTable({ posts }: BlogTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(id);
      router.refresh();
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    await toggleBlogPostPublished(id, !currentStatus);
    router.refresh();
  };

  const filtered = posts.filter((post) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.slug.toLowerCase().includes(q) ||
      (post.category && post.category.toLowerCase().includes(q)) ||
      (post.author.name && post.author.name.toLowerCase().includes(q))
    );
  });

  const rows = filtered.map((post) => (
    <Table.Tr key={post.id}>
      <Table.Td>
        <Anchor component={Link} href={`/admin/blog/${post.id}/edit`} fw={500}>
          {post.title}
        </Anchor>
        <Text size="xs" c="dimmed">
          /{post.slug}
        </Text>
      </Table.Td>
      <Table.Td>
        {post.category ? (
          <Badge variant="light" color="sage">
            {post.category}
          </Badge>
        ) : (
          <Text size="sm" c="dimmed">
            —
          </Text>
        )}
      </Table.Td>
      <Table.Td>
        <Badge color={post.published ? 'green' : 'yellow'} variant="light">
          {post.published ? 'Published' : 'Draft'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{post.author.name || 'Unknown'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{new Date(post.createdAt).toLocaleDateString()}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/admin/blog/${post.id}/edit`}
            aria-label="Edit post"
          >
            <IconEdit size={16} />
          </ActionIcon>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" aria-label="More options">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  post.published ? <IconEyeOff size={14} /> : <IconEye size={14} />
                }
                onClick={() => handleTogglePublished(post.id, post.published)}
              >
                {post.published ? 'Unpublish' : 'Publish'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <TextInput
        placeholder="Search posts..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />
      <Table.ScrollContainer minWidth={700}>
        <Table striped highlightOnHover className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <Text ta="center" c="dimmed" py="xl">
                  {search ? 'No posts match your search.' : 'No blog posts yet. Create your first post!'}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </>
  );
}
