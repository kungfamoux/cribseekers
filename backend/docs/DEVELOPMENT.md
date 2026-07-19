# Development Guide

This guide covers development practices and workflows for CribSeekers.

## Development Workflow

### Branching Strategy

- `main` - Production branch
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

### Commit Conventions

We use conventional commits:

```
feat: add user registration
fix: resolve login authentication bug
docs: update API documentation
style: format code with prettier
refactor: simplify user service
test: add user service tests
chore: update dependencies
```

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Run tests and linting
4. Submit a PR with description
5. Request review
6. Address feedback
7. Merge to `develop`

## Local Development

### Running Specific Applications

```bash
# API only
cd apps/api && npm run dev

# Web only
cd apps/web && npm run dev

# Admin only
cd apps/admin && npm run dev
```

### Database Development

```bash
# Generate Prisma client
npm run db:generate

# Open Prisma Studio
npm run db:studio

# Create migration
cd apps/api && npx prisma migrate dev --name migration_name

# Reset database (development only)
cd apps/api && npx prisma migrate reset
```

### Testing

```bash
# Run all tests
npm test

# Run tests for specific package
cd apps/api && npm test

# Run tests in watch mode
cd apps/api && npm test --watch

# Run tests with coverage
cd apps/api && npm test --coverage
```

### Linting and Formatting

```bash
# Lint all packages
npm run lint

# Format all packages
npm run format

# Type check all packages
npm run typecheck

# Fix linting issues
npm run lint --fix
```

## Code Style

### TypeScript

- Use strict mode
- Prefer explicit types
- Avoid `any` types
- Use interfaces for object shapes
- Use types for unions/intersections

### React/Next.js

- Use functional components
- Use hooks for state and effects
- Prefer server components when possible
- Use TypeScript for props
- Follow component naming conventions

### NestJS

- Use dependency injection
- Follow SOLID principles
- Use DTOs for validation
- Implement proper error handling
- Use guards for authorization

## Adding New Features

### Backend (NestJS)

1. Create a new module:
```bash
cd apps/api
npx @nestjs/cli g module modules/feature
npx @nestjs/cli g service modules/feature
npx @nestjs/cli g controller modules/feature
```

2. Define DTOs with validation
3. Implement service logic
4. Create controller endpoints
5. Add guards and decorators as needed
6. Update Prisma schema if needed
7. Write tests

### Frontend (Next.js)

1. Create a new route in `app/`
2. Create components in `components/`
3. Add API calls using TanStack Query
4. Implement forms with React Hook Form
5. Add validation with Zod
6. Style with TailwindCSS
7. Test responsive design

### Shared Packages

**Types Package**
- Add new types to `src/index.ts`
- Export for use across monorepo

**Validation Package**
- Create Zod schemas
- Export for use across monorepo

**UI Package**
- Create new component
- Add props interface
- Implement component logic
- Export for use across monorepo

## Debugging

### API Debugging

- Use Swagger at http://localhost:3001/api/docs
- Check logs in console
- Use Prisma Studio for database inspection
- Use Redis CLI for cache inspection

### Frontend Debugging

- Use browser DevTools
- Check React DevTools
- Use Next.js built-in error overlay
- Check network tab for API calls

### Common Issues

**Module not found**
- Run `npm install`
- Check workspace configuration
- Verify package exports

**Type errors**
- Run `npm run typecheck`
- Check TypeScript configuration
- Verify shared package types

**Build failures**
- Clean build artifacts: `npm run clean`
- Check for circular dependencies
- Verify environment variables

## Performance Optimization

### Backend

- Use Redis caching for frequent queries
- Implement database indexing
- Use pagination for large datasets
- Optimize N+1 queries with Prisma includes

### Frontend

- Use Next.js Image component
- Implement code splitting
- Use dynamic imports for heavy components
- Optimize bundle size

## Deployment

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] Linting clean
- [ ] Type checking clean
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Build succeeds locally

### Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [npm Documentation](https://docs.npmjs.com/)
