'use server';

import { createClient } from '@supabase/supabase-js';
import { getSession } from './auth';

const BUCKET_NAME = 'images';

// Service-role client: bypasses storage RLS so authenticated admins can upload
// without needing per-bucket insert policies. Never exposed to the client — this
// module is 'use server' only.
function getStorageClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function uploadImage(formData: FormData): Promise<string> {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const supabase = getStorageClient();
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, { contentType: file.type || undefined });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const supabase = getStorageClient();

  // Extract the file path from the public URL
  const bucketPath = url.split(`/storage/v1/object/public/${BUCKET_NAME}/`)[1];
  if (!bucketPath) return;

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([bucketPath]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}
