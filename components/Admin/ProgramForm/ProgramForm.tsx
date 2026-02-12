'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Stack,
  Group,
  Switch,
  Select,
  Alert,
  Paper,
  Title,
  Table,
  ActionIcon,
  Text,
  ColorInput,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconDeviceFloppy,
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconEdit,
} from '@tabler/icons-react';
import {
  createProgram,
  updateProgram,
  addProgramFeature,
  updateProgramFeature,
  deleteProgramFeature,
} from '@/lib/actions/programs';
import { BlogRichTextEditor } from '@/components/Admin/RichTextEditor/RichTextEditor';
import { availableIcons } from '@/lib/iconMap';
import classes from './ProgramForm.module.css';

interface ProgramFeature {
  id: string;
  title: string;
  description: string | null;
  iconName: string;
  listItems: string | null;
  sortOrder: number;
}

interface ProgramFormProps {
  program?: {
    id: string;
    slug: string;
    title: string;
    shortTitle: string;
    tagline: string;
    description: string;
    color: string;
    iconName: string;
    ctaText: string;
    learnMoreContent: string | null;
    sortOrder: number;
    active: boolean;
    features: ProgramFeature[];
  };
}

const iconOptions = availableIcons.map((name) => ({ value: name, label: name }));

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function ProgramForm({ program }: ProgramFormProps) {
  const router = useRouter();
  const isEditing = !!program;

  const [title, setTitle] = useState(program?.title || '');
  const [slug, setSlug] = useState(program?.slug || '');
  const [shortTitle, setShortTitle] = useState(program?.shortTitle || '');
  const [tagline, setTagline] = useState(program?.tagline || '');
  const [description, setDescription] = useState(program?.description || '');
  const [color, setColor] = useState(program?.color || '#4a9e7d');
  const [iconName, setIconName] = useState<string | null>(program?.iconName || 'IconStar');
  const [ctaText, setCtaText] = useState(program?.ctaText || '');
  const [learnMoreContent, setLearnMoreContent] = useState(program?.learnMoreContent || '');
  const [sortOrder, setSortOrder] = useState<number | string>(program?.sortOrder ?? 0);
  const [active, setActive] = useState(program?.active ?? true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Feature management state
  const [features, setFeatures] = useState<ProgramFeature[]>(program?.features || []);
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [featureIconName, setFeatureIconName] = useState<string | null>('IconStar');
  const [featureListItems, setFeatureListItems] = useState('');
  const [featureSortOrder, setFeatureSortOrder] = useState<number | string>(0);
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [featureLoading, setFeatureLoading] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(slugify(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!iconName) throw new Error('Please select an icon');

      const data = {
        title,
        slug,
        shortTitle,
        tagline,
        description,
        color,
        iconName,
        ctaText,
        learnMoreContent: learnMoreContent || null,
        sortOrder: typeof sortOrder === 'string' ? parseInt(sortOrder) || 0 : sortOrder,
        active,
      };

      if (isEditing && program) {
        await updateProgram(program.id, data);
      } else {
        await createProgram(data);
      }

      router.push('/admin/programs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetFeatureForm = () => {
    setFeatureTitle('');
    setFeatureDescription('');
    setFeatureIconName('IconStar');
    setFeatureListItems('');
    setFeatureSortOrder(0);
    setEditingFeatureId(null);
  };

  const handleEditFeature = (feature: ProgramFeature) => {
    setFeatureTitle(feature.title);
    setFeatureDescription(feature.description || '');
    setFeatureIconName(feature.iconName);
    setFeatureListItems(
      feature.listItems ? JSON.parse(feature.listItems).join('\n') : ''
    );
    setFeatureSortOrder(feature.sortOrder);
    setEditingFeatureId(feature.id);
  };

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;
    setFeatureLoading(true);

    try {
      const listItemsArray = featureListItems
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const data = {
        title: featureTitle,
        description: featureDescription || null,
        iconName: featureIconName || 'IconStar',
        listItems: listItemsArray.length > 0 ? JSON.stringify(listItemsArray) : null,
        sortOrder: typeof featureSortOrder === 'string' ? parseInt(featureSortOrder) || 0 : featureSortOrder,
        programId: program.id,
      };

      if (editingFeatureId) {
        const { programId: _, ...updateData } = data;
        await updateProgramFeature(editingFeatureId, updateData);
        setFeatures(
          features.map((f) =>
            f.id === editingFeatureId
              ? { ...f, ...updateData }
              : f
          )
        );
      } else {
        const feature = await addProgramFeature(data);
        setFeatures([...features, feature]);
      }

      resetFeatureForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save feature');
    } finally {
      setFeatureLoading(false);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      try {
        await deleteProgramFeature(id);
        setFeatures(features.filter((f) => f.id !== id));
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete feature');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={3}>{isEditing ? 'Edit Program' : 'Create New Program'}</Title>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/admin/programs')}
          >
            Back to Programs
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
              placeholder="e.g. Mindfulness-Based Stress Reduction"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />

            <Group grow>
              <TextInput
                label="Slug"
                placeholder="e.g. mbsr"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <TextInput
                label="Short Title"
                placeholder="e.g. MBSR"
                required
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
              />
            </Group>

            <TextInput
              label="Tagline"
              placeholder="e.g. An evidence-based approach to stress reduction"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />

            <Textarea
              label="Description"
              placeholder="Brief description of the program"
              required
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Group grow>
              <ColorInput
                label="Color"
                value={color}
                onChange={setColor}
              />
              <Select
                label="Icon"
                data={iconOptions}
                value={iconName}
                onChange={setIconName}
                searchable
                required
              />
            </Group>

            <TextInput
              label="CTA Text"
              placeholder="e.g. Learn More About MBSR"
              required
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
            />

            <div>
              <Text size="sm" fw={500} mb={4}>
                Learn More Content
              </Text>
              <BlogRichTextEditor
                content={learnMoreContent}
                onChange={setLearnMoreContent}
              />
            </div>

            <Group grow>
              <NumberInput
                label="Sort Order"
                value={sortOrder}
                onChange={setSortOrder}
                min={0}
              />
            </Group>

            <Switch
              label="Active"
              description="Active programs appear on the public site"
              checked={active}
              onChange={(e) => setActive(e.currentTarget.checked)}
            />
          </Stack>
        </Paper>

        {/* Features Section */}
        <Paper withBorder p="md" radius="md">
          <Stack gap="md">
            <Title order={4}>Program Features</Title>

            {!isEditing ? (
              <Text c="dimmed" size="sm">
                Save the program first, then add features.
              </Text>
            ) : (
              <>
                <Paper withBorder p="md" radius="md" bg="gray.0">
                  <form onSubmit={handleFeatureSubmit}>
                    <Stack gap="md">
                      <Text fw={600} size="sm">
                        {editingFeatureId ? 'Edit Feature' : 'Add Feature'}
                      </Text>
                      <TextInput
                        label="Title"
                        placeholder="e.g. Weekly Sessions"
                        required
                        value={featureTitle}
                        onChange={(e) => setFeatureTitle(e.target.value)}
                      />
                      <Textarea
                        label="Description"
                        placeholder="Brief description of this feature"
                        value={featureDescription}
                        onChange={(e) => setFeatureDescription(e.target.value)}
                      />
                      <Group grow>
                        <Select
                          label="Icon"
                          data={iconOptions}
                          value={featureIconName}
                          onChange={setFeatureIconName}
                          searchable
                        />
                        <NumberInput
                          label="Sort Order"
                          value={featureSortOrder}
                          onChange={setFeatureSortOrder}
                          min={0}
                        />
                      </Group>
                      <Textarea
                        label="List Items (one per line)"
                        placeholder="Item 1&#10;Item 2&#10;Item 3"
                        minRows={3}
                        value={featureListItems}
                        onChange={(e) => setFeatureListItems(e.target.value)}
                      />
                      <Group>
                        <Button
                          type="submit"
                          size="sm"
                          leftSection={<IconPlus size={16} />}
                          loading={featureLoading}
                        >
                          {editingFeatureId ? 'Update' : 'Add'} Feature
                        </Button>
                        {editingFeatureId && (
                          <Button variant="default" size="sm" onClick={resetFeatureForm}>
                            Cancel
                          </Button>
                        )}
                      </Group>
                    </Stack>
                  </form>
                </Paper>

                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Title</Table.Th>
                      <Table.Th>Icon</Table.Th>
                      <Table.Th>Sort</Table.Th>
                      <Table.Th />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {features.map((feature) => (
                      <Table.Tr key={feature.id}>
                        <Table.Td>
                          <Text
                            size="sm"
                            fw={500}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEditFeature(feature)}
                          >
                            {feature.title}
                          </Text>
                          {feature.description && (
                            <Text size="xs" c="dimmed">
                              {feature.description}
                            </Text>
                          )}
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed">{feature.iconName}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{feature.sortOrder}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs" justify="flex-end">
                            <ActionIcon
                              variant="subtle"
                              color="gray"
                              onClick={() => handleEditFeature(feature)}
                              aria-label="Edit feature"
                            >
                              <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => handleDeleteFeature(feature.id)}
                              aria-label="Delete feature"
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    {features.length === 0 && (
                      <Table.Tr>
                        <Table.Td colSpan={4}>
                          <Text ta="center" c="dimmed" py="md">
                            No features yet.
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </>
            )}
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button
            type="button"
            variant="default"
            onClick={() => router.push('/admin/programs')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<IconDeviceFloppy size={16} />}
            loading={loading}
          >
            {isEditing ? 'Update Program' : 'Create Program'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
