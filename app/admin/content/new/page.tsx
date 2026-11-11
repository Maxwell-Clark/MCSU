import { redirect } from 'next/navigation';
import { Container } from '@mantine/core';
import { ContentForm } from '@/components/Admin/ContentForm/ContentForm';
import { getContentItems } from '@/lib/actions/content';
import { categoriesInOrder, isContentKind } from '@/lib/content-kinds';

export const dynamic = 'force-dynamic';

interface NewContentPageProps {
  searchParams: Promise<{ kind?: string }>;
}

export default async function NewContentPage({ searchParams }: NewContentPageProps) {
  const { kind } = await searchParams;
  if (!isContentKind(kind)) {
    redirect('/admin/content');
  }

  const siblings = await getContentItems(kind);
  const lastSortOrder = siblings.reduce((max, item) => Math.max(max, item.sortOrder), 0);

  return (
    <Container size="lg" py="xl">
      <ContentForm
        kind={kind}
        categories={categoriesInOrder(siblings)}
        nextSortOrder={lastSortOrder + 10}
      />
    </Container>
  );
}
