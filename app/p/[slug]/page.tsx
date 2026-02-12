import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container, Title, Image, TypographyStylesProvider } from '@mantine/core';
import { getPublishedPageBySlug } from '@/lib/actions/pages';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);

  if (!page || !page.published) {
    return { title: 'Page Not Found' };
  }

  return {
    title: `${page.title} | MCSU`,
    description: page.description || page.content.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      title: page.title,
      description: page.description || undefined,
      images: page.image ? [{ url: page.image }] : [],
    },
  };
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);

  if (!page || !page.published) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="lg">
        {page.title}
      </Title>

      {page.image && (
        <Image src={page.image} alt={page.title} radius="md" mb="lg" />
      )}

      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </TypographyStylesProvider>
    </Container>
  );
}
