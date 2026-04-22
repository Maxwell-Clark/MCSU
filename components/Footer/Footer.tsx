import { Container, Group, ActionIcon, UnstyledButton, rem, Text } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconHeart } from '@tabler/icons-react';
import { useDonateModal } from '../Donate/DonateModal';
import classes from './Footer.module.css';

export function Footer() {
  const { open: openDonate } = useDonateModal();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text className={classes.brand}>Mindfulness Center of Southern Utah</Text>
        <Group gap="md" className={classes.links} justify="flex-end" wrap="nowrap">
          <UnstyledButton onClick={openDonate} className={classes.donateLink}>
            <IconHeart size={14} style={{ marginRight: 4 }} />
            Donate
          </UnstyledButton>
          <ActionIcon size="lg" variant="subtle" className={classes.socialIcon}>
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="subtle" className={classes.socialIcon}>
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="subtle" className={classes.socialIcon}>
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
