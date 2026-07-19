export interface RateLimitOptions {
  ttl?: number;
  limit?: number;
  scope?: string;
  keyPrefix?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
  limit: number;
}

export interface RateLimitInfo {
  key: string;
  ttl: number;
  limit: number;
  current: number;
  remaining: number;
  reset: number;
}
