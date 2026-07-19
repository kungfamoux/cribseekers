# Installation Guide

This guide will help you set up the CribSeekers development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **PostgreSQL** >= 15 ([Download](https://www.postgresql.org/download/))
- **Redis** >= 7 ([Download](https://redis.io/download))

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/cribseekers.git
cd cribseekers
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo, including all packages and applications.

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cribseekers"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# API
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3002
```

### 4. Database Setup

Generate Prisma client and push the schema to your database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed the database
npm run db:seed
```

### 5. Start Development Servers

Start all applications in development mode:

```bash
npm run dev
```

This will start:
- API server at http://localhost:3001
- Web app at http://localhost:3000
- Admin portal at http://localhost:3002

### 6. Verify Installation

- Visit http://localhost:3001/api/docs to view API documentation
- Visit http://localhost:3000 to see the web application
- Visit http://localhost:3002 to see the admin portal

## Docker Setup (Alternative)

If you prefer using Docker, you can use the provided docker-compose file:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Troubleshooting

### Port Already in Use

If you encounter port conflicts, you can change the ports in the respective `.env` files or `docker-compose.yml`.

### Database Connection Issues

Ensure PostgreSQL is running and the connection string in `.env` is correct.

### Redis Connection Issues

Ensure Redis is running and accessible at the configured host and port.

## Next Steps

- Read the [Architecture Documentation](./ARCHITECTURE.md)
- Explore the [API Documentation](http://localhost:3001/api/docs)
- Check the [Development Guide](./DEVELOPMENT.md)
