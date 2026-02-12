import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { LocationForm } from '@/components/Admin/LocationForm/LocationForm';
import { getLocations } from '@/lib/actions/classes';

export const dynamic = 'force-dynamic';

export default async function AdminLocationsPage() {
  const locations = await getLocations();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Locations</Title>
            <Text c="dimmed" mt="xs">
              Manage class locations
            </Text>
          </div>
          <Button
            component="a"
            href="/admin/classes"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to Classes
          </Button>
        </Group>

        <LocationForm locations={locations} />
      </Stack>
    </Container>
  );
}
