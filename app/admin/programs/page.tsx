import { Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { ProgramTable } from '@/components/Admin/ProgramTable/ProgramTable';
import { getPrograms } from '@/lib/actions/programs';

export const dynamic = 'force-dynamic';

export default async function AdminProgramsPage() {
  const programs = await getPrograms();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Programs</Title>
            <Text c="dimmed" mt="xs">
              Manage your programs
            </Text>
          </div>
          <Button component="a" href="/admin/programs/new" leftSection={<IconPlus size={16} />}>
            New Program
          </Button>
        </Group>

        <Paper withBorder radius="md" p="md">
          <ProgramTable programs={programs} />
        </Paper>
      </Stack>
    </Container>
  );
}
