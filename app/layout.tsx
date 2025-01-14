"use client";

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { theme } from '../theme';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs whenever the pathname changes
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    console.log('scroll to', hash)

    if (hash) {
      // Try to find the element with the given id
      const element = document.querySelector(hash);
      if (element) {
        // Scroll smoothly to that element
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no hash, optionally scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
