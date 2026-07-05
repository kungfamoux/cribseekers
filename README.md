# CribSeekers

Modern Nigerian real estate platform connecting property seekers, landlords, agencies, and verified agents.

## Technology Stack

### Monorepo
- Turborepo
- pnpm Workspace

### Backend
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Redis
- BullMQ
- Swagger
- Pino Logger

### Frontend
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

### Shared Packages
- types
- validation
- config
- ui
- api-client

## Project Structure

```
cribseekers/
├── apps/
│   ├── api/          # NestJS backend API
│   ├── web/          # Next.js web application
│   └── admin/        # Next.js admin portal
├── packages/
│   ├── ui/           # Shared UI components
│   ├── types/        # Shared TypeScript types
│   ├── validation/   # Shared Zod schemas
│   ├── config/       # Shared configuration
│   └── api-client/   # Shared API client
├── database/
│   ├── prisma/
│   ├── migrations/
│   └── seed/
├── docker/
├── docs/
├── scripts/
└── .github/
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL
- Redis

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Setup database
pnpm db:push

# Run development
pnpm dev
```

### Available Scripts

- `pnpm build` - Build all packages and applications
- `pnpm dev` - Start development servers
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all packages
- `pnpm typecheck` - Type check all packages
- `pnpm test` - Run all tests
- `pnpm clean` - Clean all build artifacts

### Database Commands

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio

## Development

### API Server
- URL: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

### Web Application
- URL: http://localhost:3000

### Admin Portal
- URL: http://localhost:3002

## Documentation

See [docs/](./docs/) for detailed documentation.

## License

Copyright © 2024 CribSeekers. All rights reserved.
