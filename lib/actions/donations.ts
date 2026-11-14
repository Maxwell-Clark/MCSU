'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';

/** All saved donations, newest first. Admin only. */
export async function getDonations() {
  await requireAdmin();
  return prisma.donation.findMany({ orderBy: { donatedAt: 'desc' } });
}
