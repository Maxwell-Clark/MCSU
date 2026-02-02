import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import { AdminLayout } from '@/components/Admin/AdminLayout/AdminLayout';

export const metadata = {
  title: 'Admin Dashboard - MCSU',
  description: 'MCSU Admin Dashboard',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AdminLayout>{children}</AdminLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
