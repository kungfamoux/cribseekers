import { Injectable, Logger } from '@nestjs/common';
import { RateLimitOptions, RateLimitResult, RateLimitInfo } from './interfaces/rate-limit.interface';
import { RATE_LIMIT_PREFIX, RateLimitScopes, RateLimitPresets } from './rate-limit.constants';

@Injectable()
export class RateLimitService {
  private readonly logger = new Logger(RateLimitService.name);
  private rateLimits = new Map<string, { count: number; resetTime: number }>();

  async checkRateLimit(
    identifier: string,
    scope: string = RateLimitScopes.GLOBAL,
    options?: RateLimitOptions,
  ): Promise<RateLimitResult> {
    const preset = RateLimitPresets[scope as keyof typeof RateLimitPresets] || RateLimitPresets.GLOBAL;
    const ttl = options?.ttl || preset.ttl;
    const limit = options?.limit || preset.limit;

    const key = this.buildKey(identifier, scope, options?.keyPrefix);

    try {
      const now = Date.now();
      const existing = this.rateLimits.get(key);
      
      // Reset if expired
      if (existing && now > existing.resetTime) {
        this.rateLimits.delete(key);
      }

      const current = existing ? existing.count + 1 : 1;
      const reset = now + (ttl * 1000);
      
      this.rateLimits.set(key, { count: current, resetTime: reset });

      const remaining = Math.max(0, limit - current);
      const allowed = current <= limit;

      if (!allowed) {
        this.logger.warn(`Rate limit exceeded for ${key}: ${current}/${limit}`);
      }

      return {
        allowed,
        remaining,
        reset: Math.floor(reset / 1000),
        limit,
      };
    } catch (error) {
      this.logger.error(`Rate limit check error for ${key}:`, error);
      // Fail open - allow request if error occurs
      return {
        allowed: true,
        remaining: limit,
        reset: Math.floor(Date.now() / 1000) + ttl,
        limit,
      };
    }
  }

  async getRateLimitInfo(
    identifier: string,
    scope: string = RateLimitScopes.GLOBAL,
    options?: RateLimitOptions,
  ): Promise<RateLimitInfo> {
    const preset = RateLimitPresets[scope as keyof typeof RateLimitPresets] || RateLimitPresets.GLOBAL;
    const ttl = options?.ttl || preset.ttl;
    const limit = options?.limit || preset.limit;

    const key = this.buildKey(identifier, scope, options?.keyPrefix);

    try {
      const now = Date.now();
      const existing = this.rateLimits.get(key);
      
      // Reset if expired
      if (existing && now > existing.resetTime) {
        this.rateLimits.delete(key);
      }

      const current = existing ? existing.count : 0;
      const remaining = Math.max(0, limit - current);
      const reset = existing ? Math.floor(existing.resetTime / 1000) : Math.floor(now / 1000) + ttl;

      return {
        key,
        ttl,
        limit,
        current,
        remaining,
        reset,
      };
    } catch (error) {
      this.logger.error(`Rate limit info error for ${key}:`, error);
      return {
        key,
        ttl,
        limit,
        current: 0,
        remaining: limit,
        reset: Math.floor(Date.now() / 1000) + ttl,
      };
    }
  }

  async resetRateLimit(
    identifier: string,
    scope: string = RateLimitScopes.GLOBAL,
    options?: RateLimitOptions,
  ): Promise<void> {
    const key = this.buildKey(identifier, scope, options?.keyPrefix);
    this.rateLimits.delete(key);
    this.logger.debug(`Rate limit reset for ${key}`);
  }

  async resetRateLimitByScope(scope: string): Promise<void> {
    try {
      const pattern = `${RATE_LIMIT_PREFIX}:${scope}:*`;
      for (const key of this.rateLimits.keys()) {
        if (key.startsWith(pattern.replace('*', ''))) {
          this.rateLimits.delete(key);
        }
      }
      this.logger.debug(`Reset rate limit keys for scope ${scope}`);
    } catch (error) {
      this.logger.error(`Rate limit reset by scope error for ${scope}:`, error);
    }
  }

  async resetAllRateLimits(): Promise<void> {
    this.rateLimits.clear();
    this.logger.debug('Reset all rate limit keys');
  }

  private buildKey(identifier: string, scope: string, keyPrefix?: string): string {
    const prefix = keyPrefix || RATE_LIMIT_PREFIX;
    return `${prefix}:${scope}:${identifier}`;
  }

  async getStats(): Promise<any> {
    try {
      const stats = {
        totalKeys: this.rateLimits.size,
        scopes: {} as Record<string, number>,
      };

      for (const key of this.rateLimits.keys()) {
        const parts = key.split(':');
        if (parts.length >= 3) {
          const scope = parts[2];
          stats.scopes[scope] = (stats.scopes[scope] || 0) + 1;
        }
      }

      return stats;
    } catch (error) {
      this.logger.error('Rate limit stats error:', error);
      return { totalKeys: 0, scopes: {} };
    }
  }
}
