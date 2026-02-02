export interface ClassEvent {
  id: string;
  title: string;
  topic: string;
  instructor: string;
  date: Date | null; // null for recurring classes
  dayOfWeek?: number; // 0-6 for recurring (Sunday=0)
  startTime: string; // "8:00 PM"
  endTime: string; // "9:00 PM"
  location: ClassLocation;
  type: 'virtual' | 'in-person' | 'hybrid';
  color: string;
  category: 'intro' | 'mbsr' | 'everyday' | 'drop-in';
}

export interface ClassLocation {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

// St. George, Utah coordinates for map center
export const mapCenter: [number, number] = [37.0965, -113.5684];

export const locations: ClassLocation[] = [
  {
    id: 'virtual',
    name: 'Virtual (Online)',
    address: 'Join via Zoom',
    coordinates: [37.0965, -113.5684], // Center of St. George for virtual
  },
  {
    id: 'dr-tate-office',
    name: "Dr. Tate's Office",
    address: '321 N. Mall Dr., Suite I-201, St. George, UT',
    coordinates: [37.1041, -113.5785],
  },
  {
    id: 'utah-tech',
    name: 'Utah Tech University',
    address: '225 S University Ave, St. George, UT',
    coordinates: [37.0974, -113.5684],
  },
];

export const classes: ClassEvent[] = [
  {
    id: 'monday-mindfulness',
    title: 'Monday Mindfulness',
    topic: 'Weekly Mindfulness Practice',
    instructor: 'Kirk Benson',
    date: null,
    dayOfWeek: 1, // Monday
    startTime: '8:00 PM',
    endTime: '9:00 PM',
    location: locations[0], // Virtual
    type: 'virtual',
    color: 'blue',
    category: 'drop-in',
  },
  {
    id: 'wakeup-wednesday',
    title: 'Wake-up Wednesday',
    topic: 'Meditation with Dr. Tate',
    instructor: 'Dr. David Tate',
    date: null,
    dayOfWeek: 3, // Wednesday
    startTime: '5:15 PM',
    endTime: '6:15 PM',
    location: locations[1], // Dr. Tate's Office
    type: 'in-person',
    color: 'indigo',
    category: 'drop-in',
  },
  {
    id: 'intro-mindfulness',
    title: 'Intro to Mindfulness',
    topic: '4-Week Introduction Course',
    instructor: 'TBD',
    date: null,
    dayOfWeek: undefined, // TBD
    startTime: 'TBD',
    endTime: 'TBD',
    location: locations[2], // Utah Tech
    type: 'hybrid',
    color: 'sage',
    category: 'intro',
  },
  {
    id: 'mbsr-course',
    title: 'MBSR Course',
    topic: '8-Week Mindfulness-Based Stress Reduction',
    instructor: 'Dr. David Tate, Kirk Benson',
    date: null,
    dayOfWeek: undefined, // TBD
    startTime: 'TBD',
    endTime: 'TBD',
    location: locations[0], // Virtual/TBD
    type: 'hybrid',
    color: 'purple',
    category: 'mbsr',
  },
];

// Helper to get classes by day of week
export function getClassesByDay(dayOfWeek: number): ClassEvent[] {
  return classes.filter((c) => c.dayOfWeek === dayOfWeek);
}

// Helper to get classes by location
export function getClassesByLocation(locationId: string): ClassEvent[] {
  return classes.filter((c) => c.location.id === locationId);
}

// Helper to get scheduled classes (those with dayOfWeek set)
export function getScheduledClasses(): ClassEvent[] {
  return classes.filter((c) => c.dayOfWeek !== undefined);
}

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
