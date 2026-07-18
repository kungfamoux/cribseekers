# CribSeekers Backend - Deployment Checklist

## Pre-Deployment

### Repository
- [ ] GitHub repository is public or accessible to Render
- [ ] Main branch is up to date
- [ ] No sensitive data in repository (no .env files, no secrets)
- [ ] Dockerfile is present and valid
- [ ] package.json has correct scripts
- [ ] .env.example is present and complete

### Dependencies
- [ ] All dependencies are in package.json
- [ ] No devDependencies in production dependencies
- [ ] Lock file (package-lock.json) is committed
- [ ] Turbo is configured correctly
- [ ] Workspace packages are properly configured

## Infrastructure Setup

### Render Account
- [ ] Render account is created
- [ ] Payment method is configured (if using paid tier)
- [ ] Team is set up (if using team features)

### Database
- [ ] PostgreSQL database created on Render
- [ ] Database URL is copied
- [ ] Database region is selected
- [ ] Database plan is selected
- [ ] Connection pooling is configured

### Redis
- [ ] Redis instance created on Upstash
- [ ] Redis host is copied
- [ ] Redis port is noted
- [ ] Redis password is copied
- [ ] Redis region matches database region

### External Services
- [ ] Paystack account created
- [ ] Paystack API keys obtained
- [ ] Resend account created
- [ ] Resend API key obtained
- [ ] Google Cloud project created
- [ ] Google Maps API key obtained
- [ ] Cloudinary account created
- [ ] Cloudinary credentials obtained

## Environment Variables

### Application
- [ ] NODE_ENV=production
- [ ] PORT=3001
- [ ] API_PREFIX=api/v1
- [ ] API_VERSION=1.0.0

### Database
- [ ] DATABASE_URL (from Render PostgreSQL)
- [ ] DATABASE_POOL_SIZE=10
- [ ] DATABASE_POOL_TIMEOUT=10
- [ ] DATABASE_HEALTH_TIMEOUT_MS=3000
- [ ] PRISMA_LOG_LEVELS=error,warn

### Redis
- [ ] REDIS_HOST (from Upstash)
- [ ] REDIS_PORT=6379
- [ ] REDIS_PASSWORD (from Upstash)

### JWT
- [ ] JWT_SECRET (minimum 32 characters)
- [ ] JWT_EXPIRES_IN=7d
- [ ] JWT_REFRESH_SECRET (minimum 32 characters)
- [ ] JWT_REFRESH_EXPIRES_IN=30d

### CORS
- [ ] CORS_ORIGIN (frontend domain)

### Rate Limiting
- [ ] RATE_LIMIT_TTL=60
- [ ] RATE_LIMIT_MAX=100

### File Upload
- [ ] MAX_FILE_SIZE=10485760
- [ ] UPLOAD_DIR=./uploads

### Email
- [ ] RESEND_API_KEY
- [ ] SMTP_FROM=noreply@cribseekers.com

### Payment
- [ ] PAYSTACK_SECRET_KEY
- [ ] PAYSTACK_PUBLIC_KEY

### Google Maps
- [ ] GOOGLE_MAPS_API_KEY

### Cloudinary
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] CLOUDINARY_UPLOAD_PRESET

### Socket.IO
- [ ] SOCKET_PORT=3002
- [ ] SOCKET_CORS_ORIGIN (frontend domain)

### Logging
- [ ] LOG_LEVEL=info
- [ ] LOG_FORMAT=json
- [ ] LOG_TO_FILE=false
- [ ] LOG_DIR=./logs

### Tracing
- [ ] TRACING_ENABLED=false
- [ ] TRACING_ENDPOINT
- [ ] TRACING_SERVICE_NAME=cribseekers-api

### Workers
- [ ] WORKER_CONCURRENCY=5
- [ ] WORKER_MAX_JOBS_PER_QUEUE=1000

### Security
- [ ] ENCRYPTION_KEY (32 characters)
- [ ] API_KEY_SECRET

### Feature Flags
- [ ] ENABLE_SWAGGER=false
- [ ] ENABLE_METRICS=true
- [ ] ENABLE_ANALYTICS=true
- [ ] ENABLE_WEBSOCKETS=true

## Render Web Service Configuration

### Basic Settings
- [ ] Name: cribseekers-api
- [ ] Region: Frankfurt (or nearest to users)
- [ ] Branch: main
- [ ] Runtime: Docker
- [ ] Root Directory: apps/api

### Build Settings
- [ ] Build Command: (empty - uses Dockerfile)
- [ ] Dockerfile path: Dockerfile
- [ ] Context: (empty - uses root)

### Advanced Settings
- [ ] Health Check Path: /api/health
- [ ] Auto-Deploy: Enabled
- [ ] Instance Type: (appropriate for workload)

## Post-Deployment

### Database Migration
- [ ] Access Render Shell
- [ ] Run: `cd apps/api && npx prisma migrate deploy`
- [ ] Verify migration success
- [ ] Check migration status

### Health Check
- [ ] Visit /api/health endpoint
- [ ] Verify all services are healthy
- [ ] Check database connection
- [ ] Check Redis connection
- [ ] Check BullMQ queues

### API Testing
- [ ] Test authentication endpoints
- [ ] Test user creation
- [ ] Test property listing
- [ ] Test file upload
- [ ] Test payment flow
- [ ] Test WebSocket connection

### Swagger (if enabled)
- [ ] Set ENABLE_SWAGGER=true
- [ ] Redeploy application
- [ ] Access /api/docs
- [ ] Test API endpoints from Swagger UI

### Monitoring
- [ ] Check deployment logs
- [ ] Set up log alerts
- [ ] Configure error tracking
- [ ] Set up uptime monitoring
- [ ] Configure metrics collection

## Security Verification

### Secrets
- [ ] No secrets in code
- [ ] No secrets in Git history
- [ ] Environment variables are secure
- [ ] API keys are rotated regularly

### Network
- [ ] SSL/TLS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Request size limits set

### Authentication
- [ ] JWT secrets are strong
- [ ] Token expiration is configured
- [ ] Refresh tokens are implemented
- [ ] Password hashing is enabled

## Performance

### Database
- [ ] Connection pooling configured
- [ ] Indexes are created
- [ ] Query optimization reviewed
- [ ] Slow query monitoring enabled

### Caching
- [ ] Redis caching is configured
- [ ] Cache invalidation strategy defined
- [ ] CDN is configured for static assets

### Workers
- [ ] BullMQ queues are running
- [ ] Worker concurrency is optimized
- [ ] Job retry logic is configured
- [ ] Dead letter queue is set up

## Backup & Recovery

### Database
- [ ] Automated backups enabled
- [ ] Backup retention policy set
- [ ] Restore procedure tested
- [ ] Point-in-time recovery configured

### Application
- [ ] Application logs are retained
- [ ] Error logs are centralized
- [ ] Critical alerts are configured
- [ ] Disaster recovery plan documented

## Documentation

### Deployment
- [ ] Deployment guide is complete
- [ ] Environment variables documented
- [ ] Runbook is available
- [ ] Onboarding guide exists

### API
- [ ] Swagger documentation is current
- [ ] API versioning is clear
- [ ] Rate limits are documented
- [ ] Error responses are documented

## Final Verification

### Functionality
- [ ] All core features work
- [ ] Third-party integrations work
- [ ] Background jobs run
- [ ] WebSockets connect
- [ ] File uploads work

### Performance
- [ ] Response times are acceptable
- [ ] Error rates are low
- [ ] Database queries are efficient
- [ ] Memory usage is stable

### Monitoring
- [ ] Health checks pass
- [ ] Metrics are collected
- [ ] Alerts are configured
- [ ] Logs are accessible

## Go-Live Decision

- [ ] All checklist items complete
- [ ] Stakeholder approval obtained
- [ ] Rollback plan documented
- [ ] Support team notified
- [ ] Monitoring dashboard ready
- [ ] Emergency contacts updated
