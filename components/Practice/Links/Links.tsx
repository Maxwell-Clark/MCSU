// App.jsx (or wherever you need it)
import React from 'react';
import { MantineProvider, Title } from '@mantine/core';
import { IconHome, IconMail } from '@tabler/icons-react';
import { LinksCard } from './LinksCard';

import classes from './Links.module.css';

export default function Links() {
  const links = [
    {
      label: 'Jon Kabbot Zin & Mindfulness',
      url: '/',
      icon: IconHome,
    },
    {
      label: 'Other Meditation Center',
      url: 'mailto:support@example.com',
    },
    {
      label: 'Mindfulness in the Workplace',
      url: 'https://example.com/docs',
      // no icon -> defaults to IconExternalLink
    },
  ];

  return (
      <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
        <Title className={classes.title} order={2}>
            Links    
        </Title>
        <LinksCard title="Links" links={links} />
      </div>
  );
}
