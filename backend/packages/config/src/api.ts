import { env } from './env';

export const API_CONFIG = {
  BASE_URL: env.publicApiUrl,
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
