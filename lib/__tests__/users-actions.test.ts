import { updateUser } from '@/lib/actions/users';
import { prisma } from '@/lib/prisma';

const mockUpdateUserById = jest.fn();

jest.mock('@/lib/prisma', () => ({ prisma: { user: { update: jest.fn() } } }));
jest.mock('@/lib/supabase/auth', () => ({ requireAdmin: jest.fn() }));
jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: { admin: { updateUserById: (...args: unknown[]) => mockUpdateUserById(...args) } },
  }),
}));

const updateMock = prisma.user.update as jest.Mock;

describe('updateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    updateMock.mockResolvedValue({
      role: 'member',
      name: 'Pat',
      phone: null,
      membershipTier: 'kindness',
    });
    mockUpdateUserById.mockResolvedValue({ error: null });
  });

  it('sets the new password in Supabase', async () => {
    await updateUser('user-1', { name: 'Pat', role: 'member', password: 'NewPassw0rd' });
    expect(mockUpdateUserById).toHaveBeenCalledWith(
      'user-1',
      expect.objectContaining({ password: 'NewPassw0rd' })
    );
  });

  it('leaves the password alone when none is given', async () => {
    await updateUser('user-1', { name: 'Pat', role: 'member' });
    expect(mockUpdateUserById.mock.calls[0][1]).not.toHaveProperty('password');
  });

  it('rejects a weak password before changing anything', async () => {
    await expect(updateUser('user-1', { password: 'weak' })).rejects.toThrow();
    expect(updateMock).not.toHaveBeenCalled();
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('reports a Supabase failure instead of claiming success', async () => {
    mockUpdateUserById.mockResolvedValue({ error: { message: 'Auth update failed' } });
    await expect(updateUser('user-1', { password: 'NewPassw0rd' })).rejects.toThrow(
      'Auth update failed'
    );
  });

  it('keeps a member tier when the form only sends the role', async () => {
    await updateUser('user-1', { name: 'Pat', role: 'member' });
    expect(updateMock.mock.calls[0][0].data).not.toHaveProperty('membershipTier');
  });

  it('still updates the tier when one is supplied', async () => {
    await updateUser('user-1', { role: 'member', membershipTier: 'gratitude' });
    expect(updateMock.mock.calls[0][0].data.membershipTier).toBe('gratitude');
  });

  it('clears the tier when a member becomes an admin', async () => {
    await updateUser('user-1', { role: 'admin' });
    expect(updateMock.mock.calls[0][0].data.membershipTier).toBeNull();
  });
});
