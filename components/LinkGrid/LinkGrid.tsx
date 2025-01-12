'use client';

import React from 'react';
import { SimpleGrid, Card, Text } from '@mantine/core';
import { LinkGridProps } from '@/interfaces/General_Interfaces';
import styles from './LinkGrid.module.css'; // Import your CSS module

export function LinkGrid({ links }: LinkGridProps) {
  return (
    <SimpleGrid
      cols={3}            // 3 columns
      spacing="lg"        // spacing between cards
      verticalSpacing="lg"
      className={styles.grid} // Use className instead of inline style
    >
      {links.map((link, index) => (
        <Card
          key={index}
          // Use className instead of inline style
          className={styles.card}
          // Mantine props for visual styling
          radius="md"
          shadow="sm"
          // p="md"
          // Open in new tab on click
          onClick={() => window.open(link.url, '_blank')}
        >
          <Text className={styles.label} size="md">{link.label}</Text>
        </Card>
      ))}
    </SimpleGrid>
  );
}
