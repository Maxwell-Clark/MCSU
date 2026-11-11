'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconAlertCircle, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import {
  Alert,
  Autocomplete,
  Button,
  Group,
  Image,
  NumberInput,
  Paper,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { ImageUpload } from '@/components/Admin/ImageUpload/ImageUpload';
import { createContentItem, updateContentItem } from '@/lib/actions/content';
import { CONTENT_KIND_CONFIG, type ContentKind } from '@/lib/content-kinds';
import { parseYouTubeId, youTubeThumbnail } from '@/lib/youtube';

export interface ContentFormItem {
  id: string;
  title: string;
  creator: string | null;
  category: string | null;
  duration: string | null;
  youtubeId: string | null;
  url: string | null;
  image: string | null;
  body: string | null;
  sortOrder: number;
  active: boolean;
}

interface ContentFormProps {
  kind: ContentKind;
  item?: ContentFormItem;
  /** Categories already used for this kind, offered as suggestions */
  categories: string[];
  /** Sort order for a new item, so it lands at the end of the list */
  nextSortOrder: number;
}

export function ContentForm({ kind, item, categories, nextSortOrder }: ContentFormProps) {
  const router = useRouter();
  const config = CONTENT_KIND_CONFIG[kind];
  const { fields } = config;
  const listUrl = `/admin/content?kind=${kind}`;

  const [title, setTitle] = useState(item?.title ?? '');
  const [creator, setCreator] = useState(item?.creator ?? '');
  const [category, setCategory] = useState(item?.category ?? '');
  const [duration, setDuration] = useState(item?.duration ?? '');
  const [youtube, setYoutube] = useState(
    item?.youtubeId ? `https://www.youtube.com/watch?v=${item.youtubeId}` : ''
  );
  const [url, setUrl] = useState(item?.url ?? '');
  const [image, setImage] = useState(item?.image ?? '');
  const [body, setBody] = useState(item?.body ?? '');
  const [sortOrder, setSortOrder] = useState<number | string>(item?.sortOrder ?? nextSortOrder);
  const [active, setActive] = useState(item?.active ?? true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const youtubeId = parseYouTubeId(youtube);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = {
      kind,
      title,
      creator,
      category,
      duration,
      youtube,
      url,
      image,
      body,
      sortOrder: typeof sortOrder === 'number' ? sortOrder : parseInt(sortOrder, 10) || 0,
      active,
    };

    try {
      if (item) {
        await updateContentItem(item.id, data);
      } else {
        await createContentItem(data);
      }
      router.push(listUrl);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg" maw={720}>
        <Group justify="space-between">
          <Title order={2}>{item ? `Edit ${config.singular}` : `New ${config.singular}`}</Title>
          <Button
            component={Link}
            href={listUrl}
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to {config.label}
          </Button>
        </Group>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}

        <Paper withBorder radius="md" p="lg">
          <Stack>
            <TextInput
              label={config.titleLabel}
              required
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />

            {fields.youtube && (
              <Stack gap="xs">
                <TextInput
                  label={fields.youtube.label}
                  description="Paste the link from YouTube's Share button or the address bar"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required={fields.youtube.required}
                  value={youtube}
                  onChange={(e) => setYoutube(e.currentTarget.value)}
                  error={
                    youtube.trim() && !youtubeId ? 'That is not a valid YouTube link' : undefined
                  }
                />
                {youtubeId && (
                  <Image
                    src={youTubeThumbnail(youtubeId)}
                    alt="Video thumbnail"
                    w={240}
                    radius="sm"
                  />
                )}
              </Stack>
            )}

            {fields.creator && (
              <TextInput
                label={fields.creator.label}
                placeholder={fields.creator.placeholder}
                required={fields.creator.required}
                value={creator}
                onChange={(e) => setCreator(e.currentTarget.value)}
              />
            )}

            {fields.category && (
              <Autocomplete
                label={fields.category.label}
                description="Items with the same category are grouped under one tab"
                placeholder={fields.category.placeholder}
                required={fields.category.required}
                data={categories}
                value={category}
                onChange={setCategory}
              />
            )}

            {fields.duration && (
              <TextInput
                label={fields.duration.label}
                placeholder={fields.duration.placeholder}
                required={fields.duration.required}
                value={duration}
                onChange={(e) => setDuration(e.currentTarget.value)}
              />
            )}

            {fields.url && (
              <TextInput
                label={fields.url.label}
                placeholder={fields.url.placeholder}
                required={fields.url.required}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.currentTarget.value)}
              />
            )}

            {fields.image && (
              <ImageUpload
                label={fields.image.label}
                required={fields.image.required}
                value={image}
                onChange={setImage}
              />
            )}

            {fields.body && (
              <Textarea
                label={fields.body.label}
                placeholder={fields.body.placeholder}
                required={fields.body.required}
                autosize
                minRows={8}
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
              />
            )}
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p="lg">
          <Stack>
            <NumberInput
              label="Sort order"
              description="Lower numbers appear first"
              min={0}
              value={sortOrder}
              onChange={setSortOrder}
              maw={200}
            />
            <Switch
              label="Show on site"
              checked={active}
              onChange={(e) => setActive(e.currentTarget.checked)}
            />
            <Text size="xs" c="dimmed">
              Appears on the {config.publicPath === '/practice' ? 'Practice' : 'Resources'} page.
            </Text>
          </Stack>
        </Paper>

        <Group>
          <Button type="submit" loading={loading} leftSection={<IconDeviceFloppy size={16} />}>
            {item ? 'Save changes' : `Add ${config.singular.toLowerCase()}`}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
