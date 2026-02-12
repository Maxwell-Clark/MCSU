'use client';

import { useState } from 'react';
import { Table, Badge, ActionIcon, Group, Text, Menu, Anchor, TextInput } from '@mantine/core';
import { IconEdit, IconTrash, IconDots, IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteClassEvent, toggleClassActive } from '@/lib/actions/classes';
import classes from './ClassTable.module.css';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface ClassItem {
  id: string;
  title: string;
  topic: string | null;
  instructor: string;
  dayOfWeek: number | null;
  startTime: string;
  endTime: string;
  type: string;
  category: string;
  active: boolean;
  location: { name: string };
}

interface ClassTableProps {
  classEvents: ClassItem[];
}

export function ClassTable({ classEvents }: ClassTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      await deleteClassEvent(id);
      router.refresh();
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleClassActive(id, !currentStatus);
    router.refresh();
  };

  const filtered = classEvents.filter((event) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      event.title.toLowerCase().includes(q) ||
      (event.topic && event.topic.toLowerCase().includes(q)) ||
      event.instructor.toLowerCase().includes(q) ||
      event.location.name.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q)
    );
  });

  const rows = filtered.map((event) => (
    <Table.Tr key={event.id}>
      <Table.Td>
        <Anchor component={Link} href={`/admin/classes/${event.id}/edit`} fw={500}>
          {event.title}
        </Anchor>
        {event.topic && (
          <Text size="xs" c="dimmed">{event.topic}</Text>
        )}
      </Table.Td>
      <Table.Td>
        <Text size="sm">{event.instructor}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {event.dayOfWeek !== null ? dayNames[event.dayOfWeek] : 'TBD'}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{event.startTime} - {event.endTime}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" size="sm">{event.type}</Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color="sage" size="sm">{event.category}</Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{event.location.name}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={event.active ? 'green' : 'yellow'} variant="light">
          {event.active ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/admin/classes/${event.id}/edit`}
            aria-label="Edit class"
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
                leftSection={event.active ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                onClick={() => handleToggleActive(event.id, event.active)}
              >
                {event.active ? 'Deactivate' : 'Activate'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => handleDelete(event.id)}
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
        placeholder="Search classes..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />
      <Table.ScrollContainer minWidth={900}>
        <Table striped highlightOnHover className={classes.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Instructor</Table.Th>
            <Table.Th>Day</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={9}>
                <Text ta="center" c="dimmed" py="xl">
                  {search ? 'No classes match your search.' : 'No classes yet. Create your first class!'}
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
