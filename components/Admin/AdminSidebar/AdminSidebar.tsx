'use client';

import { useEffect, useState } from 'react';
import { NavLink, Stack, Divider, Text, Button } from '@mantine/core';
import { IconDashboard, IconArticle, IconLogout, IconHome } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import classes from './AdminSidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: IconDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: IconArticle },
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
