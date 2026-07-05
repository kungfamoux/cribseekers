import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/react-query';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CribSeekers Admin',
  description: 'Admin dashboard for CribSeekers platform',
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
