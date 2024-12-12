// app/layout.tsx
"use client"; // Needed if MantineProvider or theme rely on client-side

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { theme } from '../theme';
import '@mantine/carousel/styles.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <Header />
          {children} {/* This is where your pages will be rendered */}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
