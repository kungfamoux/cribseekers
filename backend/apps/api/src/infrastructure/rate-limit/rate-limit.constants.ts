export const RATE_LIMIT_PREFIX = 'cribseekers:rate_limit';

export const RateLimitScopes = {
  GLOBAL: 'global',
  USER: 'user',
  IP: 'ip',
  ROUTE: 'route',
  API_KEY: 'api_key',
  WEBSOCKET: 'websocket',
  AUTH: 'auth',
  PAYMENT: 'payment',
  SEARCH: 'search',
  CHAT: 'chat',
  RECOMMENDATION: 'recommendation',
  INSPECTION: 'inspection',
} as const;

export type RateLimitScope = typeof RateLimitScopes[keyof typeof RateLimitScopes];

export const RateLimitPresets = {
  GLOBAL: { ttl: 60, limit: 1000 },
  USER: { ttl: 60, limit: 100 },
  IP: { ttl: 60, limit: 200 },
  ROUTE: { ttl: 60, limit: 50 },
  API_KEY: { ttl: 60, limit: 500 },
  WEBSOCKET: { ttl: 60, limit: 30 },
  AUTH: { ttl: 60, limit: 10 },
  PAYMENT: { ttl: 60, limit: 20 },
  SEARCH: { ttl: 60, limit: 30 },
  CHAT: { ttl: 60, limit: 50 },
  RECOMMENDATION: { ttl: 60, limit: 20 },
  INSPECTION: { ttl: 60, limit: 15 },
} as const;

export const RATE_LIMIT_METADATA = 'rate_limit';
