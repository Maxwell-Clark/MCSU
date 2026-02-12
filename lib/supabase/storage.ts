'use server';

import { createClient } from './server';

const BUCKET_NAME = 'images';

export async function uploadImage(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const supabase = await createClient();

  // Extract the file path from the public URL
  const bucketPath = url.split(`/storage/v1/object/public/${BUCKET_NAME}/`)[1];
  if (!bucketPath) return;

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([bucketPath]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}
