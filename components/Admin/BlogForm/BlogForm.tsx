'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Button,
  Stack,
  Group,
  Switch,
  Select,
  Alert,
  Paper,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';
import { BlogRichTextEditor } from '../RichTextEditor/RichTextEditor';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { createBlogPost, updateBlogPost } from '@/lib/actions/blog';
import classes from './BlogForm.module.css';

interface BlogFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    image: string;
    category: string | null;
    published: boolean;
  };
}

const categories = [
  { value: 'Meditation', label: 'Meditation' },
  { value: 'Wellness', label: 'Wellness' },
  { value: 'Tips', label: 'Tips' },
  { value: 'News', label: 'News' },
];

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState(post?.image || '');
  const [category, setCategory] = useState<string | null>(post?.category || null);
  const [published, setPublished] = useState(post?.published || false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        title,
        slug,
        content,
        image,
        category,
        published,
      };

      if (isEditing && post) {
        await updateBlogPost(post.id, data);
      } else {
        await createBlogPost(data);
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={3}>{isEditing ? 'Edit Post' : 'Create New Post'}</Title>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/admin/blog')}
          >
            Back to Posts
          </Button>
        </Group>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}

        <Paper withBorder p="md" radius="md">
          <Stack gap="md">
            <TextInput
              label="Title"
              placeholder="Enter post title"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />

            <TextInput
              label="Slug"
              placeholder="url-friendly-slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              description="URL-friendly version of the title"
            />

            <ImageUpload
              label="Featured Image"
              value={image}
              onChange={setImage}
              required
            />

            <Select
              label="Category"
              placeholder="Select a category"
              data={categories}
              value={category}
              onChange={setCategory}
              clearable
            />

            <Switch
              label="Published"
              description="Published posts are visible on the public site"
              checked={published}
              onChange={(e) => setPublished(e.currentTarget.checked)}
            />
          </Stack>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Stack gap="md">
            <Title order={5}>Content</Title>
            <BlogRichTextEditor content={content} onChange={setContent} />
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button
            type="button"
            variant="default"
            onClick={() => router.push('/admin/blog')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<IconDeviceFloppy size={16} />}
            loading={loading}
          >
            {isEditing ? 'Update Post' : 'Create Post'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
