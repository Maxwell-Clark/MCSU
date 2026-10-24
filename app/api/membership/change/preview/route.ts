import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { getMembershipPrice } from '@/lib/membership-billing';
import { getPlanChangeContext, PlanChangeError, planChangeSchema } from '@/lib/membership-change';
import { getStripe } from '@/lib/stripe';
import { getSession } from '@/lib/supabase/auth';

/** What a plan change would cost: the prorated charge today, or when a downgrade starts. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = planChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid plan selection' }, { status: 400 });
  }
  const target = { slug: parsed.data.tier, interval: parsed.data.interval };

  try {
    const ctx = await getPlanChangeContext(session.user.id, target);
    const price = await getMembershipPrice(target);
    const item = ctx.subscription.items.data[0];

    if (!ctx.upgrade) {
      return NextResponse.json({
        effective: 'renewal',
        effectiveAt: item.current_period_end,
        recurringAmount: price.unit_amount,
      });
    }

    const preview = await getStripe().invoices.createPreview({
      customer:
        typeof ctx.subscription.customer === 'string'
          ? ctx.subscription.customer
          : ctx.subscription.customer.id,
      subscription: ctx.subscription.id,
      subscription_details: {
        items: [{ id: item.id, price: price.id }],
        proration_behavior: 'always_invoice',
        proration_date: Math.floor(Date.now() / 1000),
      },
    });

    return NextResponse.json({
      effective: 'now',
      amountDue: preview.amount_due,
      recurringAmount: price.unit_amount,
    });
  } catch (error) {
    if (error instanceof PlanChangeError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    logger.error(
      'Membership change preview error',
      { userId: session.user.id, action: 'membership_change_preview' },
      error
    );
    return NextResponse.json({ error: 'Unable to preview this plan change' }, { status: 500 });
  }
}
