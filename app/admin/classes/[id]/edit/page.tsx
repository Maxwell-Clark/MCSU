import { Container } from '@mantine/core';
import { notFound } from 'next/navigation';
import { ClassForm } from '@/components/Admin/ClassForm/ClassForm';
import { getClassEvent, getLocations } from '@/lib/actions/classes';

interface EditClassPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditClassPage({ params }: EditClassPageProps) {
  const { id } = await params;
  const [classEvent, locations] = await Promise.all([
    getClassEvent(id),
    getLocations(),
  ]);

  if (!classEvent) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <ClassForm classEvent={classEvent} locations={locations} />
    </Container>
  );
}
