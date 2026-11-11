'use client';

import React from 'react';
import { Title } from '@mantine/core';
import { LinkGrid } from '@/components/LinkGrid/LinkGrid';
import type { ContentItemView } from '@/lib/content-kinds';
import classes from './Links.module.css';

interface LinksProps {
  /** Active links, in display order (managed in Admin > Media & Resources) */
  items: ContentItemView[];
}

export default function Links({ items }: LinksProps) {
  const links = items
    .filter((item) => item.url)
    .map((item) => ({ label: item.title, url: item.url! }));

  return (
    <div className={classes.wrapper}>
      {/* Gradient orbs */}
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
      </div>

      <div className={classes.content}>
        <Title className={classes.title} order={2}>
          Links
        </Title>
        <div className={classes.glassWrapper}>
          <LinkGrid links={links} />
        </div>
      </div>
    </div>
  );
}
