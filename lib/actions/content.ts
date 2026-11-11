'use server';

import { revalidatePath } from 'next/cache';
import {
  CONTENT_KIND_CONFIG,
  isContentKind,
  type ContentItemView,
  type ContentKind,
} from '@/lib/content-kinds';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';
import { contentItemSchema, type ContentItemInput } from '@/lib/validations';

const ORDER = [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }];

function revalidateContent(kind: string) {
  revalidatePath('/admin/content');
  if (isContentKind(kind)) {
    revalidatePath(CONTENT_KIND_CONFIG[kind].publicPath);
  }
}

function parseContent(data: ContentItemInput) {
  const result = contentItemSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || 'Invalid content');
  }
  return result.data;
}

/** The music player skips by YouTube ID, so a video may appear only once per kind. */
async function assertUniqueVideo(kind: ContentKind, youtubeId: string | null, exceptId?: string) {
  if (!youtubeId) {
    return;
  }
  const duplicate = await prisma.contentItem.findFirst({
    where: { kind, youtubeId, ...(exceptId && { NOT: { id: exceptId } }) },
    select: { title: true },
  });
  if (duplicate) {
    throw new Error(
      `That video is already in ${CONTENT_KIND_CONFIG[kind].label} as "${duplicate.title}"`
    );
  }
}

export async function createContentItem(data: ContentItemInput) {
  await requireAdmin();
  const content = parseContent(data);
  await assertUniqueVideo(content.kind, content.youtubeId);

  const item = await prisma.contentItem.create({ data: content });
  revalidateContent(item.kind);
  return item;
}

export async function updateContentItem(id: string, data: ContentItemInput) {
  await requireAdmin();
  const content = parseContent(data);
  await assertUniqueVideo(content.kind, content.youtubeId, id);

  const item = await prisma.contentItem.update({ where: { id }, data: content });
  revalidateContent(item.kind);
  return item;
}

export async function deleteContentItem(id: string) {
  await requireAdmin();
  const item = await prisma.contentItem.delete({ where: { id } });
  revalidateContent(item.kind);
}

export async function toggleContentItemActive(id: string, active: boolean) {
  await requireAdmin();
  const item = await prisma.contentItem.update({ where: { id }, data: { active } });
  revalidateContent(item.kind);
  return item;
}

export async function getContentItems(kind: ContentKind) {
  await requireAdmin();
  return prisma.contentItem.findMany({ where: { kind }, orderBy: ORDER });
}

export async function getContentItem(id: string) {
  await requireAdmin();
  return prisma.contentItem.findUnique({ where: { id } });
}

/** Active items for the public pages, keyed by kind. Every requested kind is present. */
export async function getActiveContent<K extends ContentKind>(
  kinds: K[]
): Promise<Record<K, ContentItemView[]>> {
  const validKinds = kinds.filter(isContentKind);
  const items = await prisma.contentItem.findMany({
    where: { kind: { in: validKinds }, active: true },
    orderBy: ORDER,
    select: {
      id: true,
      kind: true,
      title: true,
      creator: true,
      category: true,
      duration: true,
      youtubeId: true,
      url: true,
      image: true,
      body: true,
    },
  });

  const grouped = Object.fromEntries(validKinds.map((kind) => [kind, []])) as unknown as Record<
    K,
    ContentItemView[]
  >;
  for (const item of items) {
    grouped[item.kind as K]?.push(item);
  }
  return grouped;
}
