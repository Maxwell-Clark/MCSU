'use client';

import { useEffect, useState } from 'react';
import { NavLink, Stack, Divider, Text, Button } from '@mantine/core';
import {
  IconDashboard,
  IconArticle,
  IconLogout,
  IconHome,
  IconCalendar,
  IconMapPin,
  IconSchool,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import classes from './AdminSidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: IconDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: IconArticle },
  { label: 'Programs', href: '/admin/programs', icon: IconSchool },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <Stack justify="space-between" h="100%">
      <Stack gap="xs">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            leftSection={<item.icon size={18} stroke={1.5} />}
            active={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
            className={classes.navLink}
          />
        ))}
        <NavLink
          label="Classes"
          leftSection={<IconCalendar size={18} stroke={1.5} />}
          defaultOpened={pathname.startsWith('/admin/classes')}
          className={classes.navLink}
        >
          <NavLink
            href="/admin/classes"
            label="All Classes"
            active={pathname === '/admin/classes' || (pathname.startsWith('/admin/classes/') && !pathname.startsWith('/admin/classes/locations'))}
            className={classes.navLink}
          />
          <NavLink
            href="/admin/classes/locations"
            label="Locations"
            leftSection={<IconMapPin size={14} stroke={1.5} />}
            active={pathname === '/admin/classes/locations'}
            className={classes.navLink}
          />
        </NavLink>
      </Stack>

      <Stack gap="md">
        <Divider />
        {user && (
          <Text size="sm" c="dimmed" className={classes.userInfo}>
            Signed in as {user.email}
          </Text>
        )}
        <NavLink
          href="/"
          label="View Site"
          leftSection={<IconHome size={18} stroke={1.5} />}
          className={classes.navLink}
        />
        <Button
          variant="light"
          color="red"
          leftSection={<IconLogout size={18} />}
          onClick={handleSignOut}
          fullWidth
        >
          Sign out
        </Button>
      </Stack>
    </Stack>
  );
}
