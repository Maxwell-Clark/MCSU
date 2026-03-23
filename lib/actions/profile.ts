'use server';

import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/supabase/auth';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

interface UpdateProfileData {
  name: string;
  phone: string;
  email?: string;
}

export async function updateProfile(data: UpdateProfileData) {
  const session = await requireAuth();

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      phone: data.phone || null,
    },
  });

  // Sync name to Supabase metadata
  const supabase = getAdminClient();
  await supabase.auth.admin.updateUserById(session.user.id, {
    user_metadata: {
      name: data.name,
      phone: data.phone || null,
    },
  });

  // If email changed, initiate email change flow
  if (data.email && data.email !== session.user.email) {
    const serverSupabase = await createServerClient();
    await serverSupabase.auth.updateUser({ email: data.email });
  }

  revalidatePath('/account/profile');
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export async function changePassword(data: ChangePasswordData) {
  const session = await requireAuth();

  // Verify current password by attempting sign-in
  const supabase = getAdminClient();
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: session.user.email,
    password: data.currentPassword,
  });

  if (verifyError) {
    throw new Error('Current password is incorrect');
  }

  const { error: updateError } = await supabase.auth.admin.updateUserById(session.user.id, {
    password: data.newPassword,
  });

  if (updateError) {
    throw new Error(updateError.message);
  }
}
