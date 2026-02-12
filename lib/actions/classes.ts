'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';

// ClassEvent CRUD

interface ClassEventData {
  title: string;
  topic: string | null;
  instructor: string;
  dayOfWeek: number | null;
  startTime: string;
  endTime: string;
  type: string;
  color: string;
  category: string;
  active: boolean;
  locationId: string;
}

export async function createClassEvent(data: ClassEventData) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const classEvent = await prisma.classEvent.create({ data });

  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
  return classEvent;
}

export async function updateClassEvent(id: string, data: ClassEventData) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const classEvent = await prisma.classEvent.update({ where: { id }, data });

  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
  return classEvent;
}

export async function deleteClassEvent(id: string) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.classEvent.delete({ where: { id } });
  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
}

export async function toggleClassActive(id: string, active: boolean) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const classEvent = await prisma.classEvent.update({
    where: { id },
    data: { active },
  });

  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
  return classEvent;
}

export async function getClassEvents() {
  return prisma.classEvent.findMany({
    include: { location: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getClassEvent(id: string) {
  return prisma.classEvent.findUnique({
    where: { id },
    include: { location: true },
  });
}

export async function getActiveClassEvents() {
  return prisma.classEvent.findMany({
    where: { active: true },
    include: { location: true },
    orderBy: { dayOfWeek: 'asc' },
  });
}

// ClassLocation CRUD

interface LocationData {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export async function createLocation(data: LocationData) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const location = await prisma.classLocation.create({ data });

  revalidatePath('/admin/classes');
  revalidatePath('/admin/classes/locations');
  return location;
}

export async function updateLocation(id: string, data: LocationData) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  const location = await prisma.classLocation.update({ where: { id }, data });

  revalidatePath('/admin/classes');
  revalidatePath('/admin/classes/locations');
  return location;
}

export async function deleteLocation(id: string) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.classLocation.delete({ where: { id } });
  revalidatePath('/admin/classes');
  revalidatePath('/admin/classes/locations');
}

export async function getLocations() {
  return prisma.classLocation.findMany({
    include: { classes: true },
    orderBy: { name: 'asc' },
  });
}
