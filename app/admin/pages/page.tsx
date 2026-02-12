import { Container, Title, Text, Button, Group, Paper, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PageTable } from '@/components/Admin/PageTable/PageTable';
import { getPages } from '@/lib/actions/pages';

export const dynamic = 'force-dynamic';

export default async function AdminPagesPage() {
  const pages = await getPages();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Pages</Title>
            <Text c="dimmed" mt="xs">
              Manage your site pages
            </Text>
          </div>
          <Button component="a" href="/admin/pages/new" leftSection={<IconPlus size={16} />}>
            New Page
          </Button>
        </Group>

        <Paper withBorder radius="md">
          <PageTable pages={pages} />
        </Paper>
      </Stack>
    </Container>
  );
}
