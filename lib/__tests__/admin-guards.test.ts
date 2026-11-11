import { createBlogPost, getBlogPosts } from '@/lib/actions/blog';
import { deleteClassEvent, getClassEvents } from '@/lib/actions/classes';
import { deletePage, getPages } from '@/lib/actions/pages';
import { getPrograms, updateProgram } from '@/lib/actions/programs';
import { requireAdmin } from '@/lib/supabase/auth';
import { deleteImage, uploadImage } from '@/lib/supabase/storage';

// Any prisma.<model>.<method> is a mock, so nothing reaches a database if a guard were missing
jest.mock('@/lib/prisma', () => ({
  prisma: new Proxy({}, { get: () => new Proxy({}, { get: () => jest.fn() }) }),
}));
jest.mock('@/lib/supabase/auth', () => ({ requireAdmin: jest.fn() }));
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));
jest.mock('@supabase/supabase-js', () => ({ createClient: jest.fn() }));

describe('admin-only actions reject members', () => {
  beforeEach(() => {
    (requireAdmin as jest.Mock).mockRejectedValue(new Error('Forbidden: Admin access required'));
  });

  it.each([
    ['createBlogPost', () => createBlogPost({} as never)],
    ['getBlogPosts', () => getBlogPosts()],
    ['deleteClassEvent', () => deleteClassEvent('x')],
    ['getClassEvents', () => getClassEvents()],
    ['deletePage', () => deletePage('x')],
    ['getPages', () => getPages()],
    ['updateProgram', () => updateProgram('x', {} as never)],
    ['getPrograms', () => getPrograms()],
    ['uploadImage', () => uploadImage(new FormData())],
    ['deleteImage', () => deleteImage('https://example.com/x.png')],
  ])('%s', async (_name, call) => {
    await expect(call()).rejects.toThrow('Forbidden');
    expect(requireAdmin).toHaveBeenCalled();
  });
});
