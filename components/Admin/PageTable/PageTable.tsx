'use client';

import { useState } from 'react';
import { Table, Badge, ActionIcon, Group, Text, Menu, Anchor, TextInput } from '@mantine/core';
import { IconEdit, IconTrash, IconDots, IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deletePage, togglePagePublished } from '@/lib/actions/pages';
import classes from './PageTable.module.css';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  author: { name: string | null };
}

interface PageTableProps {
  pages: PageItem[];
}

export function PageTable({ pages }: PageTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      await deletePage(id);
      router.refresh();
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    await togglePagePublished(id, !currentStatus);
    router.refresh();
  };

  const filtered = pages.filter((page) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      page.title.toLowerCase().includes(q) ||
      page.slug.toLowerCase().includes(q) ||
      (page.author.name && page.author.name.toLowerCase().includes(q))
    );
  });

  const rows = filtered.map((page) => (
    <Table.Tr key={page.id}>
      <Table.Td>
        <Anchor component={Link} href={`/admin/pages/${page.id}/edit`} fw={500}>
          {page.title}
        </Anchor>
        <Text size="xs" c="dimmed">
          /p/{page.slug}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={page.published ? 'green' : 'yellow'} variant="light">
          {page.published ? 'Published' : 'Draft'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{page.author.name || 'Unknown'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{new Date(page.createdAt).toLocaleDateString()}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/admin/pages/${page.id}/edit`}
            aria-label="Edit page"
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
                leftSection={page.published ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                onClick={() => handleTogglePublished(page.id, page.published)}
              >
                {page.published ? 'Unpublish' : 'Publish'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => handleDelete(page.id)}
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
        placeholder="Search pages..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />
      <Table.ScrollContainer minWidth={600}>
        <Table striped highlightOnHover className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
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
              <Table.Td colSpan={5}>
                <Text ta="center" c="dimmed" py="xl">
                  {search ? 'No pages match your search.' : 'No pages yet. Create your first page!'}
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
