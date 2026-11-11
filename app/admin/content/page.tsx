import { IconPlus } from '@tabler/icons-react';
import { Button, Container, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { ContentTable } from '@/components/Admin/ContentTable/ContentTable';
import { getContentItems } from '@/lib/actions/content';
import { CONTENT_KIND_CONFIG, isContentKind } from '@/lib/content-kinds';

export const dynamic = 'force-dynamic';

interface AdminContentPageProps {
  searchParams: Promise<{ kind?: string }>;
}

export default async function AdminContentPage({ searchParams }: AdminContentPageProps) {
  const { kind: requested } = await searchParams;
  const kind = isContentKind(requested) ? requested : 'practice_video';
  const items = await getContentItems(kind);
  const config = CONTENT_KIND_CONFIG[kind];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Media & Resources</Title>
            <Text c="dimmed" mt="xs">
              Videos, music, books, papers, links and poems on the Practice and Resources pages
            </Text>
          </div>
          <Button
            component="a"
            href={`/admin/content/new?kind=${kind}`}
            leftSection={<IconPlus size={16} />}
          >
            New {config.singular}
          </Button>
        </Group>

        <Paper withBorder radius="md" p="md">
          <ContentTable kind={kind} items={items} />
        </Paper>
      </Stack>
    </Container>
  );
}
