'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'white',
          border: '1px solid #e4e6de',
          borderRadius: '12px',
          padding: '16px',
        },
      }}
    />
  );
}
