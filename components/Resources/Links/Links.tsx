'use client';

import React from 'react';
import { Title } from '@mantine/core';
import { LinkGrid } from '@/components/LinkGrid/LinkGrid';
import classes from './Links.module.css';

export default function Links() {
  const links = [
    {
      label: 'Center for Healthy Minds',
      url: 'https://centerhealthyminds.org/',
    },
    {
      label: 'Palouse Mindfulness',
      url: 'https://palousemindfulness.com/index.html',
    },
    {
      label: 'Mindfulness Utah',
      url: 'https://www.mindfulnessutah.com',
    },
    {
      label: 'Mindfulness and Health Institute',
      url: 'https://mindfulnessandhealthinstitute.org',
    },
    {
      label: 'Tara Brach',
      url: 'https://www.tarabrach.com',
    },
    {
      label: 'Insight Timer',
      url: 'https://insighttimer.com/',
    },
  ];

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
