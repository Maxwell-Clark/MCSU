'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';

// Program CRUD

interface ProgramData {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  color: string;
  iconName: string;
  ctaText: string;
  learnMoreContent: string | null;
  sortOrder?: number;
  active: boolean;
}

export async function createProgram(data: ProgramData) {
  await requireAdmin();

  const existing = await prisma.program.findUnique({ where: { slug: data.slug } });
  if (existing) throw new Error('A program with this slug already exists');

  const program = await prisma.program.create({ data });

  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
  return program;
}

export async function updateProgram(id: string, data: ProgramData) {
  await requireAdmin();

  const existing = await prisma.program.findFirst({
    where: { slug: data.slug, NOT: { id } },
  });
  if (existing) throw new Error('A program with this slug already exists');

  const program = await prisma.program.update({ where: { id }, data });

  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
  return program;
}

export async function deleteProgram(id: string) {
  await requireAdmin();

  await prisma.program.delete({ where: { id } });
  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
}

export async function toggleProgramActive(id: string, active: boolean) {
  await requireAdmin();

  const program = await prisma.program.update({
    where: { id },
    data: { active },
  });

  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
  return program;
}

export async function getPrograms() {
  await requireAdmin();
  return prisma.program.findMany({
    include: { features: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getProgram(id: string) {
  await requireAdmin();
  return prisma.program.findUnique({
    where: { id },
    include: { features: { orderBy: { sortOrder: 'asc' } } },
  });
}

export async function getActivePrograms() {
  return prisma.program.findMany({
    where: { active: true },
    include: { features: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getProgramBySlug(slug: string) {
  return prisma.program.findUnique({
    where: { slug },
    include: { features: { orderBy: { sortOrder: 'asc' } } },
  });
}

// ProgramFeature CRUD

interface ProgramFeatureData {
  title: string;
  description: string | null;
  iconName: string;
  listItems: string | null;
  sortOrder?: number;
  programId: string;
}

export async function addProgramFeature(data: ProgramFeatureData) {
  await requireAdmin();

  const feature = await prisma.programFeature.create({ data });

  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
  return feature;
}

export async function updateProgramFeature(id: string, data: Omit<ProgramFeatureData, 'programId'>) {
  await requireAdmin();

  const feature = await prisma.programFeature.update({ where: { id }, data });

  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
  return feature;
}

export async function deleteProgramFeature(id: string) {
  await requireAdmin();

  await prisma.programFeature.delete({ where: { id } });
  revalidatePath('/admin/programs');
  revalidatePath('/offerings');
}
