import React from 'react';
import { cn } from '../lib/utils';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', fallback, src, alt, ...props }, ref) => {
    const [imageError, setIsImageError] = React.useState(false);

    if (imageError || !src) {
      return (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-600 font-medium',
            sizeStyles[size],
            className,
          )}
        >
          {fallback || alt?.charAt(0).toUpperCase() || '?'}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={() => setIsImageError(true)}
        className={cn('rounded-full object-cover', sizeStyles[size], className)}
        {...props}
      />
    );
  },
);

Avatar.displayName = 'Avatar';
