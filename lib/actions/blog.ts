'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';

interface BlogPostData {
  title: string;
  slug: string;
  content: string;
  image: string;
  category: string | null;
  published: boolean;
}

export async function createBlogPost(data: BlogPostData) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const existingPost = await prisma.blogPost.findUnique({
    where: { slug: data.slug },
  });

  if (existingPost) {
    throw new Error('A post with this slug already exists');
  }

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      authorId: session.user.id,
    },
  });

  revalidatePath('/admin/blog');
  revalidatePath('/');

  return post;
}

export async function updateBlogPost(id: string, data: BlogPostData) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const existingPost = await prisma.blogPost.findFirst({
    where: {
      slug: data.slug,
      NOT: { id },
    },
  });

  if (existingPost) {
    throw new Error('A post with this slug already exists');
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data,
  });

  revalidatePath('/admin/blog');
  revalidatePath('/');

  return post;
}

export async function deleteBlogPost(id: string) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath('/admin/blog');
  revalidatePath('/');
}

export async function toggleBlogPostPublished(id: string, published: boolean) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: { published },
  });

  revalidatePath('/admin/blog');
  revalidatePath('/');

  return post;
}

export async function getBlogPosts() {
  return prisma.blogPost.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBlogPost(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
  });
}

export async function getPublishedBlogPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
}
