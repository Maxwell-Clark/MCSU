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
import { createClassEvent, updateClassEvent } from '@/lib/actions/classes';
import classes from './ClassForm.module.css';

interface ClassFormProps {
  classEvent?: {
    id: string;
    title: string;
    topic: string | null;
    instructor: string;
    dayOfWeek: number | null;
    startTime: string;
    endTime: string;
    type: string;
    color: string;
    category: string;
    active: boolean;
    locationId: string;
  };
  locations: { id: string; name: string }[];
}

const dayOptions = [
  { value: '', label: 'TBD' },
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

const typeOptions = [
  { value: 'virtual', label: 'Virtual' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'hybrid', label: 'Hybrid' },
];

const categoryOptions = [
  { value: 'intro', label: 'Intro' },
  { value: 'mbsr', label: 'MBSR' },
  { value: 'everyday', label: 'Everyday' },
  { value: 'drop-in', label: 'Drop-in' },
];

const colorOptions = [
  { value: 'sage', label: 'Sage' },
  { value: 'purple', label: 'Purple' },
  { value: 'blue', label: 'Blue' },
  { value: 'teal', label: 'Teal' },
  { value: 'indigo', label: 'Indigo' },
];

export function ClassForm({ classEvent, locations }: ClassFormProps) {
  const router = useRouter();
  const isEditing = !!classEvent;

  const [title, setTitle] = useState(classEvent?.title || '');
  const [topic, setTopic] = useState(classEvent?.topic || '');
  const [instructor, setInstructor] = useState(classEvent?.instructor || '');
  const [dayOfWeek, setDayOfWeek] = useState<string>(
    classEvent?.dayOfWeek !== null && classEvent?.dayOfWeek !== undefined
      ? String(classEvent.dayOfWeek)
      : ''
  );
  const [startTime, setStartTime] = useState(classEvent?.startTime || '');
  const [endTime, setEndTime] = useState(classEvent?.endTime || '');
  const [type, setType] = useState<string | null>(classEvent?.type || 'virtual');
  const [color, setColor] = useState<string | null>(classEvent?.color || 'sage');
  const [category, setCategory] = useState<string | null>(classEvent?.category || 'intro');
  const [active, setActive] = useState(classEvent?.active ?? true);
  const [locationId, setLocationId] = useState<string | null>(classEvent?.locationId || null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!locationId) throw new Error('Please select a location');
      if (!type) throw new Error('Please select a type');
      if (!category) throw new Error('Please select a category');
      if (!color) throw new Error('Please select a color');

      const data = {
        title,
        topic: topic || null,
        instructor,
        dayOfWeek: dayOfWeek ? parseInt(dayOfWeek) : null,
        startTime: startTime || 'TBD',
        endTime: endTime || 'TBD',
        type,
        color,
        category,
        active,
        locationId,
      };

      if (isEditing && classEvent) {
        await updateClassEvent(classEvent.id, data);
      } else {
        await createClassEvent(data);
      }

      router.push('/admin/classes');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const locationData = locations.map((loc) => ({
    value: loc.id,
    label: loc.name,
  }));

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={3}>{isEditing ? 'Edit Class' : 'Create New Class'}</Title>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => router.push('/admin/classes')}
          >
            Back to Classes
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
              placeholder="e.g. Monday Mindfulness"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextInput
              label="Topic"
              placeholder="e.g. Weekly Mindfulness Practice"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <TextInput
              label="Instructor"
              placeholder="e.g. Kirk Benson"
              required
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />

            <Group grow>
              <Select
                label="Day of Week"
                data={dayOptions}
                value={dayOfWeek}
                onChange={(val) => setDayOfWeek(val || '')}
                clearable={false}
              />
              <Select
                label="Location"
                placeholder="Select a location"
                data={locationData}
                value={locationId}
                onChange={setLocationId}
                required
              />
            </Group>

            <Group grow>
              <TextInput
                label="Start Time"
                placeholder="e.g. 8:00 PM"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <TextInput
                label="End Time"
                placeholder="e.g. 9:00 PM"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Group>

            <Group grow>
              <Select
                label="Type"
                data={typeOptions}
                value={type}
                onChange={setType}
                required
              />
              <Select
                label="Category"
                data={categoryOptions}
                value={category}
                onChange={setCategory}
                required
              />
              <Select
                label="Color"
                data={colorOptions}
                value={color}
                onChange={setColor}
                required
              />
            </Group>

            <Switch
              label="Active"
              description="Active classes appear on the public site"
              checked={active}
              onChange={(e) => setActive(e.currentTarget.checked)}
            />
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button
            type="button"
            variant="default"
            onClick={() => router.push('/admin/classes')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<IconDeviceFloppy size={16} />}
            loading={loading}
          >
            {isEditing ? 'Update Class' : 'Create Class'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
