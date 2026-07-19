import { Injectable, Logger } from '@nestjs/common';
import { CacheNamespaces, CacheNamespace } from './cache.constants';
import { CacheOptions, CacheStats } from './interfaces/cache-manager.interface';
import * as crypto from 'crypto';

@Injectable()
export class CacheManagerService {
  private readonly logger = new Logger(CacheManagerService.name);
  private stats = {
    hits: 0,
    misses: 0,
  };
  private cache = new Map<string, any>();

  async get<T>(key: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<T | null> {
    const fullKey = this.buildKey(key, namespace);
    
    try {
      const value = this.cache.get(fullKey);
      
      if (value) {
        this.stats.hits++;
        
        if (value.expiresAt && new Date(value.expiresAt) < new Date()) {
          this.cache.delete(fullKey);
          return null;
        }
        
        return value.data as T;
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
    const ttl = options.ttl || 300; // Default 5 minutes
    
    try {
      const cacheValue = {
        data: value,
        cachedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + ttl * 1000).toISOString(),
        tags: options.tags || [],
      };

      this.cache.set(fullKey, cacheValue);
      
      // Auto-expire after TTL
      setTimeout(() => {
        this.cache.delete(fullKey);
      }, ttl * 1000);
    } catch (error) {
      this.logger.error(`Cache set error for key ${fullKey}:`, error);
    }
  }

  async del(key: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<void> {
    const fullKey = this.buildKey(key, namespace);
    this.cache.delete(fullKey);
  }

  async delPattern(pattern: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<void> {
    const fullPattern = this.buildKey(pattern, namespace);
    
    const keys = Array.from(this.cache.keys());
    for (const key of keys) {
      if (this.matchPattern(key, fullPattern)) {
        this.cache.delete(key);
      }
    }
  }

  async invalidateByTag(_tag: string): Promise<void> {
    // No-op for in-memory cache
  }

  async invalidateNamespace(namespace: CacheNamespace): Promise<void> {
    await this.delPattern('*', namespace);
  }

  async exists(key: string, namespace: CacheNamespace = CacheNamespaces.PROPERTY): Promise<boolean> {
    const fullKey = this.buildKey(key, namespace);
    return this.cache.has(fullKey);
  }

  async getStats(): Promise<CacheStats> {
    const hitRate = this.stats.hits + this.stats.misses > 0 
      ? (this.stats.hits / (this.stats.hits + this.stats.misses)) * 100 
      : 0;

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate,
      keys: this.cache.size,
      memoryUsage: 0,
    };
  }

  async resetStats(): Promise<void> {
    this.stats = { hits: 0, misses: 0 };
  }

  async flushNamespace(namespace: CacheNamespace): Promise<void> {
    await this.invalidateNamespace(namespace);
  }

  async flushAll(): Promise<void> {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0 };
  }

  private buildKey(key: string, namespace: CacheNamespace): string {
    return `${namespace}:${key}`;
  }

  private matchPattern(key: string, pattern: string): boolean {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(key);
  }

  generateHash(data: any): string {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    return crypto.createHash('md5').update(str).digest('hex');
  }
}
