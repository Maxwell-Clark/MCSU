import { Blog } from '@/components/Blog/Blog';
import { getPublishedBlogPosts } from '@/lib/actions/blog';
import { BlogPostProps } from '@/interfaces/General_Interfaces';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  const formattedPosts: BlogPostProps[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: new Date(post.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: post.image,
    content: post.content,
    category: post.category || undefined,
    published: post.published,
  }));

  return (
    <div id="blog">
      <Blog posts={formattedPosts} />
    </div>
  );
}
