'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Button,
  Stack,
  Group,
  Alert,
  Paper,
  Table,
  ActionIcon,
  Text,
} from '@mantine/core';
import { IconPlus, IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { createLocation, updateLocation, deleteLocation } from '@/lib/actions/classes';

interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface LocationFormProps {
  locations: Location[];
}

export function LocationForm({ locations }: LocationFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setAddress('');
    setEditingId(null);
    setError('');
  };

  const handleEdit = (loc: Location) => {
    setName(loc.name);
    setAddress(loc.address);
    setEditingId(loc.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = { name, address };

      if (editingId) {
        await updateLocation(editingId, data);
      } else {
        await createLocation(data);
      }

      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure? Classes using this location will need to be updated.')) {
      try {
        await deleteLocation(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Cannot delete location with classes');
      }
    }
  };

  return (
    <Stack gap="lg">
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
          {error}
        </Alert>
      )}

      <Paper withBorder p="md" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <Text fw={600}>{editingId ? 'Edit Location' : 'Add Location'}</Text>
            <Group grow>
              <TextInput
                label="Name"
                placeholder="e.g. Virtual (Online)"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextInput
                label="Address"
                placeholder="e.g. 321 N. Mall Dr., St. George, UT"
                description="Coordinates are looked up automatically from the address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Group>
            <Group>
              <Button type="submit" leftSection={<IconPlus size={16} />} loading={loading}>
                {editingId ? 'Update' : 'Add'} Location
              </Button>
              {editingId && (
                <Button variant="default" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </Group>
          </Stack>
        </form>
      </Paper>

      <Paper withBorder radius="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Coordinates</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {locations.map((loc) => (
              <Table.Tr key={loc.id}>
                <Table.Td>
                  <Text
                    size="sm"
                    fw={500}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEdit(loc)}
                  >
                    {loc.name}
                  </Text>
                </Table.Td>
                <Table.Td><Text size="sm">{loc.address}</Text></Table.Td>
                <Table.Td>
                  <Text size="xs" c="dimmed">
                    {loc.lat}, {loc.lng}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => handleDelete(loc.id)}
                    aria-label="Delete location"
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
            {locations.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text ta="center" c="dimmed" py="md">
                    No locations yet.
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
