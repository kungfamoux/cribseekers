'use client';

import { ErrorBoundary } from '@/components/shared';
import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { ToastProvider } from './ToastProvider';
import { AuthProvider } from './AuthProvider';
import { SocketProvider } from './SocketProvider';
import { MapsProvider } from './MapsProvider';
import { ModalProvider } from './ModalProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <QueryProvider>
            <SocketProvider>
              <MapsProvider>
                <ModalProvider>
                  {children}
                  <ToastProvider />
                </ModalProvider>
              </MapsProvider>
            </SocketProvider>
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
