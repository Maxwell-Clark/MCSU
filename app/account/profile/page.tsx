import { Container, Title, Text, Stack } from '@mantine/core';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase/auth';
import { prisma } from '@/lib/prisma';
import { ProfileForm } from '@/components/Account/ProfileForm/ProfileForm';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login?redirect=/account/profile');
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  });

  if (!dbUser) {
    redirect('/login');
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>Edit Profile</Title>
          <Text c="dimmed" mt="xs">
            Manage your personal information
          </Text>
        </div>
        <ProfileForm user={{ name: dbUser.name || '', email: dbUser.email, phone: dbUser.phone }} />
      </Stack>
    </Container>
  );
}
