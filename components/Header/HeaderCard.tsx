import { useState } from 'react';
import {
  HoverCard,
  Group,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  rem,
  Box,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './Header.module.css';
import Link from 'next/link';

export function HeaderCard({ links, title, endpoint }) {
  const [isOpen, setIsOpen] = useState(false);

  const fetchLinks = (data) => {
    return data.map((item) => (
      <Link className={classes.subLink} href={`${endpoint}#${item.id}`} key={item.title}>
        <Group wrap="nowrap" align="flex-start" gap="sm">
          <ThemeIcon
            size={38}
            radius="md"
            className={classes.subLinkIcon}
            variant="light"
          >
            <item.icon style={{ width: rem(20), height: rem(20) }} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500} c="#404040">
              {item.title}
            </Text>
            <Text size="xs" c="#525252" lh={1.4}>
              {item.description}
            </Text>
          </div>
        </Group>
      </Link>
    ));
  };

  return (
    <HoverCard
      width={420}
      position="bottom"
      radius="lg"
      shadow="none"
      withinPortal
      openDelay={100}
      closeDelay={150}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <HoverCard.Target>
        <Link className={classes.link} href={endpoint}>
          <Center inline>
            <Box component="span" mr={5}>
              {title}
            </Box>
            <IconChevronDown
              className={`${classes.chevron} ${isOpen ? classes.chevronOpen : ''}`}
              style={{ width: rem(16), height: rem(16) }}
            />
          </Center>
        </Link>
      </HoverCard.Target>

      <HoverCard.Dropdown className={classes.dropdown}>
        <Text className={classes.dropdownHeader}>{title}</Text>
        <Divider className={classes.dropdownDivider} />
        <SimpleGrid cols={2} spacing="xs">
          {fetchLinks(links)}
        </SimpleGrid>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
