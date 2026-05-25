'use client';

import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import classes from './AdminLayout.module.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      className={classes.shell}
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3} className={classes.logo}>
            MCSU Admin
          </Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className={classes.navbar}>
        <AdminSidebar />
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
