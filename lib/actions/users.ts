'use server';

import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import { createUserSchema, updateUserSchema } from '@/lib/validations';

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function getUsers() {
  await requireAdmin();
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserById(id: string) {
  await requireAdmin();
  return prisma.user.findUnique({ where: { id } });
}

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: string;
  membershipTier?: string;
}

export async function createUser(data: CreateUserData) {
  await requireAdmin();

  const result = createUserSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || 'Invalid input');
  }

  const validated = result.data;
  const supabase = getAdminClient();

  const { data: authData, error: createError } = await supabase.auth.admin.createUser({
    email: validated.email,
    password: validated.password,
    email_confirm: true,
    user_metadata: {
      role: validated.role,
      name: validated.name,
      ...(validated.phone && { phone: validated.phone }),
      ...(validated.membershipTier && { tier: validated.membershipTier }),
    },
  });

  if (createError) {
    throw new Error(createError.message);
  }

  if (!authData.user) {
    throw new Error('Failed to create user');
  }

  try {
    const user = await prisma.user.upsert({
      where: { email: validated.email },
      create: {
        id: authData.user.id,
        email: validated.email,
        name: validated.name,
        role: validated.role,
        phone: validated.phone || null,
        membershipTier: validated.role === 'member' ? validated.membershipTier || null : null,
      },
      update: {
        name: validated.name,
        role: validated.role,
        phone: validated.phone || null,
        membershipTier: validated.role === 'member' ? validated.membershipTier || null : null,
      },
    });

    revalidatePath('/admin/users');
    return user;
  } catch (dbError) {
    // Roll back Supabase user on database failure
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw new Error('Failed to create user record. Please try again.');
  }
}

interface UpdateUserData {
  password?: string;
  name?: string;
  phone?: string;
  role?: string;
  membershipTier?: string | null;
}

export async function updateUser(id: string, data: UpdateUserData) {
  await requireAdmin();

  const result = updateUserSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || 'Invalid input');
  }

  const validated = result.data;

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(validated.name !== undefined && { name: validated.name }),
      ...(validated.phone !== undefined && { phone: validated.phone || null }),
      ...(validated.role !== undefined && { role: validated.role }),
      // Keep the existing tier unless one is supplied or the user stops being a member
      ...(validated.role !== undefined && validated.role !== 'member'
        ? { membershipTier: null }
        : validated.membershipTier !== undefined && { membershipTier: validated.membershipTier }),
    },
  });

  // Sync metadata to Supabase
  const supabase = getAdminClient();
  const { error: authError } = await supabase.auth.admin.updateUserById(id, {
    ...(validated.password && { password: validated.password }),
    user_metadata: {
      role: user.role,
      name: user.name,
      phone: user.phone,
      tier: user.membershipTier,
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  revalidatePath('/admin/users');
  return user;
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();

  if (session.user.id === id) {
    throw new Error('Cannot delete your own account');
  }

  const supabase = getAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    throw new Error(error.message);
  }

  await prisma.user.delete({ where: { id } });

  revalidatePath('/admin/users');
}
