'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, Text } from '@mantine/core';
import {
  IconUser,
  IconDashboard,
  IconLogout,
  IconChevronDown,
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

    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        setUser({
          email: authUser.email || '',
          name: authUser.user_metadata?.name || authUser.email || '',
          role: authUser.user_metadata?.role || 'admin',
        });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email || '',
          role: session.user.user_metadata?.role || 'admin',
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) return null;

  // Public account features are hidden — anonymous visitors see no login UI.
  // Admins reach /login directly (or are redirected there from /admin).
  if (!user) {
    return null;
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
