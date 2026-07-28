export const dynamic = 'force-dynamic';

import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/shared';
import { ThemeProvider, QueryProvider, ToastProvider, AuthProvider } from '@/components/providers';
import { PHProvider } from '@/lib/posthog';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CribSeekers - Nigeria\'s Premier Real Estate Platform',
  description: 'Find your perfect property in Nigeria. Buy, rent, or sell properties with confidence using our secure escrow system and verified listings.',
  keywords: 'real estate, nigeria, property, buy, rent, sell, lagos, abuja, port harcourt',
  authors: [{ name: 'CribSeekers' }],
  creator: 'CribSeekers',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://cribseekers.com',
    title: 'CribSeekers - Nigeria\'s Premier Real Estate Platform',
    description: 'Find your perfect property in Nigeria with secure transactions and verified listings.',
    siteName: 'CribSeekers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CribSeekers - Nigeria\'s Premier Real Estate Platform',
    description: 'Find your perfect property in Nigeria with secure transactions and verified listings.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-body bg-surface-primary text-text-primary`}
      >
        <ErrorBoundary>
          <PHProvider>
            <ThemeProvider>
              <AuthProvider>
                <QueryProvider>
                  <ToastProvider />
                  {children}
                </QueryProvider>
              </AuthProvider>
            </ThemeProvider>
          </PHProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
