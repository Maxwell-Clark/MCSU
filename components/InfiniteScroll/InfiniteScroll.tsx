import React from 'react';
import { Box, Text, Image } from '@mantine/core';
import {
  IconReceiptOff,
  IconFileCode,
  IconCircleDotted,
  IconFlame
} from '@tabler/icons-react';

import classes from './InfiniteScroll.module.css';

import { InfiniteScrollProps } from '@/interfaces/Partner_Interfaces';

const features = [
  {
    icon: IconReceiptOff,
    title: 'Free and open source',
    description: 'All packages are published under MIT license, you can use Mantine in any project',
  },
  {
    icon: IconFileCode,
    title: 'TypeScript based',
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: IconCircleDotted,
    title: 'No annoying focus ring',
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: IconFlame,
    title: 'Flexible',
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];

  interface ScrollItem {
    src: string;
    alt: string;
    description?: string;
  }

const InfiniteHorizontalScroll = ({scroll_items}: InfiniteScrollProps) => {
  // Duplicate the array so the second half continues scrolling seamlessly
  const duplicatedFeatures = [...scroll_items, ...scroll_items, ...scroll_items];

  return (
    <Box className={classes['marquee-wrapper']}>
      <Box className={classes["marquee-content"]}>
        {duplicatedFeatures.map((item, index) => {
          return (
                <Box  key={index}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    key={index}
                    className={classes["marquee-item"]}
                    height="auto"
                    fit="contain"
                  />
                </Box>
          );
        })}
      </Box>
    </Box>
  );
}
export default InfiniteHorizontalScroll;