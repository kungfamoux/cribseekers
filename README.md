# CribSeekers

Modern Nigerian real estate platform connecting property seekers, landlords, agencies, and verified agents.

## Technology Stack

### Monorepo
- Turborepo
- npm Workspaces

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
├── docker-compose.yml
├── docs/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL
- Redis

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Setup database
npm run db:push

# Run development
npm run dev
```

### Available Scripts

- `npm run build` - Build all packages and applications
- `npm run dev` - Start development servers
- `npm run lint` - Lint all packages
- `npm run format` - Format all packages
- `npm run typecheck` - Type check all packages
- `npm run test` - Run all tests
- `npm run clean` - Clean all build artifacts

### Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## Development

### API Server
- URL: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

### Web Application
- URL: http://localhost:3000

### Admin Portal
- URL: http://localhost:3002

## Docker

```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down
```

## Documentation

See [docs/](./docs/) for detailed documentation.

## License

Copyright © 2024 CribSeekers. All rights reserved.
