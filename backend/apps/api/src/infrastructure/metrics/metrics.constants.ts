export const METRICS_PREFIX = 'cribseekers_';

export const MetricsNames = {
  // HTTP Metrics
  HTTP_REQUESTS_TOTAL: 'http_requests_total',
  HTTP_REQUEST_DURATION: 'http_request_duration_seconds',
  HTTP_REQUESTS_IN_PROGRESS: 'http_requests_in_progress',
  HTTP_RESPONSE_SIZE: 'http_response_size_bytes',
  
  // WebSocket Metrics
  WEBSOCKET_CONNECTIONS_TOTAL: 'websocket_connections_total',
  WEBSOCKET_CONNECTIONS_ACTIVE: 'websocket_connections_active',
  WEBSOCKET_MESSAGES_SENT_TOTAL: 'websocket_messages_sent_total',
  WEBSOCKET_MESSAGES_RECEIVED_TOTAL: 'websocket_messages_received_total',
  
  // Business Metrics
  PROPERTY_SEARCHES_TOTAL: 'property_searches_total',
  PROPERTY_VIEWS_TOTAL: 'property_views_total',
  RECOMMENDATION_REQUESTS_TOTAL: 'recommendation_requests_total',
  PAYMENT_REQUESTS_TOTAL: 'payment_requests_total',
  PAYMENT_SUCCESS_TOTAL: 'payment_success_total',
  PAYMENT_FAILURE_TOTAL: 'payment_failure_total',
  WALLET_TRANSACTIONS_TOTAL: 'wallet_transactions_total',
  INSPECTION_BOOKINGS_TOTAL: 'inspection_bookings_total',
  
  // Cache Metrics
  CACHE_HITS_TOTAL: 'cache_hits_total',
  CACHE_MISSES_TOTAL: 'cache_misses_total',
  CACHE_HIT_RATE: 'cache_hit_rate',
  
  // Database Metrics
  DB_QUERY_DURATION: 'db_query_duration_seconds',
  DB_CONNECTIONS_ACTIVE: 'db_connections_active',
  DB_CONNECTIONS_IDLE: 'db_connections_idle',
  
  // Queue Metrics
  QUEUE_JOBS_TOTAL: 'queue_jobs_total',
  QUEUE_JOBS_ACTIVE: 'queue_jobs_active',
  QUEUE_JOBS_COMPLETED: 'queue_jobs_completed',
  QUEUE_JOBS_FAILED: 'queue_jobs_failed',
  QUEUE_JOBS_DELAYED: 'queue_jobs_delayed',
  QUEUE_JOB_DURATION: 'queue_job_duration_seconds',
  
  // System Metrics
  SYSTEM_MEMORY_USAGE: 'system_memory_usage_bytes',
  SYSTEM_CPU_USAGE: 'system_cpu_usage_percent',
  SYSTEM_DISK_USAGE: 'system_disk_usage_percent',
} as const;

export const MetricsLabels = {
  // Common labels
  METHOD: 'method',
  ROUTE: 'route',
  STATUS: 'status',
  ERROR_TYPE: 'error_type',
  
  // Business labels
  PROPERTY_TYPE: 'property_type',
  LISTING_TYPE: 'listing_type',
  PAYMENT_METHOD: 'payment_method',
  QUEUE_NAME: 'queue_name',
  CACHE_NAMESPACE: 'cache_namespace',
} as const;
