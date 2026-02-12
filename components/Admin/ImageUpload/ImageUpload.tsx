'use client';

import { useState } from 'react';
import {
  FileInput,
  TextInput,
  SegmentedControl,
  Image,
  Stack,
  Text,
  Alert,
} from '@mantine/core';
import { IconUpload, IconLink, IconAlertCircle } from '@tabler/icons-react';
import { uploadImage } from '@/lib/supabase/storage';
import classes from './ImageUpload.module.css';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export function ImageUpload({ value, onChange, label = 'Image', required = false }: ImageUploadProps) {
  const [mode, setMode] = useState<string>(value && !value.includes('supabase') ? 'url' : 'upload');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const url = await uploadImage(formData);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        {label} {required && <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>}
      </Text>

      <SegmentedControl
        value={mode}
        onChange={setMode}
        data={[
          { label: 'Upload', value: 'upload' },
          { label: 'URL', value: 'url' },
        ]}
        size="xs"
      />

      {error && (
        <Alert icon={<IconAlertCircle size={14} />} color="red" variant="light" p="xs">
          {error}
        </Alert>
      )}

      {mode === 'upload' ? (
        <FileInput
          placeholder="Choose an image file"
          accept="image/*"
          leftSection={<IconUpload size={16} />}
          onChange={handleFileChange}
          disabled={uploading}
          description={uploading ? 'Uploading...' : undefined}
        />
      ) : (
        <TextInput
          placeholder="https://example.com/image.jpg"
          leftSection={<IconLink size={16} />}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {value && (
        <div className={classes.preview}>
          <Image src={value} alt="Preview" radius="sm" mah={200} fit="contain" />
        </div>
      )}
    </Stack>
  );
}
