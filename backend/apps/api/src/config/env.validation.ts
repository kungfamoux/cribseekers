import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

class EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test' | 'staging';
  PORT: number;
  SOCKET_PORT: number;
  API_PREFIX: string;
  API_VERSION: string;
  APP_URL: string;
  CLIENT_URL: string;
  DATABASE_URL: string;
  DATABASE_POOL_SIZE?: number;
  DATABASE_POOL_TIMEOUT?: number;
  PRISMA_LOG_LEVELS?: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  CORS_ORIGIN: string;
  PAYSTACK_SECRET: string;
  PAYSTACK_PUBLIC_KEY: string;
  FLUTTERWAVE_SECRET?: string;
  FLUTTERWAVE_PUBLIC_KEY?: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_FROM: string;
  SMS_PROVIDER: string;
  SMS_API_KEY?: string;
  AWS_ACCESS_KEY?: string;
  AWS_SECRET_KEY?: string;
  AWS_BUCKET?: string;
  AWS_REGION: string;
  CLOUDINARY_URL?: string;
  OPENAI_API_KEY?: string;
  GEMINI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  GOOGLE_MAPS_KEY?: string;
  RATE_LIMIT_TTL: number;
  RATE_LIMIT_LIMIT: number;
  ENABLE_AI_RECOMMENDATIONS: boolean;
  ENABLE_GEO_SEARCH: boolean;
  ENABLE_WEBSOCKET: boolean;
  ENABLE_RATE_LIMITING: boolean;
  ENABLE_CACHING: boolean;
  ENABLE_METRICS: boolean;
  ENABLE_TRACING: boolean;
  ENABLE_SCHEDULED_JOBS: boolean;
  
  // Logging Configuration
  LOG_LEVEL?: string;
  LOG_FORMAT?: string;
  LOG_TO_FILE?: boolean;
  LOG_DIR?: string;
  
  // Metrics Configuration
  METRICS_ENABLED?: boolean;
  METRICS_PORT?: number;
  
  // Security Configuration
  ALLOWED_ORIGINS?: string;
  TRUST_PROXY?: boolean;
  MAX_BODY_SIZE?: string;
  MAX_URL_ENCODED_SIZE?: string;
  
  // BullMQ Configuration
  BULLMQ_REDIS_HOST?: string;
  BULLMQ_REDIS_PORT?: number;
  BULLMQ_REDIS_PASSWORD?: string;
  
  // Tracing Configuration
  TRACING_ENABLED?: boolean;
  TRACING_EXPORTER?: string;
  TRACING_ENDPOINT?: string;
  TRACING_SERVICE_NAME?: string;
  
  // Scheduler Configuration
  SCHEDULER_ENABLED?: boolean;
  
  // Secret Management
  SECRET_MANAGER?: string;
  AWS_SECRETS_REGION?: string;
  AWS_SECRETS_PREFIX?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return `${error.property}: ${constraints.join(', ')}`;
      })
      .join('\n');

    throw new Error(`Environment validation failed:\n${errorMessages}`);
  }

  return validatedConfig;
}
