import { Button, Container, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { DonationsTable } from '@/components/Admin/DonationsTable/DonationsTable';
import { getDonations } from '@/lib/actions/donations';

export const dynamic = 'force-dynamic';

export default async function AdminDonationsPage() {
  const donations = await getDonations();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title order={2}>Donations</Title>
            <Text c="dimmed" mt="xs">
              One-time gifts made through the website, with donor mailing addresses
            </Text>
          </div>
          <Button
            component="a"
            href="/admin/donations/export"
            variant="light"
            leftSection={<IconDownload size={16} />}
          >
            Export CSV
          </Button>
        </Group>

        <Paper withBorder radius="md">
          <DonationsTable donations={donations} />
        </Paper>
      </Stack>
    </Container>
  );
}
