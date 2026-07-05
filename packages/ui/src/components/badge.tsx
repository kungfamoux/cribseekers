import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-success-100 text-success-800',
  warning: 'bg-warning-100 text-warning-800',
  error: 'bg-error-100 text-error-800',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center rounded-full font-medium', variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
