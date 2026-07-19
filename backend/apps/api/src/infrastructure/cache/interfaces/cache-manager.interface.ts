export interface CacheOptions {
  ttl?: number;
  namespace?: string;
  tags?: string[];
  compress?: boolean;
  serialize?: boolean;
}

export interface CacheResult<T> {
  data: T;
  cachedAt: Date;
  ttl: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  keys: number;
  memoryUsage: number;
}
