import { Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { UsersTable } from '@/components/Admin/UsersTable/UsersTable';
import { getUsers } from '@/lib/actions/users';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Users</Title>
            <Text c="dimmed" mt="xs">
              Manage users and members
            </Text>
          </div>
          <Button component="a" href="/admin/users/new" leftSection={<IconPlus size={16} />}>
            New User
          </Button>
        </Group>

        <Paper withBorder radius="md">
          <UsersTable users={users} />
        </Paper>
      </Stack>
    </Container>
  );
}
