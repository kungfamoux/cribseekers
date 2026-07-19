# CribSeekers Backend - Render Deployment Guide

## Prerequisites

- GitHub repository with the CribSeekers backend code
- Render account (free or paid tier)
- PostgreSQL database on Render
- Redis instance on Upstash
- External service accounts (Paystack, Resend, Google Maps, Cloudinary)

## Step 1: Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New" → "PostgreSQL"
3. Configure:
   - **Name**: cribseekers-db
   - **Database**: cribseekers
   - **User**: cribseekers_user
   - **Region**: Frankfurt (or nearest to your users)
   - **Plan**: Free or production tier
4. Click "Create Database"
5. Copy the **Internal Database URL** for later use

## Step 2: Create Redis Instance on Upstash

1. Go to Upstash Console
2. Click "Create Database"
3. Configure:
   - **Region**: Frankfurt (same as database)
   - **Name**: cribseekers-redis
4. Click "Create"
5. Copy the **REST API URL** and **REST API Token** for later use

## Step 3: Create Web Service on Render

1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the web service:

### Build & Deploy Settings

- **Name**: cribseekers-api
- **Region**: Frankfurt (same as database)
- **Branch**: main
- **Runtime**: Docker
- **Root Directory**: backend/apps/api

### Environment Variables

Add the following environment variables:

#### Application
```
NODE_ENV=production
PORT=3001
API_PREFIX=api/v1
API_VERSION=1.0.0
```

#### Database
```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
DATABASE_POOL_SIZE=10
DATABASE_POOL_TIMEOUT=10
DATABASE_HEALTH_TIMEOUT_MS=3000
PRISMA_LOG_LEVELS=error,warn
```

#### Redis
```
REDIS_HOST=your-redis-host.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

#### JWT
```
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
JWT_REFRESH_EXPIRES_IN=30d
```

#### CORS
```
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Rate Limiting
```
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

#### File Upload
```
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

#### Email (Resend)
```
RESEND_API_KEY=re_your_resend_api_key
SMTP_FROM=noreply@cribseekers.com
```

#### Payment (Paystack)
```
PAYSTACK_SECRET_KEY=sk_live_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_live_your_paystack_public_key
```

#### Google Maps
```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Cloudinary
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Socket.IO
```
SOCKET_PORT=3002
SOCKET_CORS_ORIGIN=https://your-frontend-domain.com
```

#### Logging
```
LOG_LEVEL=info
LOG_FORMAT=json
LOG_TO_FILE=false
LOG_DIR=./logs
```

#### Tracing
```
TRACING_ENABLED=false
TRACING_ENDPOINT=http://localhost:4318
TRACING_SERVICE_NAME=cribseekers-api
```

#### Workers
```
WORKER_CONCURRENCY=5
WORKER_MAX_JOBS_PER_QUEUE=1000
```

#### Security
```
ENCRYPTION_KEY=your-32-character-encryption-key
API_KEY_SECRET=your_api_key_secret
```

#### Feature Flags
```
ENABLE_SWAGGER=false
ENABLE_METRICS=true
ENABLE_ANALYTICS=true
ENABLE_WEBSOCKETS=true
```

### Advanced Settings

- **Health Check Path**: `/api/health`
- **Auto-Deploy**: Enabled

## Step 4: Run Prisma Migrations

After deployment, you need to run the database migrations:

1. Go to your web service on Render
2. Click "Shell" tab
3. Run the following command:
```bash
cd apps/api && npx prisma migrate deploy
```

Alternatively, add a build script to run migrations automatically:
```bash
cd apps/api && npx prisma generate && npx prisma migrate deploy
```

## Step 5: Verify Deployment

1. Check the deployment logs for any errors
2. Visit the health endpoint: `https://your-app-url.onrender.com/api/health`
3. Verify the response shows all services as healthy
4. Test API endpoints using the Swagger docs (if enabled): `https://your-app-url.onrender.com/api/docs`

## Step 6: Configure External Services

### Paystack
1. Go to Paystack Dashboard
2. Get your live API keys
3. Add them to Render environment variables

### Resend
1. Go to Resend Dashboard
2. Get your API key
3. Add it to Render environment variables

### Google Maps
1. Go to Google Cloud Console
2. Enable Maps JavaScript API
3. Get your API key
4. Add it to Render environment variables

### Cloudinary
1. Go to Cloudinary Dashboard
2. Get your cloud name, API key, and secret
3. Add them to Render environment variables

## Monitoring

### View Logs
- Go to your web service on Render
- Click "Logs" tab
- Filter by log level or search for specific errors

### Metrics
- Visit `/api/metrics` endpoint for Prometheus metrics
- Set up external monitoring (Datadog, New Relic, etc.)

### Health Checks
- Render automatically checks `/api/health` every 30s
- Configure alerts for downtime

## Troubleshooting

### Build Failures
- Check Dockerfile syntax
- Verify all dependencies are in package.json
- Ensure turbo is installed correctly

### Runtime Errors
- Check environment variables are set correctly
- Verify database connection string
- Check Redis connection settings

### Database Issues
- Run `npx prisma migrate status` to check migration status
- Run `npx prisma migrate deploy` to apply pending migrations
- Check database logs on Render

### Redis Connection Issues
- Verify Upstash Redis is running
- Check connection credentials
- Ensure firewall allows connections

## Scaling

### Horizontal Scaling
- Increase instance count in Render settings
- Use Redis for session sharing
- Configure load balancing

### Vertical Scaling
- Upgrade to higher tier instances
- Increase memory and CPU allocation
- Monitor resource usage

## Security

- Never commit `.env` files to Git
- Use Render's built-in secret management
- Enable SSL/TLS for all connections
- Regularly rotate secrets and API keys
- Enable rate limiting
- Implement proper CORS policies

## Backup

- Render automatically backs up PostgreSQL
- Configure regular backup schedules
- Test restore procedures
- Backup Redis data if needed

## Cost Optimization

- Use free tiers for development
- Monitor resource usage
- Optimize database queries
- Implement caching strategies
- Use CDN for static assets

## Support

For issues related to:
- **Render**: https://render.com/support
- **Upstash**: https://upstash.com/support
- **Prisma**: https://www.prisma.io/docs
- **NestJS**: https://docs.nestjs.com
