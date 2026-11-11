'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IconAlertCircle,
  IconDots,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Alert,
  Anchor,
  Badge,
  Group,
  Image,
  Menu,
  ScrollArea,
  Table,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { deleteContentItem, toggleContentItemActive } from '@/lib/actions/content';
import { CONTENT_KIND_CONFIG, CONTENT_KINDS, type ContentKind } from '@/lib/content-kinds';
import { youTubeThumbnail } from '@/lib/youtube';

export interface ContentTableItem {
  id: string;
  title: string;
  creator: string | null;
  category: string | null;
  youtubeId: string | null;
  image: string | null;
  url: string | null;
  sortOrder: number;
  active: boolean;
}

interface ContentTableProps {
  kind: ContentKind;
  items: ContentTableItem[];
}

function Preview({ item }: { item: ContentTableItem }) {
  const src = item.youtubeId ? youTubeThumbnail(item.youtubeId) : item.image;
  if (!src) {
    return null;
  }
  return <Image src={src} alt="" w={72} h={item.youtubeId ? 40 : 72} fit="cover" radius="sm" />;
}

export function ContentTable({ kind, items }: ContentTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const config = CONTENT_KIND_CONFIG[kind];
  const hasPreview = Boolean(config.fields.youtube || config.fields.image);

  const run = async (action: () => Promise<unknown>) => {
    setError('');
    try {
      await action();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleDelete = (item: ContentTableItem) => {
    if (
      confirm(`Delete "${item.title}"? This can't be undone. To hide it instead, deactivate it.`)
    ) {
      run(() => deleteContentItem(item.id));
    }
  };

  const query = search.trim().toLowerCase();
  const filtered = items.filter(
    (item) =>
      !query ||
      [item.title, item.creator, item.category].some((value) =>
        value?.toLowerCase().includes(query)
      )
  );

  return (
    <>
      <Tabs
        value={kind}
        onChange={(value) => value && router.push(`/admin/content?kind=${value}`)}
        mb="md"
      >
        <ScrollArea type="never">
          <Tabs.List style={{ flexWrap: 'nowrap' }}>
            {CONTENT_KINDS.map((k) => (
              <Tabs.Tab key={k} value={k}>
                {CONTENT_KIND_CONFIG[k].label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>
      </Tabs>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" mb="md">
          {error}
        </Alert>
      )}

      <TextInput
        placeholder={`Search ${config.label.toLowerCase()}...`}
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />

      <Table.ScrollContainer minWidth={640}>
        <Table striped highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              {hasPreview && <Table.Th w={88} />}
              <Table.Th>{config.titleLabel}</Table.Th>
              {config.fields.category && <Table.Th>Category</Table.Th>}
              <Table.Th>Order</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((item) => (
              <Table.Tr key={item.id}>
                {hasPreview && (
                  <Table.Td>
                    <Preview item={item} />
                  </Table.Td>
                )}
                <Table.Td>
                  <Anchor component={Link} href={`/admin/content/${item.id}/edit`} fw={500}>
                    {item.title}
                  </Anchor>
                  {item.creator && (
                    <Text size="xs" c="dimmed">
                      {item.creator}
                    </Text>
                  )}
                </Table.Td>
                {config.fields.category && (
                  <Table.Td>
                    <Text size="sm">{item.category}</Text>
                  </Table.Td>
                )}
                <Table.Td>
                  <Text size="sm">{item.sortOrder}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={item.active ? 'green' : 'yellow'} variant="light">
                    {item.active ? 'Active' : 'Hidden'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-end" wrap="nowrap">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      component={Link}
                      href={`/admin/content/${item.id}/edit`}
                      aria-label={`Edit ${item.title}`}
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
                            item.active ? <IconEyeOff size={14} /> : <IconEye size={14} />
                          }
                          onClick={() => run(() => toggleContentItemActive(item.id, !item.active))}
                        >
                          {item.active ? 'Hide from site' : 'Show on site'}
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          color="red"
                          leftSection={<IconTrash size={14} />}
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
            {filtered.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text ta="center" c="dimmed" py="xl">
                    {query
                      ? `No ${config.label.toLowerCase()} match your search.`
                      : `No ${config.label.toLowerCase()} yet.`}
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
