import { Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

export function UserInfoIcons({name, role, img}) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src={img}
          size={94}
          radius="md"
        />
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