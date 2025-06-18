// App.jsx (or wherever you need it)
import React from 'react';
import { MantineProvider, Title } from '@mantine/core';
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
      // no icon -> defaults to IconExternalLink
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
      // no icon -> defaults to IconExternalLink
    },
  ];

  return (
      <div style={{ maxWidth: 900, margin: 'auto', padding: '1rem' }} className={classes.linksContainer}>
        <Title className={classes.title} order={2}>
            Links    
        </Title>
        <LinkGrid links={links} />
      </div>
  );
}
