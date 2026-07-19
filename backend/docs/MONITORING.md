# CribSeekers Monitoring Guide

## Overview

This guide covers monitoring strategies for the CribSeekers platform to ensure system health, performance, and reliability.

## Monitoring Stack

### Components

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **Loki**: Log aggregation
- **Alertmanager**: Alert routing and management
- **Jaeger/Tempo**: Distributed tracing (optional)

## Metrics Collection

### Application Metrics

The CribSeekers API exposes Prometheus metrics at `/metrics` endpoint.

#### HTTP Metrics

```promql
# HTTP request rate
rate(http_requests_total[1m])

# HTTP request duration
histogram_quantile(0.95, http_request_duration_seconds)

# HTTP error rate
rate(http_requests_total{status=~"5.."}[5m])
```

#### WebSocket Metrics

```promql
# WebSocket connections
websocket_connections_total

# WebSocket messages
rate(websocket_messages_total[1m])

# WebSocket errors
rate(websocket_errors_total[5m])
```

#### Database Metrics

```promql
# Database query duration
histogram_quantile(0.95, db_query_duration_seconds)

# Database connection pool
db_pool_connections_active
db_pool_connections_idle

# Slow queries
rate(db_slow_queries_total[5m])
```

#### Redis Metrics

```promql
# Redis operations
rate(redis_operations_total[1m])

# Redis memory
redis_memory_used_bytes

# Redis hit ratio
rate(redis_cache_hits_total[1m]) / rate(redis_cache_operations_total[1m])
```

#### Queue Metrics

```promql
# Queue length
bullmq_queue_length{queue="email"}

# Queue processing rate
rate(bullmq_jobs_processed_total[1m])

# Queue failure rate
rate(bullmq_jobs_failed_total[5m])

# Queue processing time
histogram_quantile(0.95, bullmq_job_duration_seconds)
```

### System Metrics

#### CPU Usage

```promql
# CPU utilization
rate(process_cpu_seconds_total[1m])

# CPU by container
rate(container_cpu_usage_seconds_total[1m])
```

#### Memory Usage

```promql
# Memory usage
process_resident_memory_bytes

# Memory by container
container_memory_usage_bytes

# Memory percentage
(container_memory_usage_bytes / container_spec_memory_limit_bytes) * 100
```

#### Disk Usage

```promql
# Disk I/O
rate(node_disk_io_time_seconds_total[1m])

# Disk space
node_filesystem_avail_bytes
```

#### Network Metrics

```promql
# Network traffic
rate(container_network_receive_bytes_total[1m])
rate(container_network_transmit_bytes_total[1m])
```

## Logging

### Log Structure

Logs are structured in JSON format for easy parsing:

```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "level": "info",
  "context": "AuthService",
  "message": "User logged in successfully",
  "userId": "user-123",
  "requestId": "req-456",
  "correlationId": "corr-789",
  "traceId": "trace-abc"
}
```

### Log Levels

- **debug**: Detailed diagnostic information
- **info**: General informational messages
- **warn**: Warning messages for potential issues
- **error**: Error messages for failures
- **fatal**: Critical errors requiring immediate attention

### Log Aggregation

**Loki Configuration:**
```yaml
clients:
  - url: http://loki:3100/loki/api/v1/push
```

**Log Retention:**
- Debug logs: 7 days
- Info logs: 30 days
- Warn logs: 90 days
- Error logs: 365 days

### Log Queries

**Loki Query Examples:**
```
# Search by level
{level="error"}

# Search by context
{context="AuthService"}

# Search by time range
{level="error"} | line_format "{{.message}}" | range 1h

# Search by correlation ID
{correlationId="corr-789"}
```

## Dashboards

### API Dashboard

**Key Panels:**
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Active connections
- Memory usage
- CPU usage

### Database Dashboard

**Key Panels:**
- Query performance
- Connection pool usage
- Slow queries
- Replication lag
- Disk I/O
- Table sizes

### Redis Dashboard

**Key Panels:**
- Memory usage
- Hit ratio
- Operations per second
- Connection count
- Key distribution
- Eviction rate

### Queue Dashboard

**Key Panels:**
- Queue lengths
- Processing rates
- Failure rates
- Worker utilization
- Retry counts
- Job duration

### System Dashboard

**Key Panels:**
- CPU usage by pod
- Memory usage by pod
- Network traffic
- Disk usage
- Pod restarts
- Resource limits

## Alerting

### Alert Rules

#### Critical Alerts

**High Error Rate:**
```yaml
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "High error rate detected"
    description: "Error rate is {{ $value }} errors/second"
```

**Slow Response Time:**
```yaml
- alert: SlowResponseTime
  expr: histogram_quantile(0.95, http_request_duration_seconds) > 2
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Slow response time detected"
    description: "P95 response time is {{ $value }} seconds"
```

**Database Connection Pool Exhausted:**
```yaml
- alert: DatabasePoolExhausted
  expr: db_pool_connections_active / db_pool_connections_max > 0.9
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Database connection pool nearly exhausted"
    description: "Pool usage is {{ $value }}%"
```

**Redis Memory High:**
```yaml
- alert: RedisMemoryHigh
  expr: redis_memory_used_bytes / redis_memory_max_bytes > 0.9
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Redis memory usage high"
    description: "Memory usage is {{ $value }}%"
```

#### Warning Alerts

**High CPU Usage:**
```yaml
- alert: HighCPUUsage
  expr: rate(process_cpu_seconds_total[1m]) > 0.8
  for: 10m
  labels:
    severity: warning
  annotations:
    summary: "High CPU usage detected"
    description: "CPU usage is {{ $value }}%"
```

**High Memory Usage:**
```yaml
- alert: HighMemoryUsage
  expr: process_resident_memory_bytes / process_resident_memory_max_bytes > 0.85
  for: 10m
  labels:
    severity: warning
  annotations:
    summary: "High memory usage detected"
    description: "Memory usage is {{ $value }}%"
```

**Queue Backlog:**
```yaml
- alert: QueueBacklog
  expr: bullmq_queue_length > 1000
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Queue backlog detected"
    description: "Queue {{ $labels.queue }} has {{ $value }} pending jobs"
```

#### Info Alerts

**Pod Restart:**
```yaml
- alert: PodRestart
  expr: increase(kube_pod_container_status_restarts_total[1h]) > 0
  labels:
    severity: info
  annotations:
    summary: "Pod restarted"
    description: "Pod {{ $labels.pod }} restarted {{ $value }} times"
```

### Alert Routing

**Alertmanager Configuration:**

```yaml
route:
  group_by: ['alertname', 'severity']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'default'

  routes:
  -匹配:
      severity: critical
    receiver: 'pagerduty'
  - match:
      severity: warning
    receiver: 'slack'

receivers:
- name: 'default'
  email_configs:
  - to: 'oncall@cribseekers.com'

- name: 'pagerduty'
  pagerduty_configs:
  - service_key: 'YOUR_PAGERDUTY_KEY'

- name: 'slack'
  slack_configs:
  - api_url: 'YOUR_SLACK_WEBHOOK'
    channel: '#alerts'
```

## Health Checks

### Health Endpoints

**Liveness Probe:**
```bash
GET /health/live
```
- Returns 200 if application is running
- Used by Kubernetes to restart unhealthy pods

**Readiness Probe:**
```bash
GET /health/ready
```
- Returns 200 if application is ready to accept traffic
- Checks database, Redis, and other dependencies

**Startup Probe:**
```bash
GET /health/startup
```
- Used during application startup
- Allows longer startup times

### Health Check Configuration

**Kubernetes Configuration:**
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 3001
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /health/ready
    port: 3001
  initialDelaySeconds: 10
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

## Distributed Tracing

### OpenTelemetry Setup

**Environment Variables:**
```bash
TRACING_ENABLED=true
TRACING_ENDPOINT=http://jaeger:4318
TRACING_SERVICE_NAME=cribseekers-api
```

### Trace Analysis

**Key Traces to Monitor:**
- HTTP request traces
- Database query traces
- Redis operation traces
- Queue job traces
- External API call traces

**Trace Metrics:**
- Trace duration
- Error rate
- Service dependency graph
- Hot path analysis

## Performance Monitoring

### Key Performance Indicators (KPIs)

**Application KPIs:**
- Request rate: > 1000 req/min
- Response time p95: < 200ms
- Error rate: < 1%
- Availability: > 99.9%

**Database KPIs:**
- Query time p95: < 100ms
- Connection pool usage: < 80%
- Replication lag: < 1s

**Redis KPIs:**
- Hit ratio: > 90%
- Memory usage: < 80%
- Response time: < 10ms

**Queue KPIs:**
- Processing rate: > 100 jobs/min
- Failure rate: < 1%
- Queue backlog: < 1000 jobs

### Performance Testing

**Load Testing:**
```bash
# Using k6
k6 run --vus 100 --duration 5m load-test.js
```

**Performance Benchmarking:**
- Baseline performance measurement
- Regression testing
- Capacity planning
- Bottleneck identification

## Incident Response

### Incident Severity Levels

**P1 - Critical:**
- System down or completely unavailable
- Data loss or corruption
- Security breach
- Response time: < 15 minutes

**P2 - High:**
- Major functionality broken
- Performance severely degraded
- Significant data inconsistency
- Response time: < 30 minutes

**P3 - Medium:**
- Minor functionality broken
- Performance somewhat degraded
- Non-critical data inconsistency
- Response time: < 2 hours

**P4 - Low:**
- Cosmetic issues
- Minor performance impact
- Documentation errors
- Response time: < 24 hours

### Incident Response Process

1. **Detection**: Alert triggers
2. **Acknowledgment**: On-call engineer acknowledges
3. **Investigation**: Gather metrics and logs
4. **Mitigation**: Implement temporary fix
5. **Resolution**: Implement permanent fix
6. **Post-Mortem**: Document lessons learned

### Runbook Templates

**High Error Rate:**
1. Check error logs for patterns
2. Verify database connectivity
3. Check Redis connectivity
4. Review recent deployments
5. Check external API status
6. Implement rollback if needed

**Slow Response Time:**
1. Check database query performance
2. Review slow query logs
3. Check cache hit ratios
4. Review system resources
5. Check network latency
6. Profile application code

**Database Connection Issues:**
1. Check connection pool metrics
2. Verify database server status
3. Review database logs
4. Check network connectivity
5. Increase pool size temporarily
6. Restart application if needed

## Monitoring Checklist

**Daily:**
- [ ] Review dashboard for anomalies
- [ ] Check alert history
- [ ] Review error logs
- [ ] Verify backup completion

**Weekly:**
- [ ] Review performance trends
- [ ] Analyze resource utilization
- [ ] Review capacity planning
- [ ] Update runbooks

**Monthly:**
- [ ] Review incident reports
- [ ] Update alert thresholds
- [ ] Review monitoring costs
- [ ] Plan monitoring improvements
