import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/supabase/auth';
import { logger } from '@/lib/logger';

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.membershipTier) {
      return NextResponse.json({ error: 'No active membership found' }, { status: 400 });
    }

    // Clear membership tier
    await prisma.user.update({
      where: { id: session.user.id },
      data: { membershipTier: null },
    });

    logger.info('Membership cancelled', {
      userId: session.user.id,
      email: session.user.email,
      action: 'membership_cancel',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Membership cancellation error', { action: 'membership_cancel' }, error);
    return NextResponse.json({ error: 'Failed to cancel membership' }, { status: 500 });
  }
}
