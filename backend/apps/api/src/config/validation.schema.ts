export const envValidationSchema = {
  NODE_ENV: {
    enum: ['development', 'production', 'test', 'staging'],
    required: true,
  },
  PORT: {
    type: 'number',
    default: 3001,
  },
  SOCKET_PORT: {
    type: 'number',
    default: 3002,
  },
  API_PREFIX: {
    type: 'string',
    default: 'api/v1',
  },
  API_VERSION: {
    type: 'string',
    default: '1.0.0',
  },
  APP_URL: {
    type: 'string',
    required: true,
  },
  CLIENT_URL: {
    type: 'string',
    required: true,
  },
  DATABASE_URL: {
    type: 'string',
    required: true,
  },
  DATABASE_POOL_SIZE: {
    type: 'number',
    optional: true,
  },
  DATABASE_POOL_TIMEOUT: {
    type: 'number',
    optional: true,
  },
  PRISMA_LOG_LEVELS: {
    type: 'string',
    optional: true,
  },
  REDIS_HOST: {
    type: 'string',
    default: 'localhost',
  },
  REDIS_PORT: {
    type: 'number',
    default: 6379,
  },
  REDIS_PASSWORD: {
    type: 'string',
    optional: true,
  },
  JWT_SECRET: {
    type: 'string',
    required: true,
    minLength: 32,
  },
  JWT_REFRESH_SECRET: {
    type: 'string',
    required: true,
    minLength: 32,
  },
  JWT_EXPIRES_IN: {
    type: 'string',
    default: '7d',
  },
  JWT_REFRESH_EXPIRES_IN: {
    type: 'string',
    default: '30d',
  },
  CORS_ORIGIN: {
    type: 'string',
    default: '*',
  },
  PAYSTACK_SECRET: {
    type: 'string',
    required: true,
  },
  PAYSTACK_PUBLIC_KEY: {
    type: 'string',
    required: true,
  },
  FLUTTERWAVE_SECRET: {
    type: 'string',
    optional: true,
  },
  FLUTTERWAVE_PUBLIC_KEY: {
    type: 'string',
    optional: true,
  },
  SMTP_HOST: {
    type: 'string',
    required: true,
  },
  SMTP_PORT: {
    type: 'number',
    default: 587,
  },
  SMTP_USER: {
    type: 'string',
    required: true,
  },
  SMTP_PASSWORD: {
    type: 'string',
    required: true,
  },
  SMTP_FROM: {
    type: 'string',
    default: 'noreply@cribseekers.com',
  },
  SMS_PROVIDER: {
    type: 'string',
    default: 'twilio',
  },
  SMS_API_KEY: {
    type: 'string',
    optional: true,
  },
  AWS_ACCESS_KEY: {
    type: 'string',
    optional: true,
  },
  AWS_SECRET_KEY: {
    type: 'string',
    optional: true,
  },
  AWS_BUCKET: {
    type: 'string',
    optional: true,
  },
  AWS_REGION: {
    type: 'string',
    default: 'us-east-1',
  },
  CLOUDINARY_URL: {
    type: 'string',
    optional: true,
  },
  OPENAI_API_KEY: {
    type: 'string',
    optional: true,
  },
  GEMINI_API_KEY: {
    type: 'string',
    optional: true,
  },
  ANTHROPIC_API_KEY: {
    type: 'string',
    optional: true,
  },
  GOOGLE_MAPS_KEY: {
    type: 'string',
    optional: true,
  },
  RATE_LIMIT_TTL: {
    type: 'number',
    default: 60,
  },
  RATE_LIMIT_LIMIT: {
    type: 'number',
    default: 100,
  },
  ENABLE_AI_RECOMMENDATIONS: {
    type: 'boolean',
    default: true,
  },
  ENABLE_GEO_SEARCH: {
    type: 'boolean',
    default: true,
  },
  ENABLE_WEBSOCKET: {
    type: 'boolean',
    default: true,
  },
  ENABLE_RATE_LIMITING: {
    type: 'boolean',
    default: true,
  },
  ENABLE_CACHING: {
    type: 'boolean',
    default: true,
  },
  ENABLE_METRICS: {
    type: 'boolean',
    default: true,
  },
  ENABLE_TRACING: {
    type: 'boolean',
    default: false,
  },
  ENABLE_SCHEDULED_JOBS: {
    type: 'boolean',
    default: true,
  },
};
