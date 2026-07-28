# CribSeekers Design System
## Phase 9: Developer Handoff

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document provides comprehensive developer handoff materials for implementing the CribSeekers design system. It includes implementation guidelines, component specifications, CSS architecture, design tokens, and code examples for frontend developers.

**Tech Stack Recommendations:**
- React 18+ with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- React Hook Form for forms
- Zustand for state management

---

# Design Tokens

## CSS Custom Properties

### Root Variables

```css
:root {
  /* Colors - Primary */
  --color-forest-900: #0d2f27;
  --color-forest-800: #173b33;
  --color-forest-700: #284b43;
  --color-forest-600: #3d665c;
  --color-forest-500: #4a7a6f;
  --color-forest-400: #6e8c82;
  --color-forest-300: #9ab5ab;
  --color-forest-200: #dce8d4;
  --color-forest-100: #e8f2e8;
  --color-forest-50: #f2f7f2;

  /* Colors - Gold */
  --color-gold-900: #8a5e2a;
  --color-gold-700: #b8823e;
  --color-gold-500: #e8a553;
  --color-gold-300: #f0c990;
  --color-gold-100: #fcf0e0;
  --color-gold-50: #fef9f4;

  /* Colors - Gray */
  --color-gray-900: #1a1a1a;
  --color-gray-800: #2d2d2d;
  --color-gray-700: #4a4a4a;
  --color-gray-600: #6e6e6e;
  --color-gray-500: #9a9a9a;
  --color-gray-400: #b8b8b8;
  --color-gray-300: #d4d4d4;
  --color-gray-200: #e8e8e8;
  --color-gray-100: #f5f5f5;
  --color-gray-50: #fafafa;

  /* Colors - Semantic */
  --color-success-500: #10b981;
  --color-success-100: #d1fae5;
  --color-warning-500: #f59e0b;
  --color-warning-100: #fef3c7;
  --color-error-500: #ef4444;
  --color-error-100: #fee2e2;
  --color-info-500: #3b82f6;
  --color-info-100: #dbeafe;

  /* Backgrounds */
  --surface-primary: #fffefa;
  --surface-secondary: #f8f7f2;
  --surface-tertiary: #f2f7f2;
  --surface-elevated: #ffffff;
  --surface-overlay: rgba(13, 47, 39, 0.95);

  /* Text */
  --text-primary: #173b33;
  --text-secondary: #4a4a4a;
  --text-tertiary: #6e6e6e;
  --text-disabled: #9a9a9a;
  --text-inverse: #ffffff;
  --text-link: #284b43;
  --text-link-hover: #0d2f27;

  /* Borders */
  --border-default: #e4e6de;
  --border-strong: #d4d4d4;
  --border-subtle: #f0f0f0;
  --border-focus: #0d2f27;
  --border-error: #ef4444;

  /* Spacing */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-1: 0 1px 3px rgba(13, 47, 39, 0.12);
  --shadow-2: 0 4px 6px rgba(13, 47, 39, 0.10);
  --shadow-3: 0 10px 15px rgba(13, 47, 39, 0.10);
  --shadow-4: 0 20px 25px rgba(13, 47, 39, 0.15);
  --shadow-5: 0 25px 50px rgba(13, 47, 39, 0.25);

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --font-size-display-hero: 64px;
  --font-size-display-xl: 56px;
  --font-size-display-lg: 48px;
  --font-size-display-md: 40px;
  --font-size-display-sm: 32px;
  --font-size-heading-xl: 28px;
  --font-size-heading-lg: 24px;
  --font-size-heading-md: 20px;
  --font-size-heading-sm: 18px;
  --font-size-heading-xs: 16px;
  --font-size-body-lg: 18px;
  --font-size-body-md: 16px;
  --font-size-body-sm: 14px;
  --font-size-body-xs: 12px;
  --font-size-ui-lg: 16px;
  --font-size-ui-md: 14px;
  --font-size-ui-sm: 12px;
  --font-size-ui-xs: 11px;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.1;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;

  /* Letter Spacing */
  --letter-spacing-tight: -2.5px;
  --letter-spacing-normal: 0px;
  --letter-spacing-wide: 0.5px;

  /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-notification: 1080;
  --z-max: 9999;

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-primary: #1a1a1a;
    --surface-secondary: #2d2d2d;
    --surface-tertiary: #4a4a4a;
    --surface-elevated: #3d3d3d;
    --text-primary: #f5f5f5;
    --text-secondary: #d4d4d4;
    --text-tertiary: #9a9a9a;
    --border-default: #4a4a4a;
    --border-strong: #6e6e6e;
    --border-subtle: #3d3d3d;
  }
}
```

---

# CSS Architecture

## File Structure

```
src/
├── styles/
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── variables.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── modals.css
│   │   └── navigation.css
│   ├── utilities/
│   │   ├── spacing.css
│   │   ├── flexbox.css
│   │   └── grid.css
│   └── themes/
│       ├── light.css
│       └── dark.css
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── ...
│   └── layout/
│       ├── Container/
│       ├── Grid/
│       └── Stack/
└── tokens/
    └── index.ts
```

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0d2f27',
          800: '#173b33',
          700: '#284b43',
          600: '#3d665c',
          500: '#4a7a6f',
          400: '#6e8c82',
          300: '#9ab5ab',
          200: '#dce8d4',
          100: '#e8f2e8',
          50: '#f2f7f2',
        },
        gold: {
          900: '#8a5e2a',
          700: '#b8823e',
          500: '#e8a553',
          300: '#f0c990',
          100: '#fcf0e0',
          50: '#fef9f4',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(13, 47, 39, 0.05)',
        'medium': '0 10px 15px rgba(13, 47, 39, 0.10)',
        'float': '0 15px 45px rgba(25, 58, 49, 0.10)',
      },
    },
  },
  plugins: [],
};
```

---

# Component Implementation

## Button Component

### TypeScript Interface

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

### React Implementation

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    onClick,
    className,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-forest-900 text-white hover:bg-forest-800 active:bg-forest-700 focus:ring-forest-200 shadow-soft',
      secondary: 'bg-forest-100 text-forest-900 hover:bg-forest-200 active:bg-forest-300 focus:ring-forest-200',
      tertiary: 'bg-transparent text-forest-900 border-2 border-forest-900 hover:bg-forest-50 active:bg-forest-100 focus:ring-forest-200',
      destructive: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 focus:ring-error-200',
      ghost: 'bg-transparent text-forest-900 hover:bg-forest-50 active:bg-forest-100',
      link: 'bg-transparent text-forest-500 hover:text-forest-900 underline',
    };
    
    const sizes = {
      xs: 'h-7 px-3 text-xs',
      sm: 'h-8 px-4 text-sm',
      md: 'h-10 px-5 text-base',
      lg: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl',
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

---

## Card Component

### TypeScript Interface

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'flat' | 'bordered' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### React Implementation

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    hoverable = false,
    clickable = false,
    children,
    className,
    onClick,
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-200';
    
    const variants = {
      default: 'bg-white border border-gray-200 shadow-soft',
      elevated: 'bg-white shadow-medium',
      flat: 'bg-gray-50 border border-gray-200',
      bordered: 'bg-white border-2 border-gray-300',
      glass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-soft',
    };
    
    const sizes = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };
    
    const hoverStyles = hoverable ? 'hover:shadow-medium hover:border-forest-300' : '';
    const clickStyles = clickable ? 'cursor-pointer active:scale-98' : '';
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          hoverStyles,
          clickStyles,
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
```

---

## Input Component

### TypeScript Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

### React Implementation

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label,
    error,
    helperText,
    icon,
    fullWidth = false,
    size = 'md',
    className,
    ...props 
  }, ref) => {
    const baseStyles = 'flex items-center border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    };
    
    const states = error
      ? 'border-error-500 bg-error-50 focus:ring-error-200 focus:border-error-500'
      : 'border-gray-200 bg-white focus:ring-forest-200 focus:border-forest-900 hover:border-gray-300';
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 text-gray-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              baseStyles,
              sizes[size],
              states,
              icon && 'pl-10',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
```

---

## Modal Component

### TypeScript Interface

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

### React Implementation

```typescript
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  children,
  footer,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-5 w-full mx-4 animate-in fade-in zoom-in duration-200',
          sizes[size]
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-forest-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
```

---

# Layout Components

## Container Component

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'fluid';
  className?: string;
}

const Container = ({ children, size = 'xl', className }: ContainerProps) => {
  const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    fluid: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
};

export default Container;
```

## Grid Component

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: number;
  className?: string;
}

const Grid = ({ children, cols = 12, gap = 6, className }: GridProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  };

  return (
    <div
      className={cn(
        'grid',
        gridCols[cols as keyof typeof gridCols],
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
```

---

# Utility Functions

## cn() - Class Name Merger

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## formatCurrency()

```typescript
export function formatCurrency(amount: number, currency: string = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

## formatDate()

```typescript
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  }
  
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
}
```

---

# Hooks

## useBreakpoint()

```typescript
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xl');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setBreakpoint('xs');
      else if (width < 640) setBreakpoint('sm');
      else if (width < 768) setBreakpoint('md');
      else if (width < 1024) setBreakpoint('lg');
      else if (width < 1280) setBreakpoint('xl');
      else if (width < 1440) setBreakpoint('2xl');
      else setBreakpoint('3xl');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
```

## useMediaQuery()

```typescript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

---

# API Integration Examples

## Property Service

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cribseekers.onrender.com/api/v1';

export const propertyService = {
  async getProperties(params?: {
    page?: number;
    limit?: number;
    city?: string;
    priceMin?: number;
    priceMax?: number;
    bedrooms?: number;
  }) {
    const response = await axios.get(`${API_BASE_URL}/properties`, { params });
    return response.data;
  },

  async getPropertyById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  },

  async searchProperties(query: string, filters?: any) {
    const response = await axios.get(`${API_BASE_URL}/search/keyword`, {
      params: { keyword: query, ...filters },
    });
    return response.data;
  },
};
```

## Authentication Service

```typescript
export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async signup(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  },

  async logout() {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  },
};
```

---

# State Management

## Zustand Store Example

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

---

# Animation Examples

## Framer Motion Variants

```typescript
import { motion } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
};
```

---

# Testing Guidelines

## Component Testing Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

---

# Performance Guidelines

## Code Splitting

```typescript
import dynamic from 'next/dynamic';

const PropertyCard = dynamic(() => import('./PropertyCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64" />,
});

const Modal = dynamic(() => import('./Modal'), {
  ssr: false,
});
```

## Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/property-image.jpg"
  alt="Property"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"
/>
```

---

# Accessibility Implementation

## ARIA Attributes

```typescript
<button
  aria-label="Close modal"
  onClick={onClose}
>
  <X size={20} />
</button>

<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
</div>
```

## Keyboard Navigation

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [onClose]);
```

---

# Deployment Checklist

## Pre-Deployment
- [ ] All design tokens implemented
- [ ] Components tested across breakpoints
- [ ] Accessibility audit passed
- [ ] Performance optimization completed
- [ ] API integration tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Forms validated

## Post-Deployment
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance monitoring
- [ ] Error tracking setup
- [ ] Analytics integration
- [ ] SEO optimization

---

# Design System Maintenance

## Version Control
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Document breaking changes
- Provide migration guides
- Tag releases in git

## Component Updates
- Test changes across all usages
- Update documentation
- Communicate changes to team
- Deprecate old versions gradually

## Token Updates
- Update CSS custom properties
- Update Tailwind config
- Update component props
- Test across all components

---

# Resources

## Design Files
- Figma: [Link to Figma file]
- Design Tokens: [Link to tokens file]
- Icon Library: Lucide React

## Documentation
- Component Storybook: [Link]
- API Documentation: /api/v1/docs
- Design System: /DESIGN_SYSTEM/

## Support
- Design System Lead: [Contact]
- Engineering Lead: [Contact]
- Slack Channel: #design-system

---

# Changelog

## Version 1.0.0 (2026-07-20)
- Initial design system release
- 35 components documented
- 9 phases completed
- Responsive specifications
- Developer handoff materials

---

**End of Phase 9: Developer Handoff**
