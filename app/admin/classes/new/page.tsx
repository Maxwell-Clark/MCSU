import { Container } from '@mantine/core';
import { ClassForm } from '@/components/Admin/ClassForm/ClassForm';
import { getLocations } from '@/lib/actions/classes';

export default async function NewClassPage() {
  const locations = await getLocations();

  return (
    <Container size="lg" py="xl">
      <ClassForm locations={locations} />
    </Container>
  );
}
