import React from 'react';
import { cn } from '../lib/utils';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
          <div className="mb-6">{children}</div>
          {actions && <div className="flex justify-end space-x-3">{actions}</div>}
        </div>
      </div>
    </div>
  );
};
