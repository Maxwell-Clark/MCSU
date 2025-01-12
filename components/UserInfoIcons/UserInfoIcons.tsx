import { Avatar, Text, Group, HoverCard, HoverCardDropdown, Stack, Anchor } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

interface UserInfoIconsProps {
  title?: string;
  name?: string;
  description?: string;
  role?: string;
  img?: string;
  opened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}


export function UserInfoIcons({title, name, description, role, img, opened, onOpen, onClose}: UserInfoIconsProps) {
  const handleOpen = () => {
  }
  return (
    <div>
      {/* <Modal 
        opened={opened}
        onClose={onClose}
        size="auto"
        title="Modal size auto"
        overlayProps={{
          backgroundOpacity: 0.01,
          blur: 3,
        }}
        >
        <Text>Modal with size auto will fits its content</Text>


      </Modal> */}
      <Group  wrap="nowrap">
      <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
        <HoverCard.Target>
        <Avatar
          src={img}
          size={94}
          radius="md"
          onMouseEnter={onOpen}
        />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
          <Avatar
          src={img}
          size={94}
          radius="md"
          onMouseEnter={onOpen}
        />
            <Stack gap={5}>
              <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
                {name}
              </Text>
              <Anchor
                href="https://x.com/mantinedev"
                c="dimmed"
                size="xs"
                style={{ lineHeight: 1 }}
              >
                {title}
              </Anchor>
            </Stack>
          </Group>

          <Text size="sm" mt="md">
            {description}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
        {/* <Avatar
          src={img}
          size={94}
          radius="md"
          onMouseEnter={onOpen}
        /> */}
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            { role }
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
           { name }
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              robert@glassbreaker.io
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              +11 (876) 890 56 23
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}