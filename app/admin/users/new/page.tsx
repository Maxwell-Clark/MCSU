import { Container } from '@mantine/core';
import { UserForm } from '@/components/Admin/UserForm/UserForm';

export default function NewUserPage() {
  return (
    <Container size="lg" py="xl">
      <UserForm />
    </Container>
  );
}
