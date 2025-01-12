// App.jsx (or wherever you need it)
import React from 'react';
import { MantineProvider, Title } from '@mantine/core';
import { IconHome, IconMail } from '@tabler/icons-react';
import { LinksCard } from './LinksCard';

import classes from './Links.module.css';
import { LinkGrid } from '@/components/LinkGrid/LinkGrid';

export default function Links() {
  const links = [
    {
      label: 'Jon Kabbot Zin & Mindfulness',
      url: 'https://palousemindfulness.com/index.html',
    },
    {
      label: 'Palouse Mindfulness',
      url: 'https://palousemindfulness.com/index.html',
    },
    {
      label: 'Mindfulness in the Workplace',
      url: 'https://palousemindfulness.com/index.html',
      // no icon -> defaults to IconExternalLink
    },
    {
      label: 'Meditation & Mindfulness',
      url: 'https://palousemindfulness.com/index.html',
    },
    {
      label: 'MBSR',
      url: 'https://palousemindfulness.com/index.html',
    },
    {
      label: 'Emptyness Meditation',
      url: 'https://palousemindfulness.com/index.html',
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
