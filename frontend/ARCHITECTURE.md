# CribSeekers Frontend Architecture

**Version:** 1.0.0 (Release Candidate 1)
**Date:** July 27, 2026
**Status:** Production Ready
**Architect:** Lead Frontend Architect

---

# Executive Summary

This document defines the enterprise-grade frontend architecture for CribSeekers, built on Next.js 15 (App Router) with React 19, TypeScript, and modern best practices. The architecture is designed to be scalable, maintainable, and performant while strictly adhering to the existing backend API and design system.

**Backend API Base URL:** `https://cribseekers.onrender.com/api/v1`  
**Design System:** Complete 9-phase system in `/DESIGN_SYSTEM/`  
**Authentication:** JWT Bearer tokens with refresh flow  
**Real-time:** WebSocket via Socket.IO

---

# Technology Stack

## Core Framework
- **Next.js 15** - App Router, Server Components, Server Actions
- **React 19** - Latest React features, no deprecated APIs
- **TypeScript 5.7** - Strict mode, full type safety

## Styling
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Accessible component primitives
- **Framer Motion** - Animations
- **Lucide React** - Icons

## State Management
- **TanStack Query v5** - Server state, caching, synchronization
- **Zustand v5** - Client state, global stores

## Forms & Validation
- **React Hook Form v7** - Form management
- **Zod v3** - Schema validation

## Data Fetching
- **Axios v1.7** - HTTP client with interceptors
- **TanStack Query** - Query and mutation hooks

## Real-time
- **Socket.IO Client v4** - WebSocket connections

## Maps & Charts
- **Google Maps SDK** - Property locations
- **Recharts** - Analytics visualizations

## Development Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Turbo** - Build system

---

# Backend API Analysis

## API Structure

### Base URL
```
Production: https://cribseekers.onrender.com/api/v1
Development: http://localhost:3001/api/v1
```

### Authentication
- **Type:** JWT Bearer tokens
- **Access Token Expiry:** 15 minutes
- **Refresh Token Expiry:** 7 days
- **Flow:** Login → Access Token + Refresh Token → Refresh on expiry

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  errors: Array<{
    field: string;
    message: string;
  }>;
}
```

### Key Modules
1. **Auth** - Login, signup, refresh, logout, verification
2. **Users** - Profile, settings, KYC
3. **Properties** - CRUD, search, verification
4. **Search** - Global, keyword, filters
5. **Recommendations** - AI-powered suggestions
6. **Inspections** - Booking, tracking, QR/OTP
7. **Wallet** - Balance, transactions, cards
8. **Payments** - Checkout, escrow, receipts
9. **Communication** - Messages, conversations
10. **Notifications** - List, preferences
11. **Storage** - File uploads
12. **Admin** - Moderation, analytics

### WebSocket Events
- Real-time messaging
- Typing indicators
- Notification updates
- Inspection status changes

---

# Design System Integration

## Design Tokens

### Colors (from Phase 4)
```typescript
// Forest Green Palette
forest-900: #0d2f27  // Brand primary
forest-800: #173b33  // Dark brand
forest-500: #4a7a6f  // Accent
forest-200: #dce8d4  // Light background
forest-100: #e8f2e8  // Subtle background

// Gold Palette
gold-500: #e8a553    // CTA, highlights
gold-300: #f0c990    // Light accents
gold-100: #fcf0e0    // Subtle highlights

// Semantic
success-500: #10b981
warning-500: #f59e0b
error-500: #ef4444
info-500: #3b82f6
```

### Typography
```typescript
// Font Families
heading: 'Playfair Display'
body: 'DM Sans'
mono: 'JetBrains Mono'

// Type Scale
display-hero: 64px
display-xl: 56px
display-lg: 48px
heading-xl: 28px
heading-lg: 24px
body-lg: 18px
body-md: 16px
body-sm: 14px
```

### Spacing (8pt Grid)
```typescript
space-1: 4px
space-2: 8px
space-4: 16px  // Base
space-6: 24px
space-8: 32px
space-12: 48px
space-16: 64px
```

### Border Radius
```typescript
radius-sm: 4px
radius-md: 8px   // Buttons, Inputs
radius-lg: 12px  // Cards
radius-xl: 16px
radius-2xl: 24px // Modals
```

### Shadows
```typescript
shadow-2: 0 4px 6px rgba(13, 47, 39, 0.10)  // Cards
shadow-3: 0 10px 15px rgba(13, 47, 39, 0.10) // Raised
shadow-5: 0 25px 50px rgba(13, 47, 39, 0.25) // Float
```

---

# Folder Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Auth layout
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── bookings/
│   │   │   └── page.tsx
│   │   ├── messages/
│   │   │   └── page.tsx
│   │   ├── wallet/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Dashboard layout
│   ├── (public)/                 # Public route group
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Public layout
│   ├── (admin)/                  # Admin route group
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Admin layout
│   ├── api/                      # API routes (if needed)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── not-found.tsx
│   ├── error.tsx
│   └── globals.css
├── components/                  # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   ├── modal/
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── Navigation.tsx
│   ├── shared/                  # Shared components
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── EmptyState.tsx
│   │   └── PageHeader.tsx
│   └── providers/               # Context providers
│       ├── ThemeProvider.tsx
│       ├── QueryProvider.tsx
│       ├── AuthProvider.tsx
│       ├── SocketProvider.tsx
│       ├── ToastProvider.tsx
│       ├── MapsProvider.tsx
│       └── ModalProvider.tsx
├── features/                    # Feature-based modules
│   ├── auth/                   # Authentication feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── properties/             # Properties feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── inspections/            # Inspections feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── messages/               # Messages feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── wallet/                 # Wallet feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── search/                 # Search feature
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
├── hooks/                      # Global custom hooks
│   ├── useAuth.ts
│   ├── useBreakpoint.ts
│   ├── useMediaQuery.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useScrollLock.ts
├── services/                   # API services
│   ├── api/                    # API client setup
│   │   ├── axios.ts
│   │   ├── interceptors.ts
│   │   └── endpoints.ts
│   ├── auth.service.ts
│   ├── property.service.ts
│   ├── inspection.service.ts
│   ├── wallet.service.ts
│   ├── message.service.ts
│   └── notification.service.ts
├── store/                      # Zustand stores
│   ├── auth.store.ts
│   ├── theme.store.ts
│   ├── sidebar.store.ts
│   ├── notification.store.ts
│   ├── chat.store.ts
│   ├── filter.store.ts
│   └── wallet.store.ts
├── types/                      # TypeScript types
│   ├── api.types.ts
│   ├── auth.types.ts
│   ├── property.types.ts
│   ├── inspection.types.ts
│   ├── wallet.types.ts
│   ├── message.types.ts
│   └── common.types.ts
├── utils/                      # Utility functions
│   ├── cn.ts                   # Class name merger
│   ├── format.ts               # Formatting functions
│   ├── validation.ts           # Validation helpers
│   ├── constants.ts            # Constants
│   └── helpers.ts              # General helpers
├── config/                     # Configuration files
│   ├── env.ts                  # Environment config
│   ├── site.ts                 # Site config
│   └── routes.ts               # Route config
├── lib/                        # Third-party library configs
│   ├── tailwind.config.ts
│   ├── lucide.ts
│   └── recharts.ts
├── styles/                     # Global styles
│   ├── globals.css
│   └── design-tokens.css
├── assets/                     # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
├── public/                     # Public folder
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── .env.local                  # Environment variables
├── .env.example
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md
```

---

# Architecture Patterns

## 1. Feature-Based Architecture

Each feature (auth, properties, inspections, etc.) is self-contained with:
- Components specific to the feature
- Custom hooks for feature logic
- Services for API calls
- TypeScript types for the feature

This promotes:
- **Modularity:** Features can be developed independently
- **Scalability:** Easy to add new features
- **Maintainability:** Changes are localized to features

## 2. Separation of Concerns

### Server State (TanStack Query)
- API data, caching, synchronization
- Queries: GET requests
- Mutations: POST, PUT, DELETE requests

### Client State (Zustand)
- UI state (sidebar, modals, theme)
- Temporary state (form drafts, filters)
- User preferences

### URL State (Next.js)
- Route parameters
- Search params (filters, pagination)
- Navigation state

## 3. Layered Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │  (Components, Pages)
├─────────────────────────────────────┤
│         Business Logic Layer        │  (Hooks, Services)
├─────────────────────────────────────┤
│         Data Access Layer           │  (API Client, TanStack Query)
├─────────────────────────────────────┤
│         Infrastructure Layer        │  (Providers, Config)
└─────────────────────────────────────┘
```

---

# Core Infrastructure

## 1. API Client (Axios)

### Configuration
- Base URL from environment
- Request/response interceptors
- JWT refresh flow
- Error mapping
- Request cancellation

### JWT Refresh Flow
1. Request fails with 401
2. Check if refresh token exists
3. Call refresh endpoint
4. Update access token
5. Retry original request
6. If refresh fails, logout user

## 2. TanStack Query Setup

### Query Keys
- Hierarchical structure for cache management
- Type-safe query key factories
- Automatic invalidation on mutations

### Query Configuration
- Stale time: 5 minutes
- Cache time: 10 minutes
- Retry on failure: 3 times
- Refetch on window focus: true

## 3. Zustand Stores

### Auth Store
- User data
- Access token
- Refresh token
- Authentication state
- Login/logout actions

### Theme Store
- Theme mode (light/dark)
- Theme persistence
- Theme toggle action

### Sidebar Store
- Sidebar state (open/closed)
- Mobile sidebar state
- Toggle actions

### Notification Store
- Notifications list
- Unread count
- Mark as read action

### Chat Store
- Active conversation
- Typing indicators
- Message history

### Filter Store
- Search filters
- Saved filters
- Filter persistence

### Wallet Store
- Wallet balance
- Transaction history
- Card information

## 4. Providers

### Theme Provider
- Theme context
- Theme switching
- Dark mode support

### Query Provider
- TanStack Query client
- Query defaults
- Mutation defaults

### Auth Provider
- Authentication context
- Protected route logic
- Role-based access

### Socket Provider
- WebSocket connection
- Event listeners
- Reconnection logic

### Toast Provider
- Toast notifications
- Toast queue management
- Auto-dismiss logic

### Maps Provider
- Google Maps initialization
- Map context
- Geocoding services

### Modal Provider
- Global modal state
- Modal stack management
- Backdrop handling

## 5. Error Handling

### Global Error Boundary
- Catches React errors
- Displays error UI
- Logs error details
- Provides recovery options

### API Error Handler
- Maps HTTP errors to user messages
- Handles network errors
- Shows toast notifications
- Redirects on auth errors

### Form Error Handling
- Zod schema validation
- Field-level error display
- Form-level error summary

## 6. Loading States

### Global Loading Boundary
- Suspense for data fetching
- Loading skeletons
- Progress indicators

### Component Loading States
- Skeleton loaders
- Spinners
- Progress bars

### Page Loading States
- Loading overlay
- Skeleton screens
- Transition animations

---

# Routing Strategy

## Route Groups

### (auth) - Authentication Routes
- `/login`, `/signup`, `/forgot-password`
- No authentication required
- Auth-specific layout

### (dashboard) - Dashboard Routes
- `/home`, `/search`, `/properties`, `/bookings`, `/messages`, `/wallet`, `/profile`
- Authentication required
- Dashboard layout with sidebar
- Protected by auth middleware

### (public) - Public Routes
- `/about`, `/contact`, `/faq`
- No authentication required
- Public layout

### (admin) - Admin Routes
- `/admin/dashboard`, `/admin/users`, `/admin/properties`
- Admin role required
- Admin layout
- Protected by role middleware

## Protected Routes

### Middleware
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname.startsWith('/auth') || pathname === '/') {
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Admin routes
  if (pathname.startsWith('/admin')) {
    const user = await getUserFromToken(token.value);
    if (!user?.roles?.includes('ADMIN')) {
      return NextResponse.redirect(new URL('/dashboard/home', request.url));
    }
  }

  return NextResponse.next();
}
```

---

# Performance Optimization

## Code Splitting

### Route-Based Splitting
- Next.js App Router automatic splitting
- Lazy loading for heavy components

### Component-Based Splitting
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

## Image Optimization

### Next.js Image
- Automatic WebP conversion
- Responsive images
- Lazy loading
- Blur-up placeholders

## Data Fetching Optimization

### TanStack Query
- Automatic caching
- Background refetching
- Request deduplication
- Optimistic updates

### Server Components
- Reduce client bundle size
- Server-side data fetching
- Streaming responses

## Bundle Optimization

### Tree Shaking
- Remove unused code
- Import only what's needed

### Minification
- Production builds minified
- CSS purged with Tailwind

---

# Accessibility

## WCAG 2.1 AA Compliance

### Semantic HTML
- Proper heading hierarchy
- Landmark regions
- ARIA labels where needed

### Keyboard Navigation
- Tab order
- Focus indicators
- Keyboard shortcuts

### Screen Reader Support
- ARIA attributes
- Alt text for images
- Live regions for dynamic content

### Color Contrast
- 4.5:1 for normal text
- 3:1 for large text
- Design system tokens ensure compliance

---

# Security

## Authentication Security

### JWT Storage
- HttpOnly cookies for tokens
- Secure flag in production
- SameSite flag for CSRF protection

### Token Refresh
- Automatic refresh on expiry
- Logout on refresh failure
- Clear tokens on logout

## API Security

### Request Headers
- Authorization header
- Content-Type validation
- X-Request-ID for tracking

### CORS
- Configured for production domain
- Strict origin policy

## XSS Prevention

### React Defaults
- Automatic escaping
- No dangerouslySetInnerHTML unless necessary

### Content Security Policy
- CSP headers configured
- Script source restrictions

---

# Development Workflow

## Environment Setup

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run formatting
npm run format
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://cribseekers.onrender.com/api/v1
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key
NEXT_PUBLIC_SOCKET_URL=https://cribseekers.onrender.com
```

## Code Quality

### TypeScript
- Strict mode enabled
- No implicit any
- All files typed

### ESLint
- Next.js rules
- React rules
- Accessibility rules

### Prettier
- Consistent formatting
- Tailwind class sorting

---

# Next Steps

## Phase 2: Generate Folder Structure
- Create all directories
- Set up file structure
- Initialize configuration files

## Phase 3: Create Configuration Files
- Next.js config
- TypeScript config
- Tailwind config
- ESLint config
- Prettier config

## Phase 4: Create Providers
- Theme Provider
- Query Provider
- Auth Provider
- Socket Provider
- Toast Provider
- Maps Provider
- Modal Provider

## Phase 5: Create Reusable Infrastructure
- API client with Axios
- TanStack Query setup
- Zustand stores
- Custom hooks
- Utility functions
- Type definitions
- Error boundaries
- Loading boundaries

---

**End of Frontend Architecture Document**
