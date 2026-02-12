import PracticeDashboard from "@/components/Practice/PracticeDashboard/PracticeDashboard";
import { getActiveClassEvents } from "@/lib/actions/classes";
import { ClassEvent } from "@/data/classData";

export const dynamic = 'force-dynamic';

export default async function PracticePage() {
  const dbClasses = await getActiveClassEvents();

  const classEvents: ClassEvent[] = dbClasses.map((c) => ({
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

  return <PracticeDashboard classEvents={classEvents} />;
}
