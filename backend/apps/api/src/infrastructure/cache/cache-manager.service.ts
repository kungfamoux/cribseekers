import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../database/redis.service';
import { CacheNamespaces, CACHE_PREFIX, CACHE_DEFAULT_TTL, CACHE_NAMESPACE_SEPARATOR, CacheNamespace } from './cache.constants';
import { CacheOptions, CacheStats } from './interfaces/cache-manager.interface';
import * as crypto from 'crypto';

@Injectable()
export class CacheManagerService {
  private readonly logger = new Logger(CacheManagerService.name);
  private stats = {
    hits: 0,
    misses: 0,
  };

  constructor(private readonly redisService: RedisService) {}

  async get<T>(key: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<T | null> {
    const fullKey = this.buildKey(key, namespace);
    
    try {
      const value = await this.redisService.get(fullKey);
      
      if (value) {
        this.stats.hits++;
        const parsed = JSON.parse(value);
        
        if (parsed.expiresAt && new Date(parsed.expiresAt) < new Date()) {
          await this.del(key, namespace);
          return null;
        }
        
        return parsed.data as T;
      }
      
      this.stats.misses++;
      return null;
    } catch (error) {
      this.logger.error(`Cache get error for key ${fullKey}:`, error);
      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    options: CacheOptions = {},
    namespace: CacheNamespace = CacheNamespaces.PROPERTY,
  ): Promise<void> {
    const fullKey = this.buildKey(key, namespace);
    const ttl = options.ttl || CACHE_DEFAULT_TTL;
    
    try {
      const cacheValue = {
        data: value,
        cachedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + ttl * 1000).toISOString(),
        tags: options.tags || [],
      };

      const serialized = JSON.stringify(cacheValue);
      
      if (options.compress) {
        // Compression could be added here with zlib
      }
      
      await this.redisService.set(fullKey, serialized, ttl);
      
      if (options.tags && options.tags.length > 0) {
        await this.addToTags(fullKey, options.tags);
      }
    } catch (error) {
      this.logger.error(`Cache set error for key ${fullKey}:`, error);
    }
  }

  async del(key: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<void> {
    const fullKey = this.buildKey(key, namespace);
    
    try {
      await this.redisService.del(fullKey);
    } catch (error) {
      this.logger.error(`Cache delete error for key ${fullKey}:`, error);
    }
  }

  async delPattern(pattern: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<void> {
    const fullPattern = this.buildKey(pattern, namespace);
    
    try {
      const keys = await this.redisService.keys(fullPattern);
      
      if (keys.length > 0) {
        await this.redisService.getClient().del(...keys);
      }
    } catch (error) {
      this.logger.error(`Cache delete pattern error for ${fullPattern}:`, error);
    }
  }

  async invalidateByTag(tag: string): Promise<void> {
    try {
      const tagKey = this.buildTagKey(tag);
      const keys = await this.redisService.keys(tagKey);
      
      for (const key of keys) {
        const cachedKeys = await this.redisService.get(key);
        if (cachedKeys) {
          const keyList = JSON.parse(cachedKeys);
          await this.redisService.getClient().del(...keyList);
        }
        await this.redisService.del(key);
      }
    } catch (error) {
      this.logger.error(`Cache invalidate by tag error for tag ${tag}:`, error);
    }
  }

  async invalidateNamespace(namespace: CacheNamespace): Promise<void> {
    await this.delPattern('*', namespace);
  }

  async exists(key: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<boolean> {
    const fullKey = this.buildKey(key, namespace);
    return this.redisService.exists(fullKey);
  }

  async getStats(): Promise<CacheStats> {
    const client = this.redisService.getClient();
    const keyspace = await client.info('keyspace');
    
    const totalKeys = this.parseKeyspace(keyspace);
    const hitRate = this.stats.hits + this.stats.misses > 0 
      ? (this.stats.hits / (this.stats.hits + this.stats.misses)) * 100 
      : 0;

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate,
      keys: totalKeys,
      memoryUsage: 0, // Could be parsed from INFO memory
    };
  }

  async resetStats(): Promise<void> {
    this.stats = { hits: 0, misses: 0 };
  }

  async flushNamespace(namespace: CacheNamespace): Promise<void> {
    await this.invalidateNamespace(namespace);
  }

  async flushAll(): Promise<void> {
    try {
      await this.redisService.flushdb();
      this.stats = { hits: 0, misses: 0 };
    } catch (error) {
      this.logger.error('Cache flush all error:', error);
    }
  }

  private buildKey(key: string, namespace: CacheNamespace): string {
    return `${CACHE_PREFIX}${CACHE_NAMESPACE_SEPARATOR}${namespace}${CACHE_NAMESPACE_SEPARATOR}${key}`;
  }

  private buildTagKey(tag: string): string {
    return `${CACHE_PREFIX}${CACHE_NAMESPACE_SEPARATOR}tag${CACHE_NAMESPACE_SEPARATOR}${tag}`;
  }

  private async addToTags(key: string, tags: string[]): Promise<void> {
    for (const tag of tags) {
      const tagKey = this.buildTagKey(tag);
      const existing = await this.redisService.get(tagKey);
      const keys = existing ? JSON.parse(existing) : [];
      
      if (!keys.includes(key)) {
        keys.push(key);
        await this.redisService.set(tagKey, JSON.stringify(keys));
      }
    }
  }

  private parseKeyspace(keyspace: string): number {
    const match = keyspace.match(/db\d+:keys=(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  generateHash(data: any): string {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    return crypto.createHash('md5').update(str).digest('hex');
  }
}
