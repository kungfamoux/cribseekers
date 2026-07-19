# CribSeekers Redis Guide

## Overview

Redis is used throughout the CribSeekers platform for caching, session management, rate limiting, and as a message broker for BullMQ queues.

## Redis Architecture

### Primary Uses

1. **Application Caching**
   - Property search results
   - User profile data
   - Configuration data
   - API responses

2. **Session Management**
   - User sessions
   - JWT token blacklisting
   - Rate limiting counters

3. **Message Broker**
   - BullMQ job queues
   - Pub/Sub for real-time events
   - Stream processing

4. **Rate Limiting**
   - Per-IP rate limits
   - Per-user rate limits
   - API key rate limits

## Redis Configuration

### Connection Configuration

```typescript
{
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: 0,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  enableReadyCheck: true,
  maxRetriesPerRequest: 3,
  lazyConnect: false,
  keepAlive: 30000,
  connectTimeout: 10000,
  family: 4,
}
```

### Memory Configuration

**redis.conf:**
```conf
maxmemory 2gb
maxmemory-policy allkeys-lru
maxmemory-samples 5
```

## Caching Strategy

### Cache Keys

**Key Naming Convention:**
```
cache:{entity}:{id}:{field}
cache:{entity}:{id}
cache:search:{query_hash}
cache:config:{key}
```

**Examples:**
```
cache:property:123:details
cache:user:456:profile
cache:search:abc123
cache:config:feature_flags
```

### Cache TTL

**Recommended TTL Values:**
- Property listings: 5 minutes
- User profiles: 30 minutes
- Search results: 1 minute
- Configuration: 1 hour
- Session data: 24 hours
- Rate limit counters: 1 minute

### Cache Implementation

**Set Cache:**
```typescript
await redis.set(
  `cache:property:${propertyId}`,
  JSON.stringify(propertyData),
  300 // 5 minutes TTL
);
```

**Get Cache:**
```typescript
const cached = await redis.get(`cache:property:${propertyId}`);
if (cached) {
  return JSON.parse(cached);
}
```

**Delete Cache:**
```typescript
await redis.del(`cache:property:${propertyId}`);
```

**Cache Invalidation:**
```typescript
// Invalidate all property caches
const keys = await redis.keys('cache:property:*');
if (keys.length > 0) {
  await redis.del(...keys);
}
```

## Session Management

### Session Storage

**Session Key Format:**
```
session:{session_id}
```

**Session Data:**
```typescript
{
  userId: string,
  createdAt: Date,
  expiresAt: Date,
  ipAddress: string,
  userAgent: string,
}
```

**Implementation:**
```typescript
await redis.setex(
  `session:${sessionId}`,
  86400, // 24 hours
  JSON.stringify(sessionData)
);
```

### Token Blacklisting

**Blacklist Key Format:**
```
blacklist:token:{token_hash}
```

**Implementation:**
```typescript
await redis.setex(
  `blacklist:token:${tokenHash}`,
  tokenExpiry,
  '1'
);
```

## Rate Limiting

### Sliding Window Algorithm

**Implementation:**
```typescript
async function checkRateLimit(key: string, limit: number, window: number): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - window;
  
  // Remove old entries
  await redis.zremrangebyscore(key, 0, windowStart);
  
  // Count current entries
  const count = await redis.zcard(key);
  
  if (count >= limit) {
    return false;
  }
  
  // Add current request
  await redis.zadd(key, now, `${now}-${Math.random()}`);
  await redis.expire(key, window / 1000);
  
  return true;
}
```

**Usage:**
```typescript
const allowed = await checkRateLimit(
  `ratelimit:${ip}:${endpoint}`,
  100, // 100 requests
  60000 // 1 minute window
);
```

## BullMQ Queues

### Queue Configuration

**Email Queue:**
```typescript
{
  connection: { host: 'redis', port: 6379 },
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
}
```

### Queue Names

- `email-queue` - Email notifications
- `sms-queue` - SMS notifications
- `push-queue` - Push notifications
- `media-queue` - Media processing
- `video-queue` - Video processing
- `property-queue` - Property-related jobs
- `recommendation-queue` - AI recommendations
- `analytics-queue` - Analytics aggregation
- `report-queue` - Report generation
- `settlement-queue` - Payment settlements
- `payment-queue` - Payment processing
- `webhook-queue` - Webhook deliveries
- `search-queue` - Search indexing
- `inspection-queue` - Inspection jobs
- `cleanup-queue` - Cleanup tasks

### Job Processing

**Add Job:**
```typescript
await emailQueue.add('send-welcome', {
  email: user.email,
  name: user.name,
}, {
  priority: 1,
  delay: 0,
});
```

**Process Job:**
```typescript
emailQueue.process('send-welcome', async (job) => {
  const { email, name } = job.data;
  await sendEmail(email, 'Welcome', `Hello ${name}`);
});
```

## Pub/Sub

### Real-time Events

**Publish Event:**
```typescript
await redis.publish('property-updates', JSON.stringify({
  type: 'property.created',
  propertyId: property.id,
}));
```

**Subscribe to Events:**
```typescript
const subscriber = redis.duplicate();
await subscriber.subscribe('property-updates');

subscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  // Handle event
});
```

### Event Channels

- `property-updates` - Property CRUD events
- `notifications` - Notification events
- `chat-messages` - Real-time chat messages
- `inspection-updates` - Inspection status changes
- `payment-updates` - Payment status changes

## Monitoring

### Key Metrics

**Memory Usage:**
```bash
redis-cli INFO memory
```

**Connection Count:**
```bash
redis-cli INFO clients
```

**Operations Per Second:**
```bash
redis-cli INFO stats
```

**Cache Hit Ratio:**
```bash
redis-cli INFO stats | grep keyspace_hits
redis-cli INFO stats | grep keyspace_misses
```

### Slow Log

**Enable Slow Log:**
```conf
slowlog-log-slower-than 10000
slowlog-max-len 128
```

**View Slow Log:**
```bash
redis-cli SLOWLOG GET 10
```

## Performance Optimization

### Pipeline Operations

**Batch Operations:**
```typescript
const pipeline = redis.pipeline();
pipeline.set('key1', 'value1');
pipeline.set('key2', 'value2');
pipeline.get('key3');
const results = await pipeline.exec();
```

### Lua Scripting

**Atomic Operations:**
```lua
-- Increment with expiration
local current = redis.call('GET', KEYS[1])
if current == false then
  redis.call('SET', KEYS[1], ARGV[1])
  redis.call('EXPIRE', KEYS[1], ARGV[2])
  return ARGV[1]
else
  redis.call('INCR', KEYS[1])
  return redis.call('GET', KEYS[1])
end
```

### Connection Pooling

**ioredis Configuration:**
```typescript
{
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  enableOfflineQueue: true,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
}
```

## Data Structures

### Strings

**Use Cases:**
- Simple key-value storage
- Counters
- Session data

**Example:**
```typescript
await redis.set('user:123:name', 'John Doe');
await redis.incr('counter:page_views');
```

### Hashes

**Use Cases:**
- Object storage
- User profiles
- Configuration data

**Example:**
```typescript
await redis.hset('user:123', {
  name: 'John Doe',
  email: 'john@example.com',
});
const user = await redis.hgetall('user:123');
```

### Lists

**Use Cases:**
- Queues
- Recent activity
- Job processing

**Example:**
```typescript
await redis.lpush('recent:properties', propertyId);
const recent = await redis.lrange('recent:properties', 0, 9);
```

### Sets

**Use Cases:**
- Unique collections
- Tags
- User IDs

**Example:**
```typescript
await redis.sadd('property:123:tags', 'apartment', 'lagos');
const tags = await redis.smembers('property:123:tags');
```

### Sorted Sets

**Use Cases:**
- Leaderboards
- Rankings
- Time-series data

**Example:**
```typescript
await redis.zadd('property:rankings', 100, 'property-123');
const top = await redis.zrange('property:rankings', 0, 9, 'REV');
```

## Backup and Recovery

### RDB Snapshots

**Manual Snapshot:**
```bash
redis-cli SAVE
```

**Scheduled Snapshots:**
```conf
save 900 1
save 300 10
save 60 10000
```

### AOF Persistence

**Enable AOF:**
```conf
appendonly yes
appendfsync everysec
```

### Backup Script

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backups/dump_$DATE.rdb
```

## Security

### Authentication

**Set Password:**
```conf
requirepass your_strong_password
```

**Environment Variable:**
```bash
REDIS_PASSWORD=your_strong_password
```

### Network Security

**Bind to Specific Interface:**
```conf
bind 127.0.0.1 10.0.0.1
```

**Disable Dangerous Commands:**
```conf
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command CONFIG ""
```

### TLS Encryption

**Enable TLS:**
```conf
tls-port 6380
port 0
tls-cert-file /etc/redis/tls/redis.crt
tls-key-file /etc/redis/tls/redis.key
tls-ca-cert-file /etc/redis/tls/ca.crt
```

## Troubleshooting

### Common Issues

**Out of Memory:**
```bash
# Check memory usage
redis-cli INFO memory

# Check max memory policy
redis-cli CONFIG GET maxmemory-policy

# Clean up keys
redis-cli --scan --pattern 'cache:*' | xargs redis-cli DEL
```

**Connection Issues:**
```bash
# Check connection count
redis-cli CLIENT LIST

# Kill specific client
redis-cli CLIENT KILL <id>

# Check server status
redis-cli PING
```

**Slow Performance:**
```bash
# Check slow log
redis-cli SLOWLOG GET 10

# Monitor commands
redis-cli MONITOR

# Check latency
redis-cli --latency
```

### Debug Commands

**Monitor Real-time Commands:**
```bash
redis-cli MONITOR
```

**Check Key Space:**
```bash
redis-cli DBSIZE
redis-cli --scan --pattern '*'
```

**Analyze Memory Usage:**
```bash
redis-cli --bigkeys
redis-cli --memkeys
```

## Best Practices

### Key Design

- Use consistent naming conventions
- Include expiration for temporary data
- Use appropriate data structures
- Avoid key collisions

### Memory Management

- Set appropriate TTL values
- Monitor memory usage regularly
- Use maxmemory-policy
- Clean up expired keys

### Performance

- Use pipelining for batch operations
- Use Lua scripts for atomic operations
- Monitor slow queries
- Optimize data structures

### Security

- Use strong passwords
- Enable TLS in production
- Restrict network access
- Disable dangerous commands
- Regular security updates

## Redis vs. Memcached

**When to Use Redis:**
- Need data persistence
- Require complex data structures
- Need pub/sub functionality
- Require transactions
- Need sorted operations

**When to Use Memcached:**
- Simple key-value caching
- Need maximum performance
- Don't need persistence
- Single data type (strings)

## Cluster Configuration

### Redis Cluster

**Minimum Configuration:**
- 3 master nodes
- 3 slave nodes (1 per master)
- Total 6 nodes

**Slot Distribution:**
- 16384 hash slots
- Distributed across masters
- Automatic failover

**Cluster Setup:**
```bash
redis-cli --cluster create \
  10.0.0.1:6379 \
  10.0.0.2:6379 \
  10.0.0.3:6379 \
  --cluster-replicas 1
```

### Sentinel

**Sentinel Configuration:**
```conf
sentinel monitor mymaster 10.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 10000
sentinel parallel-syncs mymaster 1
```

## Monitoring Redis

### Prometheus Exporter

**Run Redis Exporter:**
```bash
docker run -d \
  --name redis_exporter \
  -p 9121:9121 \
  oliver006/redis_exporter \
  --redis.addr=redis://localhost:6379
```

**Grafana Dashboard:**
- Memory usage
- Operations per second
- Hit ratio
- Connection count
- Key count
- Slow log

## Redis CLI Cheatsheet

**Basic Commands:**
```bash
redis-cli PING                    # Check connection
redis-cli INFO                    # Server information
redis-cli DBSIZE                  # Number of keys
redis-cli FLUSHALL                # Delete all keys
redis-cli KEYS *                  # List all keys
```

**String Commands:**
```bash
redis-cli SET key value           # Set key
redis-cli GET key                 # Get key
redis-cli DEL key                 # Delete key
redis-cli EXPIRE key 3600         # Set expiration
redis-cli TTL key                 # Get TTL
```

**Hash Commands:**
```bash
redis-cli HSET key field value    # Set hash field
redis-cli HGET key field          # Get hash field
redis-cli HGETALL key             # Get all hash fields
redis-cli HDEL key field          # Delete hash field
```

**List Commands:**
```bash
redis-cli LPUSH key value         # Push to left
redis-cli RPUSH key value         # Push to right
redis-cli LPOP key                # Pop from left
redis-cli LRANGE key 0 -1         # Get all elements
```

**Set Commands:**
```bash
redis-cli SADD key member         # Add member
redis-cli SMEMBERS key            # Get all members
redis-cli SREM key member         # Remove member
redis-cli SCARD key               # Get member count
```

**Sorted Set Commands:**
```bash
redis-cli ZADD key score member   # Add member
redis-cli ZRANGE key 0 -1         # Get all members
redis-cli ZREM key member         # Remove member
redis-cli ZCARD key               # Get member count
```
