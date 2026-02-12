'use client';

import { useState } from 'react';
import { Table, Badge, ActionIcon, Group, Text, Menu, Anchor, ColorSwatch, TextInput } from '@mantine/core';
import { IconEdit, IconTrash, IconDots, IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteProgram, toggleProgramActive } from '@/lib/actions/programs';
import classes from './ProgramTable.module.css';

interface ProgramFeature {
  id: string;
}

interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  shortTitle: string;
  tagline: string;
  color: string;
  sortOrder: number;
  active: boolean;
  features: ProgramFeature[];
}

interface ProgramTableProps {
  programs: ProgramItem[];
}

export function ProgramTable({ programs }: ProgramTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this program? This will also delete all its features.')) {
      await deleteProgram(id);
      router.refresh();
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleProgramActive(id, !currentStatus);
    router.refresh();
  };

  const filtered = programs.filter((program) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      program.title.toLowerCase().includes(q) ||
      program.slug.toLowerCase().includes(q) ||
      program.shortTitle.toLowerCase().includes(q) ||
      program.tagline.toLowerCase().includes(q)
    );
  });

  const rows = filtered.map((program) => (
    <Table.Tr key={program.id}>
      <Table.Td>
        <Anchor component={Link} href={`/admin/programs/${program.id}/edit`} fw={500}>
          {program.title}
        </Anchor>
        <Text size="xs" c="dimmed">
          /{program.slug}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ColorSwatch color={program.color} size={16} />
          <Text size="sm">{program.color}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{program.sortOrder}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="sage" size="sm">
          {program.features.length} feature{program.features.length !== 1 ? 's' : ''}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={program.active ? 'green' : 'yellow'} variant="light">
          {program.active ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/admin/programs/${program.id}/edit`}
            aria-label="Edit program"
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
                leftSection={program.active ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                onClick={() => handleToggleActive(program.id, program.active)}
              >
                {program.active ? 'Deactivate' : 'Activate'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => handleDelete(program.id)}
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
        placeholder="Search programs..."
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
              <Table.Th>Color</Table.Th>
              <Table.Th>Sort Order</Table.Th>
              <Table.Th>Features</Table.Th>
              <Table.Th>Status</Table.Th>
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
                    {search ? 'No programs match your search.' : 'No programs yet. Create your first program!'}
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
