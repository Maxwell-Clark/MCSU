'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/supabase/auth';
import { geocodeAddress } from '@/lib/geocode';
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
  meetingUrl: string | null;
  active: boolean;
  locationId: string;
}

export async function createClassEvent(data: ClassEventData) {
  await requireAdmin();

  const classEvent = await prisma.classEvent.create({ data });

  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
  return classEvent;
}

export async function updateClassEvent(id: string, data: ClassEventData) {
  await requireAdmin();

  const classEvent = await prisma.classEvent.update({ where: { id }, data });

  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
  return classEvent;
}

export async function deleteClassEvent(id: string) {
  await requireAdmin();

  await prisma.classEvent.delete({ where: { id } });
  revalidatePath('/admin/classes');
  revalidatePath('/offerings');
  revalidatePath('/practice');
}

export async function toggleClassActive(id: string, active: boolean) {
  await requireAdmin();

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
  await requireAdmin();
  return prisma.classEvent.findMany({
    include: { location: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getClassEvent(id: string) {
  await requireAdmin();
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
}

export async function createLocation(data: LocationData) {
  await requireAdmin();

  const { lat, lng } = await geocodeAddress(data.address);
  const location = await prisma.classLocation.create({
    data: { ...data, lat, lng },
  });

  revalidatePath('/admin/classes', 'layout');
  revalidatePath('/offerings');
  return location;
}

export async function updateLocation(id: string, data: LocationData) {
  await requireAdmin();

  const { lat, lng } = await geocodeAddress(data.address);
  const location = await prisma.classLocation.update({
    where: { id },
    data: { ...data, lat, lng },
  });

  revalidatePath('/admin/classes', 'layout');
  revalidatePath('/offerings');
  return location;
}

export async function deleteLocation(id: string) {
  await requireAdmin();

  await prisma.classLocation.delete({ where: { id } });
  revalidatePath('/admin/classes', 'layout');
  revalidatePath('/offerings');
}

export async function getLocations() {
  return prisma.classLocation.findMany({
    include: { classes: true },
    orderBy: { name: 'asc' },
  });
}
