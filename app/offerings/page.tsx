import { getActiveClassEvents, getLocations } from '@/lib/actions/classes';
import { OfferingsContent } from '@/components/Offerings/OfferingsContent';
import { ClassEvent, ClassLocation } from '@/data/classData';

export const dynamic = 'force-dynamic';

export default async function OfferingsPage() {
  const [dbClasses, dbLocations] = await Promise.all([
    getActiveClassEvents(),
    getLocations(),
  ]);

  // Transform DB classes to match the ClassEvent interface expected by components
  const classes: ClassEvent[] = dbClasses.map((c) => ({
    id: c.id,
    title: c.title,
    topic: c.topic,
    instructor: c.instructor,
    dayOfWeek: c.dayOfWeek,
    startTime: c.startTime,
    endTime: c.endTime,
    location: {
      id: c.location.id,
      name: c.location.name,
      address: c.location.address,
      lat: c.location.lat,
      lng: c.location.lng,
    },
    type: c.type,
    color: c.color,
    category: c.category,
  }));

  const locations: ClassLocation[] = dbLocations.map((l) => ({
    id: l.id,
    name: l.name,
    address: l.address,
    lat: l.lat,
    lng: l.lng,
  }));

  return <OfferingsContent classes={classes} locations={locations} />;
}
