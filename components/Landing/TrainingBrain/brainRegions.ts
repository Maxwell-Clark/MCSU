import {
  IconBrain,
  IconFocus,
  IconMoodSmile,
  IconHeartbeat,
  IconEye,
  IconNetwork,
} from '@tabler/icons-react';

export type BrainRegionId = 'pfc' | 'acc' | 'hippocampus' | 'amygdala' | 'insula' | 'dmn';

export interface BrainRegionData {
  id: BrainRegionId;
  title: string;
  abbreviation?: string;
  change: string;
  benefits: string[];
  icon: React.FC<any>;
  colorClass: 'sage' | 'purple' | 'paleSage';
  /** Hotspot position as percentage of image dimensions */
  hotspot: { x: number; y: number };
}

export const BRAIN_REGIONS: BrainRegionData[] = [
  {
    id: 'pfc',
    title: 'Prefrontal Cortex',
    abbreviation: 'PFC',
    change: 'Increased gray matter density/thickness',
    benefits: ['Attention', 'Decision making', 'Self-awareness', 'Planning', 'Emotional control'],
    icon: IconBrain,
    colorClass: 'sage',
    hotspot: { x: 14, y: 30 },
  },
  {
    id: 'acc',
    title: 'Anterior Cingulate Cortex',
    abbreviation: 'ACC',
    change: 'Increased gray matter volume',
    benefits: ['Attention', 'Reduced DMN activity', 'Less mind-wandering'],
    icon: IconFocus,
    colorClass: 'purple',
    hotspot: { x: 34, y: 35 },
  },
  {
    id: 'hippocampus',
    title: 'Hippocampus',
    change: 'Increased gray matter density, new neuron growth',
    benefits: ['Memory', 'Learning', 'Stress regulation'],
    icon: IconMoodSmile,
    colorClass: 'paleSage',
    hotspot: { x: 50, y: 54 },
  },
  {
    id: 'amygdala',
    title: 'Amygdala',
    change: 'Decreased gray matter volume/activity',
    benefits: ['Reduced stress/emotional reactivity', 'Improved emotional regulation'],
    icon: IconHeartbeat,
    colorClass: 'sage',
    hotspot: { x: 42, y: 56 },
  },
  {
    id: 'insula',
    title: 'Insula',
    change: 'Increased gray matter thickness/activation',
    benefits: ['Awareness of internal bodily states', 'Empathy', 'Self-awareness'],
    icon: IconEye,
    colorClass: 'purple',
    hotspot: { x: 35, y: 46 },
  },
  {
    id: 'dmn',
    title: 'Default Mode Network',
    abbreviation: 'DMN',
    change: 'Reduced activity and connectivity',
    benefits: ['Decreased self-referential thoughts', 'Less mind-wandering', 'Reduced rumination'],
    icon: IconNetwork,
    colorClass: 'paleSage',
    hotspot: { x: 60, y: 25 },
  },
];

export function getRegionData(id: BrainRegionId): BrainRegionData | undefined {
  return BRAIN_REGIONS.find((r) => r.id === id);
}
