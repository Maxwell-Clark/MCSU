import { Container, Title, Text, Button, Stack } from '@mantine/core';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';

export default function BlogPostNotFound() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="md" py="xl">
        <Title order={2}>Post Not Found</Title>
        <Text c="dimmed" ta="center">
          The blog post you&apos;re looking for doesn&apos;t exist or has been unpublished.
        </Text>
        <Button component={Link} href="/blog" leftSection={<IconArrowLeft size={16} />} variant="light">
          Back to Blog
        </Button>
      </Stack>
    </Container>
  );
}
