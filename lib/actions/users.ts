'use server';

import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import { TIER_SLUGS } from '@/lib/membership-tiers';

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

  if (!data.email || !data.password || !data.name || !data.role) {
    throw new Error('Email, password, name, and role are required');
  }

  if (data.role === 'member' && data.membershipTier && !TIER_SLUGS.includes(data.membershipTier)) {
    throw new Error('Invalid membership tier');
  }

  const supabase = getAdminClient();

  const { data: authData, error: createError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
      name: data.name,
      ...(data.phone && { phone: data.phone }),
      ...(data.membershipTier && { tier: data.membershipTier }),
    },
  });

  if (createError) {
    throw new Error(createError.message);
  }

  if (!authData.user) {
    throw new Error('Failed to create user');
  }

  const user = await prisma.user.upsert({
    where: { email: data.email },
    create: {
      id: authData.user.id,
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone || null,
      membershipTier: data.role === 'member' ? data.membershipTier || null : null,
    },
    update: {
      name: data.name,
      role: data.role,
      phone: data.phone || null,
      membershipTier: data.role === 'member' ? data.membershipTier || null : null,
    },
  });

  revalidatePath('/admin/users');
  return user;
}

interface UpdateUserData {
  name?: string;
  phone?: string;
  role?: string;
  membershipTier?: string | null;
}

export async function updateUser(id: string, data: UpdateUserData) {
  await requireAdmin();

  if (data.role === 'member' && data.membershipTier && !TIER_SLUGS.includes(data.membershipTier)) {
    throw new Error('Invalid membership tier');
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.phone !== undefined && { phone: data.phone || null }),
      ...(data.role !== undefined && { role: data.role }),
      ...(data.role !== undefined && {
        membershipTier: data.role === 'member' ? (data.membershipTier || null) : null,
      }),
    },
  });

  // Sync metadata to Supabase
  const supabase = getAdminClient();
  await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      role: user.role,
      name: user.name,
      phone: user.phone,
      tier: user.membershipTier,
    },
  });

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
