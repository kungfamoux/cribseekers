import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/react-query';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CribSeekers - Modern Nigerian Real Estate Platform',
  description: 'Find your perfect home in Nigeria with CribSeekers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
