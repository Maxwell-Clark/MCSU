import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import { TIER_SLUGS } from '@/lib/membership-tiers';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, tier } = await request.json();

    if (!email || !password || !name || !tier) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!TIER_SLUGS.includes(tier)) {
      return NextResponse.json({ error: 'Invalid membership tier' }, { status: 400 });
    }

    // Use service role client to create user as auto-confirmed
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'member', tier, phone },
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    if (!data.user) {
      return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
    }

    await prisma.user.upsert({
      where: { email },
      create: {
        id: data.user.id,
        email,
        name,
        role: 'member',
        phone: phone || null,
        membershipTier: tier,
      },
      update: {
        name,
        phone: phone || null,
        membershipTier: tier,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
