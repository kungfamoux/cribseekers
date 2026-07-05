import React from 'react';
import { cn } from '../lib/utils';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  duration?: number;
}

const typeStyles = {
  success: 'bg-success-500 text-white',
  error: 'bg-error-500 text-white',
  warning: 'bg-warning-500 text-white',
  info: 'bg-primary-500 text-white',
};

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50',
        typeStyles[type],
      )}
    >
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
