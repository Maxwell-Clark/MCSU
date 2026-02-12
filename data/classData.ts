export interface ClassEvent {
  id: string;
  title: string;
  topic: string | null;
  instructor: string;
  dayOfWeek?: number | null;
  startTime: string;
  endTime: string;
  location: ClassLocation;
  type: string;
  color: string;
  category: string;
}

export interface ClassLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// St. George, Utah coordinates for map center
export const mapCenter: [number, number] = [37.0965, -113.5684];

// Day names for display
export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
