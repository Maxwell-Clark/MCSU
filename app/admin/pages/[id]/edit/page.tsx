import { Container, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { PageForm } from '@/components/Admin/PageForm/PageForm';
import { getPage } from '@/lib/actions/pages';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPagePage({ params }: EditPageProps) {
  const { id } = await params;
  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <PageForm page={page} />
    </Container>
  );
}
