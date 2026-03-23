import { Container } from '@mantine/core';
import { notFound } from 'next/navigation';
import { UserForm } from '@/components/Admin/UserForm/UserForm';
import { getUserById } from '@/lib/actions/users';

export const dynamic = 'force-dynamic';

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <UserForm user={user} />
    </Container>
  );
}
