import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { redirect } from 'next/navigation';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import { AdminLayout } from '@/components/Admin/AdminLayout/AdminLayout';
import { getSession } from '@/lib/supabase/auth';

export const metadata = {
  title: 'Admin Dashboard - MCSU',
  description: 'MCSU Admin Dashboard',
};

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // The server actions enforce admin access too; this keeps members out of the admin UI
  const session = await getSession();
  if (!session) {
    redirect('/login?redirect=/admin');
  }
  if (session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="light">
          <AdminLayout>{children}</AdminLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
