import React from 'react';
import { cn } from '../lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'inherit';
  align?: 'left' | 'center' | 'right';
}

const variantStyles = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
};

const colorStyles = {
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  error: 'text-error-600',
  inherit: 'text-inherit',
};

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'inherit',
  align = 'left',
  className,
  children,
  ...props
}) => {
  const Component = variant.startsWith('h') ? (variant as keyof JSX.IntrinsicElements) : 'p';

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
