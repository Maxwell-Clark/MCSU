import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/lib/validations';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = signupSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid input';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email, password, name, phone, tier } = result.data;

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

    // Create database record — roll back Supabase user if this fails
    try {
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
    } catch (dbError) {
      // Roll back: delete the Supabase user so we don't leave orphans
      await supabase.auth.admin.deleteUser(data.user.id);
      logger.error('Database error during signup, rolled back Supabase user', { email, action: 'signup' }, dbError);
      return NextResponse.json(
        { error: 'Account creation failed. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Signup error', { action: 'signup' }, error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
