import { randomInt } from 'crypto';
import { prisma } from '@/lib/prisma';

/**
 * The shared database (moonandmud) has an `on_auth_user_created` trigger that inserts a
 * `public.profiles` row with a unique `username`, defaulting to the email's local part.
 * If that username is already taken, Supabase rejects the signup with
 * "Database error creating new user". This picks a free username to pass as metadata.
 *
 * Returns undefined (letting the trigger use its default) if profiles can't be checked.
 */
export async function getAvailableProfileUsername(email: string): Promise<string | undefined> {
  const base = email.split('@')[0];

  try {
    if (!(await isUsernameTaken(base))) {
      return base;
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = `${base}-${randomInt(1000, 10000)}`;
      if (!(await isUsernameTaken(candidate))) {
        return candidate;
      }
    }
    return `${base}-${Date.now().toString(36)}`;
  } catch {
    // profiles table missing or unreadable — fall back to the trigger's default
    return undefined;
  }
}

async function isUsernameTaken(username: string): Promise<boolean> {
  const rows = await prisma.$queryRaw<unknown[]>`
    select 1 from public.profiles where username = ${username} limit 1
  `;
  return rows.length > 0;
}
