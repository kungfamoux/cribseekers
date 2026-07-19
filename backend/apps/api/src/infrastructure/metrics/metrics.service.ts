import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Gauge, Registry } from 'prom-client';
import { METRICS_PREFIX, MetricsNames, MetricsLabels } from './metrics.constants';

@Injectable()
export class MetricsService {
  private readonly register = new Registry();

  // HTTP Metrics
  private httpRequestsTotal: Counter<string>;
  private httpRequestDuration: Histogram<string>;
  private httpRequestsInProgress: Gauge<string>;
  private httpResponseSize: Histogram<string>;

  // WebSocket Metrics
  private websocketConnectionsTotal: Counter<string>;
  private websocketConnectionsActive: Gauge<string>;
  private websocketMessagesSentTotal: Counter<string>;
  private websocketMessagesReceivedTotal: Counter<string>;

  // Business Metrics
  private propertySearchesTotal: Counter<string>;
  private propertyViewsTotal: Counter<string>;
  private recommendationRequestsTotal: Counter<string>;
  private paymentRequestsTotal: Counter<string>;
  private paymentSuccessTotal: Counter<string>;
  private paymentFailureTotal: Counter<string>;
  private walletTransactionsTotal: Counter<string>;
  private inspectionBookingsTotal: Counter<string>;

  // Cache Metrics
  private cacheHitsTotal: Counter<string>;
  private cacheMissesTotal: Counter<string>;

  // Database Metrics
  private dbQueryDuration: Histogram<string>;
  private dbConnectionsActive: Gauge<string>;
  private dbConnectionsIdle: Gauge<string>;

  // Queue Metrics
  private queueJobsTotal: Counter<string>;
  private queueJobsActive: Gauge<string>;
  private queueJobsCompleted: Counter<string>;
  private queueJobsFailed: Counter<string>;
  private queueJobsDelayed: Gauge<string>;
  private queueJobDuration: Histogram<string>;

  constructor() {
    this.register.setDefaultLabels({
      app: 'cribseekers-api',
    });

    this.initializeHttpMetrics();
    this.initializeWebSocketMetrics();
    this.initializeBusinessMetrics();
    this.initializeCacheMetrics();
    this.initializeDatabaseMetrics();
    this.initializeQueueMetrics();
  }

  private initializeHttpMetrics() {
    this.httpRequestsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.HTTP_REQUESTS_TOTAL,
      help: 'Total number of HTTP requests',
      labelNames: [MetricsLabels.METHOD, MetricsLabels.ROUTE, MetricsLabels.STATUS],
      registers: [this.register],
    });

    this.httpRequestDuration = new Histogram({
      name: METRICS_PREFIX + MetricsNames.HTTP_REQUEST_DURATION,
      help: 'HTTP request duration in seconds',
      labelNames: [MetricsLabels.METHOD, MetricsLabels.ROUTE, MetricsLabels.STATUS],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      registers: [this.register],
    });

    this.httpRequestsInProgress = new Gauge({
      name: METRICS_PREFIX + MetricsNames.HTTP_REQUESTS_IN_PROGRESS,
      help: 'Number of HTTP requests in progress',
      labelNames: [MetricsLabels.METHOD, MetricsLabels.ROUTE],
      registers: [this.register],
    });

    this.httpResponseSize = new Histogram({
      name: METRICS_PREFIX + MetricsNames.HTTP_RESPONSE_SIZE,
      help: 'HTTP response size in bytes',
      labelNames: [MetricsLabels.METHOD, MetricsLabels.ROUTE],
      buckets: [100, 1000, 10000, 100000, 1000000],
      registers: [this.register],
    });
  }

  private initializeWebSocketMetrics() {
    this.websocketConnectionsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.WEBSOCKET_CONNECTIONS_TOTAL,
      help: 'Total number of WebSocket connections',
      registers: [this.register],
    });

    this.websocketConnectionsActive = new Gauge({
      name: METRICS_PREFIX + MetricsNames.WEBSOCKET_CONNECTIONS_ACTIVE,
      help: 'Number of active WebSocket connections',
      registers: [this.register],
    });

    this.websocketMessagesSentTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.WEBSOCKET_MESSAGES_SENT_TOTAL,
      help: 'Total number of WebSocket messages sent',
      registers: [this.register],
    });

    this.websocketMessagesReceivedTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.WEBSOCKET_MESSAGES_RECEIVED_TOTAL,
      help: 'Total number of WebSocket messages received',
      registers: [this.register],
    });
  }

  private initializeBusinessMetrics() {
    this.propertySearchesTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.PROPERTY_SEARCHES_TOTAL,
      help: 'Total number of property searches',
      labelNames: [MetricsLabels.PROPERTY_TYPE, MetricsLabels.LISTING_TYPE],
      registers: [this.register],
    });

    this.propertyViewsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.PROPERTY_VIEWS_TOTAL,
      help: 'Total number of property views',
      registers: [this.register],
    });

    this.recommendationRequestsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.RECOMMENDATION_REQUESTS_TOTAL,
      help: 'Total number of recommendation requests',
      registers: [this.register],
    });

    this.paymentRequestsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.PAYMENT_REQUESTS_TOTAL,
      help: 'Total number of payment requests',
      labelNames: [MetricsLabels.PAYMENT_METHOD],
      registers: [this.register],
    });

    this.paymentSuccessTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.PAYMENT_SUCCESS_TOTAL,
      help: 'Total number of successful payments',
      labelNames: [MetricsLabels.PAYMENT_METHOD],
      registers: [this.register],
    });

    this.paymentFailureTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.PAYMENT_FAILURE_TOTAL,
      help: 'Total number of failed payments',
      labelNames: [MetricsLabels.PAYMENT_METHOD, MetricsLabels.ERROR_TYPE],
      registers: [this.register],
    });

    this.walletTransactionsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.WALLET_TRANSACTIONS_TOTAL,
      help: 'Total number of wallet transactions',
      registers: [this.register],
    });

    this.inspectionBookingsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.INSPECTION_BOOKINGS_TOTAL,
      help: 'Total number of inspection bookings',
      registers: [this.register],
    });
  }

  private initializeCacheMetrics() {
    this.cacheHitsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.CACHE_HITS_TOTAL,
      help: 'Total number of cache hits',
      labelNames: [MetricsLabels.CACHE_NAMESPACE],
      registers: [this.register],
    });

    this.cacheMissesTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.CACHE_MISSES_TOTAL,
      help: 'Total number of cache misses',
      labelNames: [MetricsLabels.CACHE_NAMESPACE],
      registers: [this.register],
    });
  }

  private initializeDatabaseMetrics() {
    this.dbQueryDuration = new Histogram({
      name: METRICS_PREFIX + MetricsNames.DB_QUERY_DURATION,
      help: 'Database query duration in seconds',
      labelNames: [MetricsLabels.ROUTE],
      buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
      registers: [this.register],
    });

    this.dbConnectionsActive = new Gauge({
      name: METRICS_PREFIX + MetricsNames.DB_CONNECTIONS_ACTIVE,
      help: 'Number of active database connections',
      registers: [this.register],
    });

    this.dbConnectionsIdle = new Gauge({
      name: METRICS_PREFIX + MetricsNames.DB_CONNECTIONS_IDLE,
      help: 'Number of idle database connections',
      registers: [this.register],
    });
  }

  private initializeQueueMetrics() {
    this.queueJobsTotal = new Counter({
      name: METRICS_PREFIX + MetricsNames.QUEUE_JOBS_TOTAL,
      help: 'Total number of queue jobs',
      labelNames: [MetricsLabels.QUEUE_NAME],
      registers: [this.register],
    });

    this.queueJobsActive = new Gauge({
      name: METRICS_PREFIX + MetricsNames.QUEUE_JOBS_ACTIVE,
      help: 'Number of active queue jobs',
      labelNames: [MetricsLabels.QUEUE_NAME],
      registers: [this.register],
    });

    this.queueJobsCompleted = new Counter({
      name: METRICS_PREFIX + MetricsNames.QUEUE_JOBS_COMPLETED,
      help: 'Total number of completed queue jobs',
      labelNames: [MetricsLabels.QUEUE_NAME],
      registers: [this.register],
    });

    this.queueJobsFailed = new Counter({
      name: METRICS_PREFIX + MetricsNames.QUEUE_JOBS_FAILED,
      help: 'Total number of failed queue jobs',
      labelNames: [MetricsLabels.QUEUE_NAME, MetricsLabels.ERROR_TYPE],
      registers: [this.register],
    });

    this.queueJobsDelayed = new Gauge({
      name: METRICS_PREFIX + MetricsNames.QUEUE_JOBS_DELAYED,
      help: 'Number of delayed queue jobs',
      labelNames: [MetricsLabels.QUEUE_NAME],
      registers: [this.register],
    });

    this.queueJobDuration = new Histogram({
      name: METRICS_PREFIX + MetricsNames.QUEUE_JOB_DURATION,
      help: 'Queue job duration in seconds',
      labelNames: [MetricsLabels.QUEUE_NAME],
      buckets: [0.1, 0.5, 1, 5, 10, 30, 60, 300],
      registers: [this.register],
    });
  }

  // HTTP Metrics Methods
  incrementHttpRequests(method: string, route: string, status: number): void {
    this.httpRequestsTotal.inc({ method, route, status: status.toString() });
  }

  observeHttpRequestDuration(method: string, route: string, status: number, duration: number): void {
    this.httpRequestDuration.observe({ method, route, status: status.toString() }, duration);
  }

  incrementHttpRequestsInProgress(method: string, route: string): void {
    this.httpRequestsInProgress.inc({ method, route });
  }

  decrementHttpRequestsInProgress(method: string, route: string): void {
    this.httpRequestsInProgress.dec({ method, route });
  }

  observeHttpResponseSize(method: string, route: string, size: number): void {
    this.httpResponseSize.observe({ method, route }, size);
  }

  // WebSocket Metrics Methods
  incrementWebSocketConnections(): void {
    this.websocketConnectionsTotal.inc();
  }

  incrementWebSocketConnectionsActive(): void {
    this.websocketConnectionsActive.inc();
  }

  decrementWebSocketConnectionsActive(): void {
    this.websocketConnectionsActive.dec();
  }

  incrementWebSocketMessagesSent(): void {
    this.websocketMessagesSentTotal.inc();
  }

  incrementWebSocketMessagesReceived(): void {
    this.websocketMessagesReceivedTotal.inc();
  }

  // Business Metrics Methods
  incrementPropertySearches(propertyType?: string, listingType?: string): void {
    this.propertySearchesTotal.inc({ property_type: propertyType || 'unknown', listing_type: listingType || 'unknown' });
  }

  incrementPropertyViews(): void {
    this.propertyViewsTotal.inc();
  }

  incrementRecommendationRequests(): void {
    this.recommendationRequestsTotal.inc();
  }

  incrementPaymentRequests(paymentMethod?: string): void {
    this.paymentRequestsTotal.inc({ payment_method: paymentMethod || 'unknown' });
  }

  incrementPaymentSuccess(paymentMethod?: string): void {
    this.paymentSuccessTotal.inc({ payment_method: paymentMethod || 'unknown' });
  }

  incrementPaymentFailure(paymentMethod?: string, errorType?: string): void {
    this.paymentFailureTotal.inc({ payment_method: paymentMethod || 'unknown', error_type: errorType || 'unknown' });
  }

  incrementWalletTransactions(): void {
    this.walletTransactionsTotal.inc();
  }

  incrementInspectionBookings(): void {
    this.inspectionBookingsTotal.inc();
  }

  // Cache Metrics Methods
  incrementCacheHits(namespace: string): void {
    this.cacheHitsTotal.inc({ cache_namespace: namespace });
  }

  incrementCacheMisses(namespace: string): void {
    this.cacheMissesTotal.inc({ cache_namespace: namespace });
  }

  // Database Metrics Methods
  observeDbQueryDuration(route: string, duration: number): void {
    this.dbQueryDuration.observe({ route }, duration);
  }

  setDbConnectionsActive(count: number): void {
    this.dbConnectionsActive.set(count);
  }

  setDbConnectionsIdle(count: number): void {
    this.dbConnectionsIdle.set(count);
  }

  // Queue Metrics Methods
  incrementQueueJobs(queueName: string): void {
    this.queueJobsTotal.inc({ queue_name: queueName });
  }

  setQueueJobsActive(queueName: string, count: number): void {
    this.queueJobsActive.set({ queue_name: queueName }, count);
  }

  incrementQueueJobsCompleted(queueName: string): void {
    this.queueJobsCompleted.inc({ queue_name: queueName });
  }

  incrementQueueJobsFailed(queueName: string, errorType?: string): void {
    this.queueJobsFailed.inc({ queue_name: queueName, error_type: errorType || 'unknown' });
  }

  setQueueJobsDelayed(queueName: string, count: number): void {
    this.queueJobsDelayed.set({ queue_name: queueName }, count);
  }

  observeQueueJobDuration(queueName: string, duration: number): void {
    this.queueJobDuration.observe({ queue_name: queueName }, duration);
  }

  // Get metrics for Prometheus
  async getMetrics(): Promise<string> {
    return this.register.metrics();
  }

  // Reset all metrics (useful for testing)
  resetMetrics(): void {
    this.register.resetMetrics();
  }
}
