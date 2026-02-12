import {
  IconBook,
  IconBrain,
  IconCalendar,
  IconLicense,
  IconMan,
  IconFirstAidKit,
  IconMicroscope,
  IconHeart,
  IconLungs,
  IconCloudDataConnection,
  IconSun,
  IconUsers,
  IconClock,
  IconStar,
  IconSchool,
  IconLeaf,
  IconMoodSmile,
  IconYoga,
  IconActivity,
  IconEye,
} from '@tabler/icons-react';
import { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<any>> = {
  IconBook,
  IconBrain,
  IconCalendar,
  IconLicense,
  IconMan,
  IconFirstAidKit,
  IconMicroscope,
  IconHeart,
  IconLungs,
  IconCloudDataConnection,
  IconSun,
  IconUsers,
  IconClock,
  IconStar,
  IconSchool,
  IconLeaf,
  IconMoodSmile,
  IconYoga,
  IconActivity,
  IconEye,
};

export function getIcon(name: string): ComponentType<any> {
  return iconMap[name] || IconStar;
}

export const availableIcons = Object.keys(iconMap);
