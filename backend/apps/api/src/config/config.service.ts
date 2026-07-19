import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';

export interface FeatureFlags {
  enableAIRecommendations: boolean;
  enableGeoSearch: boolean;
  enableWebSocket: boolean;
  enableRateLimiting: boolean;
  enableCaching: boolean;
  enableMetrics: boolean;
  enableTracing: boolean;
  enableScheduledJobs: boolean;
}

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get<T = any>(key: string): T {
    return this.configService.get<T>(key) as T;
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 3001;
  }

  get socketPort(): number {
    return this.configService.get<number>('SOCKET_PORT') || 3002;
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX') || 'api/v1';
  }

  get apiVersion(): string {
    return this.configService.get<string>('API_VERSION') || '1.0.0';
  }

  get appUrl(): string {
    return this.configService.get<string>('APP_URL') || 'http://localhost:3001';
  }

  get clientUrl(): string {
    return this.configService.get<string>('CLIENT_URL') || 'http://localhost:3000';
  }

  // Database Configuration
  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL') || '';
  }

  get databasePoolSize(): number | undefined {
    return this.getOptionalNumber('DATABASE_POOL_SIZE');
  }

  get databasePoolTimeout(): number | undefined {
    return this.getOptionalNumber('DATABASE_POOL_TIMEOUT');
  }

  get databaseHealthTimeout(): number {
    return this.getOptionalNumber('DATABASE_HEALTH_TIMEOUT_MS') || 3000;
  }

  get prismaLogLevels(): PrismaLogLevel[] {
    const raw = this.configService.get<string>('PRISMA_LOG_LEVELS');

    if (!raw) {
      return this.isDevelopment
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'];
    }

    return raw
      .split(',')
      .map((level) => level.trim())
      .filter((level): level is PrismaLogLevel =>
        ['query', 'info', 'warn', 'error'].includes(level),
      );
  }

  // Redis Configuration
  get redisHost(): string {
    return this.configService.get<string>('REDIS_HOST') || 'localhost';
  }

  get redisPort(): number {
    return this.configService.get<number>('REDIS_PORT') || 6379;
  }

  get redisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD') || '';
  }

  get redisUrl(): string {
    const password = this.redisPassword ? `:${this.redisPassword}@` : '';
    return `redis://${password}${this.redisHost}:${this.redisPort}`;
  }

  // JWT Configuration
  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  get jwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET') || '';
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN') || '7d';
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d';
  }

  // CORS Configuration
  get corsOrigin(): string {
    return this.configService.get<string>('CORS_ORIGIN') || '*';
  }

  // Payment Gateways
  get paystackSecret(): string {
    return this.configService.get<string>('PAYSTACK_SECRET') || '';
  }

  get paystackPublicKey(): string {
    return this.configService.get<string>('PAYSTACK_PUBLIC_KEY') || '';
  }

  get flutterwaveSecret(): string {
    return this.configService.get<string>('FLUTTERWAVE_SECRET') || '';
  }

  get flutterwavePublicKey(): string {
    return this.configService.get<string>('FLUTTERWAVE_PUBLIC_KEY') || '';
  }

  // Email Configuration
  get smtpHost(): string {
    return this.configService.get<string>('SMTP_HOST') || '';
  }

  get smtpPort(): number {
    return this.configService.get<number>('SMTP_PORT') || 587;
  }

  get smtpUser(): string {
    return this.configService.get<string>('SMTP_USER') || '';
  }

  get smtpPassword(): string {
    return this.configService.get<string>('SMTP_PASSWORD') || '';
  }

  get smtpFrom(): string {
    return this.configService.get<string>('SMTP_FROM') || 'noreply@cribseekers.com';
  }

  // SMS Configuration
  get smsProvider(): string {
    return this.configService.get<string>('SMS_PROVIDER') || 'twilio';
  }

  get smsApiKey(): string {
    return this.configService.get<string>('SMS_API_KEY') || '';
  }

  // Storage Configuration
  get awsAccessKey(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY') || '';
  }

  get awsSecretKey(): string {
    return this.configService.get<string>('AWS_SECRET_KEY') || '';
  }

  get awsBucket(): string {
    return this.configService.get<string>('AWS_BUCKET') || '';
  }

  get awsRegion(): string {
    return this.configService.get<string>('AWS_REGION') || 'us-east-1';
  }

  get cloudinaryUrl(): string {
    return this.configService.get<string>('CLOUDINARY_URL') || '';
  }

  // AI Services
  get openaiApiKey(): string {
    return this.configService.get<string>('OPENAI_API_KEY') || '';
  }

  get geminiApiKey(): string {
    return this.configService.get<string>('GEMINI_API_KEY') || '';
  }

  get anthropicApiKey(): string {
    return this.configService.get<string>('ANTHROPIC_API_KEY') || '';
  }

  // Maps
  get googleMapsKey(): string {
    return this.configService.get<string>('GOOGLE_MAPS_KEY') || '';
  }

  // Rate Limiting
  get rateLimitTtl(): number {
    return this.configService.get<number>('RATE_LIMIT_TTL') || 60;
  }

  get rateLimitLimit(): number {
    return this.configService.get<number>('RATE_LIMIT_LIMIT') || 100;
  }

  // Logging Configuration
  get logLevel(): string {
    return this.configService.get<string>('LOG_LEVEL') || 'info';
  }

  get logFormat(): string {
    return this.configService.get<string>('LOG_FORMAT') || (this.isProduction ? 'json' : 'pretty');
  }

  get logToFile(): boolean {
    return this.configService.get<boolean>('LOG_TO_FILE') || false;
  }

  get logDir(): string {
    return this.configService.get<string>('LOG_DIR') || './logs';
  }

  // Metrics Configuration
  get metricsEnabled(): boolean {
    return this.configService.get<boolean>('METRICS_ENABLED') ?? true;
  }

  get metricsPort(): number {
    return this.configService.get<number>('METRICS_PORT') || 9090;
  }

  // Security Configuration
  get allowedOrigins(): string {
    return this.configService.get<string>('ALLOWED_ORIGINS') || 'http://localhost:3000,http://localhost:3001';
  }

  get trustProxy(): boolean {
    return this.configService.get<boolean>('TRUST_PROXY') || false;
  }

  get maxBodySize(): string {
    return this.configService.get<string>('MAX_BODY_SIZE') || '10mb';
  }

  get maxUrlEncodedSize(): string {
    return this.configService.get<string>('MAX_URL_ENCODED_SIZE') || '10mb';
  }

  // BullMQ Configuration
  get bullmqRedisHost(): string {
    return this.configService.get<string>('BULLMQ_REDIS_HOST') || this.redisHost;
  }

  get bullmqRedisPort(): number {
    return this.configService.get<number>('BULLMQ_REDIS_PORT') || this.redisPort;
  }

  get bullmqRedisPassword(): string {
    return this.configService.get<string>('BULLMQ_REDIS_PASSWORD') || this.redisPassword;
  }

  // Tracing Configuration
  get tracingEnabled(): boolean {
    return this.configService.get<boolean>('TRACING_ENABLED') || false;
  }

  get tracingExporter(): string {
    return this.configService.get<string>('TRACING_EXPORTER') || 'jaeger';
  }

  get tracingEndpoint(): string {
    return this.configService.get<string>('TRACING_ENDPOINT') || 'http://localhost:4318';
  }

  get tracingServiceName(): string {
    return this.configService.get<string>('TRACING_SERVICE_NAME') || 'cribseekers-api';
  }

  // Scheduler Configuration
  get schedulerEnabled(): boolean {
    return this.configService.get<boolean>('SCHEDULER_ENABLED') ?? true;
  }

  // Secret Management
  get secretManager(): string {
    return this.configService.get<string>('SECRET_MANAGER') || 'env';
  }

  get awsSecretsRegion(): string {
    return this.configService.get<string>('AWS_SECRETS_REGION') || 'us-east-1';
  }

  get awsSecretsPrefix(): string {
    return this.configService.get<string>('AWS_SECRETS_PREFIX') || '/cribseekers/';
  }

  // Feature Flags
  get featureFlags(): FeatureFlags {
    return {
      enableAIRecommendations: this.configService.get<boolean>('ENABLE_AI_RECOMMENDATIONS') ?? true,
      enableGeoSearch: this.configService.get<boolean>('ENABLE_GEO_SEARCH') ?? true,
      enableWebSocket: this.configService.get<boolean>('ENABLE_WEBSOCKET') ?? true,
      enableRateLimiting: this.configService.get<boolean>('ENABLE_RATE_LIMITING') ?? true,
      enableCaching: this.configService.get<boolean>('ENABLE_CACHING') ?? true,
      enableMetrics: this.configService.get<boolean>('ENABLE_METRICS') ?? true,
      enableTracing: this.configService.get<boolean>('ENABLE_TRACING') ?? false,
      enableScheduledJobs: this.configService.get<boolean>('ENABLE_SCHEDULED_JOBS') ?? true,
    };
  }

  // Environment Helpers
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get isStaging(): boolean {
    return this.nodeEnv === 'staging';
  }

  private getOptionalNumber(key: string): number | undefined {
    const value = this.configService.get<string | number>(key);

    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
  }
}

