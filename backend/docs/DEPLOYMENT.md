# CribSeekers Deployment Guide

## Overview

This guide covers deploying the CribSeekers API to production environments using Docker and Kubernetes.

## Prerequisites

- Docker 20.10+
- Kubernetes 1.25+ (for K8s deployment)
- PostgreSQL 15+
- Redis 7+
- Node.js 20+

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=optional_password

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Server
NODE_ENV=production
PORT=3001
SOCKET_PORT=3002
API_PREFIX=api
API_VERSION=1

# CORS
CORS_ORIGIN=https://cribseekers.com

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
LOG_TO_FILE=true
LOG_DIR=/app/logs

# Features
ENABLE_CACHING=true
ENABLE_RATE_LIMITING=true
ENABLE_METRICS=true
ENABLE_WEBSOCKET=true
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_GEO_SEARCH=true
ENABLE_SCHEDULED_JOBS=true
TRACING_ENABLED=false
TRACING_ENDPOINT=http://localhost:4318
TRACING_SERVICE_NAME=cribseekers-api
SCHEDULER_ENABLED=true
```

## Docker Deployment

### Build the Image

```bash
cd apps/api
docker build -t cribseekers/api:latest .
```

### Run with Docker Compose

```bash
# Production
docker-compose -f docker-compose.yml up -d

# Development
docker-compose -f docker-compose.dev.yml up -d
```

### Docker Compose Services

- **postgres**: PostgreSQL 15 database
- **redis**: Redis 7 for caching and queues
- **api**: NestJS API application

## Kubernetes Deployment

### Create Namespace

```bash
kubectl create namespace cribseekers
```

### Deploy Secrets

```bash
# Edit secrets.yaml with actual values
kubectl apply -f k8s/secrets.yaml
```

### Deploy ConfigMap

```bash
kubectl apply -f k8s/configmap.yaml
```

### Deploy Persistent Volumes

```bash
kubectl apply -f k8s/pvc.yaml
```

### Deploy Services

```bash
kubectl apply -f k8s/postgres-service.yaml
kubectl apply -f k8s/redis-service.yaml
kubectl apply -f k8s/api-service.yaml
```

### Deploy Applications

```bash
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/worker-deployment.yaml
```

### Deploy HPA

```bash
kubectl apply -f k8s/hpa.yaml
```

### Verify Deployment

```bash
kubectl get pods -n cribseekers
kubectl get services -n cribseekers
kubectl get hpa -n cribseekers
```

## Database Migrations

### Run Migrations

```bash
cd apps/api
npx prisma migrate deploy
```

### Seed Database (Optional)

```bash
npx prisma db seed
```

## Health Checks

### API Health Endpoints

- **Live**: `/health/live` - Basic liveness check
- **Ready**: `/health/ready` - Readiness check with dependencies
- **Metrics**: `/metrics` - Prometheus metrics

### Check Health

```bash
curl http://localhost:3001/health/live
curl http://localhost:3001/health/ready
curl http://localhost:3001/metrics
```

## Monitoring

### Prometheus Metrics

The application exposes Prometheus metrics at `/metrics` including:

- HTTP request metrics
- WebSocket connection metrics
- Redis operation metrics
- Database query metrics
- Queue processing metrics
- System resource metrics

### Logging

Logs are written to:
- Console (JSON format in production)
- `/app/logs` directory (daily rotating files)

Log levels: `debug`, `info`, `warn`, `error`

## Scaling

### Horizontal Pod Autoscaling

The API deployment is configured with HPA:
- **Min replicas**: 3
- **Max replicas**: 10
- **CPU target**: 70%
- **Memory target**: 80%

### Manual Scaling

```bash
kubectl scale deployment cribseekers-api --replicas=5 -n cribseekers
```

## Rollback

### Docker Compose

```bash
docker-compose down
docker-compose up -d
```

### Kubernetes

```bash
kubectl rollout undo deployment cribseekers-api -n cribseekers
```

## Troubleshooting

### Check Logs

```bash
# Docker
docker logs cribseekers-api

# Kubernetes
kubectl logs -f deployment/criseekers-api -n cribseekers
```

### Check Database Connection

```bash
kubectl exec -it postgres-0 -n cribseekers -- psql -U cribseekers -d cribseekers
```

### Check Redis Connection

```bash
kubectl exec -it redis-0 -n cribseekers -- redis-cli ping
```

### Common Issues

1. **Database connection failed**: Check DATABASE_URL and network connectivity
2. **Redis connection failed**: Verify Redis service is running and accessible
3. **High memory usage**: Check for memory leaks, consider increasing limits
4. **Slow response times**: Check database query performance, enable slow query logging

## Backup Strategy

### Database Backup

```bash
# Backup
kubectl exec postgres-0 -n cribseekers -- pg_dump -U cribseekers cribseekers > backup.sql

# Restore
kubectl exec -i postgres-0 -n cribseekers -- psql -U cribseekers cribseekers < backup.sql
```

### Redis Backup

```bash
# Backup
kubectl exec redis-0 -n cribseekers -- redis-cli SAVE

# Copy RDB file
kubectl cp cribseekers/redis-0:/data/dump.rdb ./dump.rdb
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable HTTPS/TLS in production
- [ ] Configure proper CORS origins
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Enable audit logging
- [ ] Regular security updates
- [ ] Database backups configured
- [ ] Disaster recovery plan in place
