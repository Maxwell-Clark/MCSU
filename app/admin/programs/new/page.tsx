import { Container } from '@mantine/core';
import { ProgramForm } from '@/components/Admin/ProgramForm/ProgramForm';

export default function NewProgramPage() {
  return (
    <Container size="lg" py="xl">
      <ProgramForm />
    </Container>
  );
}
