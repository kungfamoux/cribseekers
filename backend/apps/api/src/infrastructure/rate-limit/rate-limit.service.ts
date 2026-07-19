import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../database/redis.service';
import { RateLimitOptions, RateLimitResult, RateLimitInfo } from './interfaces/rate-limit.interface';
import { RATE_LIMIT_PREFIX, RateLimitScopes, RateLimitPresets } from './rate-limit.constants';

@Injectable()
export class RateLimitService {
  private readonly logger = new Logger(RateLimitService.name);

  constructor(private readonly redisService: RedisService) {}

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
      const current = await this.redisService.incr(key);

      if (current === 1) {
        await this.redisService.expire(key, ttl);
      }

      const remaining = Math.max(0, limit - current);
      const allowed = current <= limit;
      const reset = Math.floor(Date.now() / 1000) + ttl;

      if (!allowed) {
        this.logger.warn(`Rate limit exceeded for ${key}: ${current}/${limit}`);
      }

      return {
        allowed,
        remaining,
        reset,
        limit,
      };
    } catch (error) {
      this.logger.error(`Rate limit check error for ${key}:`, error);
      // Fail open - allow request if Redis is down
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
      const current = await this.redisService.get(key);
      const currentNum = current ? parseInt(current, 10) : 0;
      const remaining = Math.max(0, limit - currentNum);
      const redisTtl = await this.redisService.ttl(key);
      const reset = redisTtl > 0 ? Math.floor(Date.now() / 1000) + redisTtl : Math.floor(Date.now() / 1000) + ttl;

      return {
        key,
        ttl,
        limit,
        current: currentNum,
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

    try {
      await this.redisService.del(key);
      this.logger.debug(`Rate limit reset for ${key}`);
    } catch (error) {
      this.logger.error(`Rate limit reset error for ${key}:`, error);
    }
  }

  async resetRateLimitByScope(scope: string): Promise<void> {
    try {
      const pattern = `${RATE_LIMIT_PREFIX}:${scope}:*`;
      const keys = await this.redisService.keys(pattern);

      if (keys.length > 0) {
        await this.redisService.getClient().del(...keys);
        this.logger.debug(`Reset ${keys.length} rate limit keys for scope ${scope}`);
      }
    } catch (error) {
      this.logger.error(`Rate limit reset by scope error for ${scope}:`, error);
    }
  }

  async resetAllRateLimits(): Promise<void> {
    try {
      const pattern = `${RATE_LIMIT_PREFIX}:*`;
      const keys = await this.redisService.keys(pattern);

      if (keys.length > 0) {
        await this.redisService.getClient().del(...keys);
        this.logger.debug(`Reset all ${keys.length} rate limit keys`);
      }
    } catch (error) {
      this.logger.error('Reset all rate limits error:', error);
    }
  }

  private buildKey(identifier: string, scope: string, keyPrefix?: string): string {
    const prefix = keyPrefix || RATE_LIMIT_PREFIX;
    return `${prefix}:${scope}:${identifier}`;
  }

  async getStats(): Promise<any> {
    try {
      const pattern = `${RATE_LIMIT_PREFIX}:*`;
      const keys = await this.redisService.keys(pattern);

      const stats = {
        totalKeys: keys.length,
        scopes: {} as Record<string, number>,
      };

      for (const key of keys) {
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
