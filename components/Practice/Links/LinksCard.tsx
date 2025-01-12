import React from 'react';
import styles from './Links.module.css'; // Import the CSS module
import { Card, Title, Text, Anchor, Group } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

/**
 * Expected link shape:
 * {
 *   label: string;        // text for the link
 *   url: string;          // href to navigate to
 *   icon?: React.FC<any>; // optional icon component (e.g. from @tabler/icons-react)
 * }
 */
export function LinksCard({ title = 'Useful Links', links = [] }) {
  return (
    <div >
      {/* Card "header" section */}

      {/* Container for link items */}
      <div className={styles.linksContainer}>
        {links.map((link, index) => {
          // If icon is not provided, default to IconExternalLink
          const IconComponent = link.icon ?? IconExternalLink;

          return (
            <Group key={index} className={styles.linkItem}>
              <IconComponent size={18} stroke={1.5} className={styles.linkIcon} />
              <Anchor
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkAnchor}
              >
                <Text className={styles.linkItem} size="sm">{link.label}</Text>
              </Anchor>
            </Group>
          );
        })}
      </div>
    </div>
  );
}
