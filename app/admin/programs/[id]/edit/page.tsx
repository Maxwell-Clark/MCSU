import { Container } from '@mantine/core';
import { notFound } from 'next/navigation';
import { ProgramForm } from '@/components/Admin/ProgramForm/ProgramForm';
import { getProgram } from '@/lib/actions/programs';

export const dynamic = 'force-dynamic';

interface EditProgramPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProgramPage({ params }: EditProgramPageProps) {
  const { id } = await params;
  const program = await getProgram(id);

  if (!program) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <ProgramForm program={program} />
    </Container>
  );
}
