import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/actions/blog';
import BlogPost from '@/components/Blog/BlogPost';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    return { title: 'Post Not Found' };
  }

  const description = post.content.replace(/<[^>]*>/g, '').slice(0, 160);

  return {
    title: `${post.title} | MCSU Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <BlogPost
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: formattedDate,
        image: post.image,
        content: post.content,
        category: post.category || undefined,
      }}
      author={post.author?.name || undefined}
      standalone
    />
  );
}
