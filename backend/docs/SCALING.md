# CribSeekers Scaling Guide

## Overview

This guide covers scaling strategies for the CribSeekers platform to handle increased load and ensure high availability.

## Architecture Overview

The platform uses a microservices architecture with the following components:

- **API Server**: NestJS REST API with WebSocket support
- **Worker Processes**: BullMQ job processors for background tasks
- **PostgreSQL**: Primary database with connection pooling
- **Redis**: Caching layer and message broker
- **Storage**: File storage service integration

## Scaling Strategies

### 1. Horizontal Scaling

#### API Server Scaling

The API server can be horizontally scaled using:

**Kubernetes HPA Configuration:**
```yaml
minReplicas: 3
maxReplicas: 10
targetCPUUtilization: 70%
targetMemoryUtilization: 80%
```

**Manual Scaling:**
```bash
kubectl scale deployment cribseekers-api --replicas=10 -n cribseekers
```

**Considerations:**
- Each instance requires its own database connection pool
- Redis connection pooling is essential
- Session state should be stored in Redis, not memory
- Load balancer must support WebSocket connections

#### Worker Scaling

Background job workers can be scaled independently:

```bash
kubectl scale deployment cribseekers-worker --replicas=5 -n cribseekers
```

**Queue-Specific Scaling:**
- Email/SMS workers: 2-3 instances
- Media processing workers: 4-6 instances (CPU intensive)
- Notification workers: 2-3 instances
- Analytics workers: 1-2 instances

### 2. Vertical Scaling

#### Database Scaling

**Connection Pooling:**
```typescript
connection_pool {
  max_connections = 100
  min_connections = 10
  connection_timeout = 30s
}
```

**Read Replicas:**
- Configure PostgreSQL read replicas for read-heavy operations
- Use Prisma read replica configuration
- Implement read/write splitting in application logic

**Database Optimization:**
- Index optimization for frequent queries
- Query result caching in Redis
- Materialized views for complex aggregations
- Partitioning for large tables (properties, users)

#### Redis Scaling

**Redis Cluster:**
- Use Redis Cluster for horizontal scaling
- Shard data across multiple nodes
- Configure proper slot allocation

**Redis Sentinel:**
- High availability with automatic failover
- Master-slave replication
- Automatic failover detection

**Memory Optimization:**
- Set appropriate TTL for cached data
- Use Redis data structures efficiently
- Monitor memory usage and eviction policies

### 3. Caching Strategy

#### Multi-Level Caching

**Level 1: Application Memory**
- In-memory cache for frequently accessed data
- LRU eviction policy
- Short TTL (30-60 seconds)

**Level 2: Redis**
- Distributed cache for shared data
- Longer TTL (5-30 minutes)
- Cache invalidation on data changes

**Level 3: CDN**
- Static assets (images, videos)
- API responses for public endpoints
- Edge caching for geographically distributed users

#### Cache Invalidation

**Time-Based:**
- Property listings: 5 minutes
- User profiles: 30 minutes
- Search results: 1 minute
- Configuration: 1 hour

**Event-Based:**
- Invalidate on data updates
- Publish cache invalidation events
- Use Redis pub/sub for coordination

### 4. Database Optimization

#### Query Optimization

**Index Strategy:**
```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_properties_status_price ON properties(status, price);
CREATE INDEX idx_properties_location_type ON properties(location_id, listing_type);

-- Partial indexes for filtered queries
CREATE INDEX idx_published_properties ON properties(id) WHERE status = 'PUBLISHED';
```

**Query Patterns:**
- Use cursor-based pagination for large datasets
- Implement query result caching
- Avoid N+1 queries with proper includes
- Use database views for complex joins

#### Connection Management

**Connection Pool Settings:**
```typescript
datasource db {
  url = env("DATABASE_URL")
  connection_limit = 100
  pool_timeout = 30
}
```

**Connection Pooling Best Practices:**
- Set appropriate pool size based on expected load
- Use connection timeouts to prevent hanging
- Monitor connection pool metrics
- Implement connection health checks

### 5. Queue Management

#### BullMQ Configuration

**Queue Priorities:**
- High priority: Payment processing, critical notifications
- Medium priority: Email, SMS, push notifications
- Low priority: Analytics, reports, cleanup tasks

**Concurrency Control:**
```typescript
queue.process('job-name', concurrency: 5, async (job) => {
  // Process job
});
```

**Retry Strategy:**
```typescript
{
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000,
  },
  removeOnComplete: 100,
  removeOnFail: 50,
}
```

#### Queue Monitoring

**Key Metrics:**
- Queue length (waiting jobs)
- Processing rate (jobs/second)
- Failure rate (failed jobs)
- Average processing time
- Worker utilization

**Alerting:**
- Queue length > 1000 jobs
- Failure rate > 5%
- Processing time > 30 seconds
- Worker not processing jobs

### 6. Load Balancing

#### API Load Balancing

**Nginx Configuration:**
```nginx
upstream api_servers {
  least_conn;
  server api1:3001;
  server api2:3001;
  server api3:3001;
}
```

**Session Affinity:**
- Use sticky sessions for WebSocket connections
- Store session state in Redis
- Implement session token validation

#### WebSocket Load Balancing

**WebSocket-Specific Load Balancer:**
- Support for WebSocket upgrade headers
- Connection persistence
- Health checks for WebSocket connections

### 7. Monitoring and Alerting

#### Key Metrics

**Application Metrics:**
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Active connections
- Memory usage
- CPU usage

**Database Metrics:**
- Query performance
- Connection pool usage
- Disk I/O
- Replication lag

**Redis Metrics:**
- Memory usage
- Hit ratio
- Connection count
- Operations per second

**Queue Metrics:**
- Queue length
- Processing rate
- Failure rate
- Worker utilization

#### Alerting Rules

**Critical Alerts:**
- Error rate > 5% for 5 minutes
- Response time p95 > 2 seconds
- Database connection pool exhausted
- Redis memory > 90%
- Queue length > 5000

**Warning Alerts:**
- CPU usage > 80% for 10 minutes
- Memory usage > 85% for 10 minutes
- Disk usage > 80%
- Slow query rate increased

### 8. Disaster Recovery

#### Backup Strategy

**Database Backups:**
- Daily full backups
- Hourly incremental backups
- Point-in-time recovery capability
- Cross-region backup replication

**Redis Backups:**
- RDB snapshots every hour
- AOF persistence for durability
- Backup replication to secondary region

#### High Availability

**Database HA:**
- PostgreSQL streaming replication
- Automatic failover with Patroni
- Multi-region deployment

**Redis HA:**
- Redis Sentinel for automatic failover
- Multi-master replication with Redis Cluster
- Cross-region replication

**Application HA:**
- Multi-zone deployment
- Health checks with automatic restart
- Graceful shutdown handling

### 9. Performance Testing

#### Load Testing

**Tools:**
- k6 for HTTP load testing
- Artillery for WebSocket testing
- Custom scripts for queue testing

**Test Scenarios:**
- Normal load: 1000 req/min
- Peak load: 5000 req/min
- Stress test: 10000 req/min
- Sustained load: 2000 req/min for 1 hour

#### Performance Benchmarks

**Target Performance:**
- API response time: < 200ms (p95)
- WebSocket latency: < 100ms
- Database query time: < 100ms (p95)
- Redis operation time: < 10ms (p95)
- Queue processing time: < 5 seconds

### 10. Scaling Checklist

**Before Scaling:**
- [ ] Monitor current resource utilization
- [ ] Identify bottlenecks
- [ ] Review database query performance
- [ ] Check cache hit ratios
- [ ] Verify queue processing rates
- [ ] Test scaling in staging environment

**During Scaling:**
- [ ] Monitor health checks
- [ ] Watch error rates
- [ ] Track response times
- [ ] Monitor database connections
- [ ] Check Redis memory usage
- [ ] Verify queue processing

**After Scaling:**
- [ ] Update monitoring thresholds
- [ ] Review cost implications
- [ ] Update documentation
- [ ] Train operations team
- [ ] Document lessons learned
