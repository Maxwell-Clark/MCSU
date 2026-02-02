import { Container } from '@mantine/core';
import { BlogForm } from '@/components/Admin/BlogForm/BlogForm';

export default function NewBlogPostPage() {
  return (
    <Container size="lg" py="xl">
      <BlogForm />
    </Container>
  );
}
