import { createClient } from './server';
import { prisma } from '@/lib/prisma';

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return {
    user: {
      id: user.id,
      email: user.email!,
      name: dbUser?.name || '',
      role: dbUser?.role || 'admin',
    },
  };
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }

  return session;
}
