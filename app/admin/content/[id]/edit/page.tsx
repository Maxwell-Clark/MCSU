import { notFound } from 'next/navigation';
import { Container } from '@mantine/core';
import { ContentForm } from '@/components/Admin/ContentForm/ContentForm';
import { getContentItem, getContentItems } from '@/lib/actions/content';
import { categoriesInOrder, isContentKind } from '@/lib/content-kinds';

export const dynamic = 'force-dynamic';

interface EditContentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const { id } = await params;
  const item = await getContentItem(id);
  if (!item || !isContentKind(item.kind)) {
    notFound();
  }

  const siblings = await getContentItems(item.kind);

  return (
    <Container size="lg" py="xl">
      <ContentForm
        kind={item.kind}
        item={item}
        categories={categoriesInOrder(siblings)}
        nextSortOrder={item.sortOrder}
      />
    </Container>
  );
}
