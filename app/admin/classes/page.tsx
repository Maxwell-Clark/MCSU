import { Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconPlus, IconMapPin } from '@tabler/icons-react';
import { ClassTable } from '@/components/Admin/ClassTable/ClassTable';
import { getClassEvents } from '@/lib/actions/classes';

export const dynamic = 'force-dynamic';

export default async function AdminClassesPage() {
  const classEvents = await getClassEvents();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Classes</Title>
            <Text c="dimmed" mt="xs">
              Manage your class schedule
            </Text>
          </div>
          <Group>
            <Button
              component="a"
              href="/admin/classes/locations"
              variant="light"
              leftSection={<IconMapPin size={16} />}
            >
              Manage Locations
            </Button>
            <Button component="a" href="/admin/classes/new" leftSection={<IconPlus size={16} />}>
              New Class
            </Button>
          </Group>
        </Group>

        <Paper withBorder radius="md">
          <ClassTable classEvents={classEvents} />
        </Paper>
      </Stack>
    </Container>
  );
}
