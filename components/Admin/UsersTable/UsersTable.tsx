'use client';

import { useState } from 'react';
import { Table, Badge, ActionIcon, Group, Text, TextInput, Menu } from '@mantine/core';
import { IconEdit, IconTrash, IconDots, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/lib/actions/users';

interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
  membershipTier: string | null;
  createdAt: Date;
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        router.refresh();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete user');
      }
    }
  };

  const filtered = users.filter((user) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      user.email.toLowerCase().includes(q) ||
      (user.name && user.name.toLowerCase().includes(q)) ||
      user.role.toLowerCase().includes(q) ||
      (user.membershipTier && user.membershipTier.toLowerCase().includes(q))
    );
  });

  const rows = filtered.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Text fw={500}>{user.name || '—'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.email}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={user.role === 'admin' ? 'blue' : 'green'} variant="light">
          {user.role}
        </Badge>
      </Table.Td>
      <Table.Td>
        {user.membershipTier ? (
          <Badge variant="light" color="sage">
            {user.membershipTier}
          </Badge>
        ) : (
          <Text size="sm" c="dimmed">—</Text>
        )}
      </Table.Td>
      <Table.Td>
        <Text size="sm">{new Date(user.createdAt).toLocaleDateString()}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/admin/users/${user.id}/edit`}
            aria-label="Edit user"
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
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => handleDelete(user.id)}
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
        placeholder="Search users..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />
      <Table.ScrollContainer minWidth={700}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Tier</Table.Th>
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
                    {search ? 'No users match your search.' : 'No users yet.'}
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
