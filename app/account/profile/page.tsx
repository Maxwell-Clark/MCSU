import { Alert, Container, Title, Text, Stack } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
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
    select: {
      name: true,
      email: true,
      phone: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      state: true,
      postalCode: true,
    },
  });

  // Signed in but no matching user record. Redirecting to /login would bounce a
  // signed-in user to the homepage via middleware, so explain instead.
  if (!dbUser) {
    return (
      <Container size="sm" py="xl">
        <Alert color="red" icon={<IconAlertCircle size={18} />} title="We couldn't load your profile">
          Your login isn't linked to a member record yet. Please contact us and we'll fix it
          for you.
        </Alert>
      </Container>
    );
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
        <ProfileForm user={{ ...dbUser, name: dbUser.name || '' }} />
      </Stack>
    </Container>
  );
}
