'use client';

import { useState } from 'react';
import { Group, Table, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { formatUsd } from '@/lib/email/templates';
import { formatAddress } from '@/lib/format-address';

export interface DonationRow {
  id: string;
  name: string | null;
  email: string | null;
  amount: number;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  donatedAt: Date;
}

interface DonationsTableProps {
  donations: DonationRow[];
}

function addressOf(d: DonationRow): string {
  return formatAddress({
    line1: d.addressLine1,
    line2: d.addressLine2,
    city: d.city,
    state: d.state,
    postalCode: d.postalCode,
    country: d.country,
  });
}

export function DonationsTable({ donations }: DonationsTableProps) {
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const filtered = q
    ? donations.filter((d) =>
        [d.name, d.email, addressOf(d)].some((field) => field?.toLowerCase().includes(q))
      )
    : donations;
  const total = filtered.reduce((sum, d) => sum + d.amount, 0);

  return (
    <>
      <Group justify="space-between" align="center" p="md" pb={0} gap="sm">
        <TextInput
          placeholder="Search name, email or address..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{ flex: 1, minWidth: 220 }}
        />
        <Text size="sm" c="dimmed">
          {filtered.length} {filtered.length === 1 ? 'donation' : 'donations'} ·{' '}
          <Text span fw={600} c="var(--mantine-color-text)">
            {formatUsd(total)}
          </Text>
        </Text>
      </Group>
      <Table.ScrollContainer minWidth={800} mt="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th ta="right">Amount</Table.Th>
              <Table.Th>Address</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.length > 0 ? (
              filtered.map((d) => (
                <Table.Tr key={d.id}>
                  <Table.Td>
                    <Text size="sm">{new Date(d.donatedAt).toLocaleDateString()}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{d.name || '—'}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{d.email || '—'}</Text>
                  </Table.Td>
                  <Table.Td ta="right">
                    <Text size="sm" fw={500} style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {formatUsd(d.amount)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c={addressOf(d) ? undefined : 'dimmed'}>
                      {addressOf(d) || '—'}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text ta="center" c="dimmed" py="xl">
                    {search ? 'No donations match your search.' : 'No donations yet.'}
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
