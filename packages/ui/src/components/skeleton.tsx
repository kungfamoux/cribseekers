import React from 'react';
import { cn } from '../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const variantStyles = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded',
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-pulse bg-gray-200', variantStyles[variant], className)}
        style={{ width, height }}
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
