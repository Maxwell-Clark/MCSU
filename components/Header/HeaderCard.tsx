import {
    HoverCard,
    Group,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Divider,
    Center,
    rem,
    Box,
    useMantineTheme,
    ActionIcon,
    Title
  } from '@mantine/core';
  import {
    IconChevronDown,
  } from '@tabler/icons-react';
  import classes from './Header.module.css';
  import { WWABoard } from '../WWABoard/WWABoard';
  import Link from 'next/link';

  export function HeaderCard({ links, title, endpoint }) {
    const theme = useMantineTheme();
  
    const fetchLinks = (data) => {
      return data.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
          <Group wrap="nowrap" align="justify-center">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={500}>
                {item.title}
              </Text>
              <Text size="xs" c="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      ));
    };
  
    return (
      <HoverCard width={400} position="bottom" radius="md" shadow="md" withinPortal>
        <HoverCard.Target>
          <Link  className={classes.link} href={endpoint}  >
            <Center inline>
              <Box component="span" mr={5}>
                {title}
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </Link>
        </HoverCard.Target>
  
        <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
          <Group justify="space-between" px="md">
            <Text fw={500}>{title}</Text>
          </Group>
  
          <Divider my="sm" />
  
          <SimpleGrid cols={2} spacing={0}>
            {fetchLinks(links)}
          </SimpleGrid>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  }
  