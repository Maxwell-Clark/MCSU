import { NextResponse } from 'next/server';
import { donationsToCsv } from '@/lib/donations-csv';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/supabase/auth';

export const dynamic = 'force-dynamic';

/** Downloads every donation as CSV. Admin only (middleware only checks for a login). */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const donations = await prisma.donation.findMany({ orderBy: { donatedAt: 'desc' } });
  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(donationsToCsv(donations), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="mcsu-donations-${today}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
