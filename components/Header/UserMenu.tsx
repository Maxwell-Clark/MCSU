'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, Text } from '@mantine/core';
import {
  IconUser,
  IconDashboard,
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconId,
} from '@tabler/icons-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import headerClasses from './Header.module.css';

interface UserInfo {
  email: string;
  name: string;
  role: string;
}

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    // Role comes from the database (same source as the admin route guard), never
    // from auth metadata, so members are never shown admin links.
    const loadUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        const data = res.ok ? await res.json() : null;
        if (cancelled) return;
        setUser(
          data
            ? {
                email: data.email || '',
                name: data.name || data.email || '',
                role: data.role === 'admin' ? 'admin' : 'member',
              }
            : null
        );
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        setUser(null);
      } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        loadUser();
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) return null;

  if (!user) {
    return (
      <Button
        component={Link}
        href="/login"
        variant="default"
        size="compact-sm"
        className={headerClasses.navButton}
      >
        Login
      </Button>
    );
  }

  return (
    <Menu shadow="md" width={220} position="bottom-end">
      <Menu.Target>
        <Button
          variant="default"
          size="compact-sm"
          className={headerClasses.navButton}
          rightSection={<IconChevronDown size={14} />}
          leftSection={<IconUser size={16} />}
        >
          {user.name.split('@')[0]}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Text size="xs" truncate>
            {user.email}
          </Text>
        </Menu.Label>
        {user.role === 'admin' && (
          <Menu.Item
            component={Link}
            href="/admin"
            leftSection={<IconDashboard size={14} />}
          >
            Admin Dashboard
          </Menu.Item>
        )}
        <Menu.Item
          component={Link}
          href="/membership/dashboard"
          leftSection={<IconId size={14} />}
        >
          My Membership
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/account/profile"
          leftSection={<IconSettings size={14} />}
        >
          Edit Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={handleSignOut}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
