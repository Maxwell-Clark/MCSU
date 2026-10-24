import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { getSiteUrl, getStripe } from '@/lib/stripe';
import { getSession } from '@/lib/supabase/auth';

/** Opens the Stripe Customer Portal so members can update cards and view invoices. */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 });
    }

    const portal = await getStripe().billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${getSiteUrl()}/membership/dashboard`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (error) {
    logger.error(
      'Billing portal error',
      { userId: session.user.id, action: 'billing_portal' },
      error
    );
    return NextResponse.json({ error: 'Unable to open billing portal' }, { status: 500 });
  }
}
