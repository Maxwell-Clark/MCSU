'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';

interface PageData {
  title: string;
  slug: string;
  content: string;
  image: string | null;
  description: string | null;
  published: boolean;
  sortOrder?: number;
}

export async function createPage(data: PageData) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const existing = await prisma.page.findUnique({ where: { slug: data.slug } });
  if (existing) throw new Error('A page with this slug already exists');

  const page = await prisma.page.create({
    data: {
      ...data,
      authorId: session.user.id,
    },
  });

  revalidatePath('/admin/pages');
  revalidatePath('/p/' + data.slug);
  return page;
}

export async function updatePage(id: string, data: PageData) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const existing = await prisma.page.findFirst({
    where: { slug: data.slug, NOT: { id } },
  });
  if (existing) throw new Error('A page with this slug already exists');

  const page = await prisma.page.update({
    where: { id },
    data,
  });

  revalidatePath('/admin/pages');
  revalidatePath('/p/' + data.slug);
  return page;
}

export async function deletePage(id: string) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.page.delete({ where: { id } });
  revalidatePath('/admin/pages');
}

export async function togglePagePublished(id: string, published: boolean) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const page = await prisma.page.update({
    where: { id },
    data: { published },
  });

  revalidatePath('/admin/pages');
  revalidatePath('/p/' + page.slug);
  return page;
}

export async function getPages() {
  return prisma.page.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPage(id: string) {
  return prisma.page.findUnique({ where: { id } });
}

export async function getPublishedPages() {
  return prisma.page.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getPublishedPageBySlug(slug: string) {
  return prisma.page.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });
}
