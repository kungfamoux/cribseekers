# Architecture Documentation

## Overview

CribSeekers is a monorepo built with Turborepo and pnpm workspaces, consisting of a NestJS backend API, Next.js web application, Next.js admin portal, and shared packages.

## Monorepo Structure

```
cribseekers/
├── apps/
│   ├── api/              # NestJS backend API
│   │   ├── src/
│   │   │   ├── common/   # Shared utilities (guards, filters, interceptors)
│   │   │   ├── config/   # Configuration module
│   │   │   ├── database/ # Database modules (Prisma, Redis)
│   │   │   ├── modules/  # Feature modules
│   │   │   │   ├── auth/
│   │   │   │   ├── properties/
│   │   │   │   ├── users/
│   │   │   │   ├── health/
│   │   │   │   └── workers/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   ├── web/              # Next.js web application
│   │   ├── src/
│   │   │   ├── app/      # App Router pages
│   │   │   ├── components/
│   │   │   ├── lib/      # Utilities and clients
│   │   │   └── styles/
│   │   └── package.json
│   └── admin/            # Next.js admin portal
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   └── lib/
│       └── package.json
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── validation/       # Shared Zod schemas
│   ├── config/           # Shared configuration
│   ├── ui/               # Shared UI components
│   └── api-client/       # Shared API client
├── .github/
│   └── workflows/
│       └── ci.yml        # GitHub Actions CI/CD
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Backend Architecture (NestJS)

### Core Modules

**Common Module**
- `LoggerService`: Pino-based logging
- `GlobalExceptionFilter`: Centralized error handling
- `ResponseInterceptor`: Standardized API responses
- Guards: JWT authentication, role-based access
- Decorators: RequestId, User, Roles, Public

**Database Module**
- `PrismaModule`: Prisma ORM integration
- `RedisModule`: Redis caching integration
- `RedisService`: Redis operations wrapper

**Health Module**
- Health check endpoints
- Custom health indicators (Redis, Database)

**Workers Module**
- BullMQ queue configuration
- Job processors: Email, Notification, Media

### API Design

The API follows RESTful conventions with:
- Versioned endpoints (`/api/v1`)
- Standardized response format
- JWT authentication
- Role-based authorization
- Request throttling
- CORS configuration

### Database Schema

The database uses PostgreSQL with Prisma ORM. Key entities:
- Users (with profiles for agents and landlords)
- Properties
- Inspections
- Reviews
- Notifications
- Conversations/Messages
- Wallets/Transactions

## Frontend Architecture (Next.js)

### Web Application

**App Router Structure**
- Server and client components
- Route groups for organization
- Layouts for shared UI
- Loading and error states

**State Management**
- TanStack Query for server state
- React Context for client state
- Local storage for persistence

**Styling**
- TailwindCSS for utility classes
- Shared UI components from `@cribseekers/ui`

### Admin Portal

Similar structure to web application with admin-specific features and layouts.

## Shared Packages

### Types Package
Common TypeScript types used across the monorepo:
- User types
- Property types
- API response types
- Enums and constants

### Validation Package
Zod schemas for:
- Request validation
- Form validation
- Type inference

### Config Package
Centralized configuration:
- Environment variables
- Feature flags
- App settings

### UI Package
Reusable React components:
- Button, Input, Card
- Typography components
- Layout components
- Form components

### API Client Package
Axios-based HTTP client with:
- Request/response interceptors
- Token management
- Error handling
- Resource modules

## Infrastructure

### Docker Compose

Services:
- PostgreSQL (database)
- Redis (caching/queues)
- API (NestJS)
- Web (Next.js)
- Admin (Next.js)

### CI/CD

GitHub Actions workflow:
- Linting
- Type checking
- Testing
- Building
- Artifact uploads

## Security

- JWT-based authentication
- Role-based access control
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (Next.js)
- CSRF protection
- Rate limiting
- Helmet.js security headers

## Performance

- Redis caching
- Database indexing
- Lazy loading (Next.js)
- Image optimization
- Code splitting
- CDN ready

## Scalability

- Horizontal scaling (stateless API)
- Queue-based job processing
- Database connection pooling
- Redis clustering support
- Microservices-ready architecture
