import { revalidatePath } from 'next/cache';
import {
  createContentItem,
  deleteContentItem,
  getActiveContent,
  getContentItems,
  updateContentItem,
} from '@/lib/actions/content';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    contentItem: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));
jest.mock('@/lib/supabase/auth', () => ({ requireAdmin: jest.fn() }));
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

const db = prisma.contentItem as unknown as Record<string, jest.Mock>;
const requireAdminMock = requireAdmin as jest.Mock;

const track = {
  kind: 'music' as const,
  title: 'Orinoco Flow',
  creator: 'Enya',
  category: 'Melodic',
  youtube: 'https://youtu.be/LTrk4X9ACtw',
};

describe('content actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    requireAdminMock.mockResolvedValue({ user: { id: 'admin-1', role: 'admin' } });
    db.findFirst.mockResolvedValue(null);
    db.create.mockImplementation(async ({ data }) => ({ id: 'new-id', ...data }));
    db.update.mockImplementation(async ({ where, data }) => ({ id: where.id, ...data }));
  });

  it('rejects non-admins before touching the database', async () => {
    requireAdminMock.mockRejectedValue(new Error('Forbidden: Admin access required'));
    await expect(createContentItem(track)).rejects.toThrow('Forbidden');
    await expect(deleteContentItem('x')).rejects.toThrow('Forbidden');
    await expect(getContentItems('music')).rejects.toThrow('Forbidden');
    expect(db.create).not.toHaveBeenCalled();
    expect(db.delete).not.toHaveBeenCalled();
    expect(db.findMany).not.toHaveBeenCalled();
  });

  it('stores the YouTube ID parsed from the pasted link', async () => {
    await createContentItem(track);
    expect(db.create.mock.calls[0][0].data).toMatchObject({
      kind: 'music',
      youtubeId: 'LTrk4X9ACtw',
      creator: 'Enya',
    });
  });

  it('refreshes the admin list and the public page', async () => {
    await createContentItem(track);
    expect(revalidatePath).toHaveBeenCalledWith('/admin/content');
    expect(revalidatePath).toHaveBeenCalledWith('/practice');

    await createContentItem({
      kind: 'link',
      title: 'Tara Brach',
      url: 'https://www.tarabrach.com',
    });
    expect(revalidatePath).toHaveBeenCalledWith('/resources');
  });

  it('rejects an invalid YouTube link', async () => {
    await expect(createContentItem({ ...track, youtube: 'https://vimeo.com/1' })).rejects.toThrow(
      'not a valid YouTube link'
    );
  });

  it.each([
    [{ kind: 'music', title: 'No video', category: 'Nature' }, 'YouTube link is required'],
    [
      { kind: 'practice_video', title: 'No category', youtube: 'dQw4w9WgXcQ' },
      'Category is required',
    ],
    [{ kind: 'book', title: 'No cover', url: 'https://example.com' }, 'Cover image is required'],
    [{ kind: 'poem', title: 'No text', creator: 'Rumi' }, 'Poem text is required'],
    [{ kind: 'link', title: 'Bad link', url: 'javascript:alert(1)' }, 'must start with http'],
    [{ kind: 'link', title: '', url: 'https://example.com' }, 'Title is required'],
  ])('enforces the rules for %o', async (input, message) => {
    await expect(createContentItem(input as never)).rejects.toThrow(message);
    expect(db.create).not.toHaveBeenCalled();
  });

  it('rejects a video already in the same list', async () => {
    db.findFirst.mockResolvedValue({ title: 'Orinoco Flow' });
    await expect(createContentItem(track)).rejects.toThrow('already in Music as "Orinoco Flow"');
    expect(db.create).not.toHaveBeenCalled();
  });

  it('ignores the item itself when checking for duplicates on update', async () => {
    await updateContentItem('item-1', track);
    expect(db.findFirst.mock.calls[0][0].where).toMatchObject({
      kind: 'music',
      youtubeId: 'LTrk4X9ACtw',
      NOT: { id: 'item-1' },
    });
  });

  it('drops fields the kind does not use', async () => {
    await createContentItem({
      kind: 'link',
      title: 'Insight Timer',
      url: 'https://insighttimer.com/',
      creator: 'stale value',
      youtube: 'dQw4w9WgXcQ',
    });
    expect(db.create.mock.calls[0][0].data).toMatchObject({ creator: null, youtubeId: null });
  });

  it('keeps blank lines inside a poem', async () => {
    await createContentItem({
      kind: 'poem',
      title: 'Test',
      creator: 'Poet',
      body: '\r\nline one\r\n\r\nline three\r\n',
    });
    expect(db.create.mock.calls[0][0].data.body).toBe('line one\n\nline three');
  });

  it('returns active content grouped by kind, with no admin check', async () => {
    requireAdminMock.mockRejectedValue(new Error('should not be called'));
    db.findMany.mockResolvedValue([
      { id: '1', kind: 'music', title: 'A' },
      { id: '2', kind: 'practice_video', title: 'B' },
    ]);

    const result = await getActiveContent(['practice_video', 'music']);
    expect(result.music.map((i) => i.id)).toEqual(['1']);
    expect(result.practice_video.map((i) => i.id)).toEqual(['2']);
    expect(db.findMany.mock.calls[0][0].where).toEqual({
      kind: { in: ['practice_video', 'music'] },
      active: true,
    });
  });
});
