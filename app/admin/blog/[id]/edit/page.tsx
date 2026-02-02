import { Container } from '@mantine/core';
import { notFound } from 'next/navigation';
import { BlogForm } from '@/components/Admin/BlogForm/BlogForm';
import { getBlogPost } from '@/lib/actions/blog';

export const dynamic = 'force-dynamic';

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <BlogForm post={post} />
    </Container>
  );
}
