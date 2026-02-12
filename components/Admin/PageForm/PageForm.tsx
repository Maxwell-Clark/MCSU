'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Textarea,
  Button,
  Stack,
  Group,
  Switch,
  Alert,
  Paper,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';
import { BlogRichTextEditor } from '../RichTextEditor/RichTextEditor';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { createPage, updatePage } from '@/lib/actions/pages';
import classes from './PageForm.module.css';

interface PageFormProps {
  page?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    description: string | null;
    published: boolean;
  };
}

export function PageForm({ page }: PageFormProps) {
  const router = useRouter();
  const isEditing = !!page;

  const [title, setTitle] = useState(page?.title || '');
  const [slug, setSlug] = useState(page?.slug || '');
  const [content, setContent] = useState(page?.content || '');
  const [image, setImage] = useState(page?.image || '');
  const [description, setDescription] = useState(page?.description || '');
  const [published, setPublished] = useState(page?.published || false);
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
        image: image || null,
        description: description || null,
        published,
      };

      if (isEditing && page) {
        await updatePage(page.id, data);
      } else {
        await createPage(data);
      }

      router.push('/admin/pages');
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
          <Title order={3}>{isEditing ? 'Edit Page' : 'Create New Page'}</Title>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/admin/pages')}
          >
            Back to Pages
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
              placeholder="Enter page title"
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
              description="URL path: /p/your-slug"
            />

            <Textarea
              label="Description"
              placeholder="Brief page description (for SEO)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />

            <ImageUpload
              label="Featured Image"
              value={image}
              onChange={setImage}
            />

            <Switch
              label="Published"
              description="Published pages are visible on the public site"
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
            onClick={() => router.push('/admin/pages')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<IconDeviceFloppy size={16} />}
            loading={loading}
          >
            {isEditing ? 'Update Page' : 'Create Page'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
