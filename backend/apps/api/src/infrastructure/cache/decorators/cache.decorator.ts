import { SetMetadata } from '@nestjs/common';
import { CacheNamespace as CacheNamespaceType } from '../cache.constants';
import { CacheOptions as CacheOptionsType } from '../interfaces/cache-manager.interface';

export const CACHE_KEY_METADATA = 'cache_key';
export const CACHE_TTL_METADATA = 'cache_ttl';
export const CACHE_NAMESPACE_METADATA = 'cache_namespace';
export const CACHE_OPTIONS_METADATA = 'cache_options';
export const CACHE_SKIP_METADATA = 'cache_skip';

export const Cache = (key: string, options?: CacheOptionsType & { namespace?: CacheNamespaceType }) => {
  return SetMetadata(CACHE_KEY_METADATA, { key, ...options });
};

export const CacheTTL = (ttl: number) => {
  return SetMetadata(CACHE_TTL_METADATA, ttl);
};

export const UseCacheNamespace = (namespace: CacheNamespaceType) => {
  return SetMetadata(CACHE_NAMESPACE_METADATA, namespace);
};

export const UseCacheOptions = (options: CacheOptionsType) => {
  return SetMetadata(CACHE_OPTIONS_METADATA, options);
};

export const CacheSkip = () => {
  return SetMetadata(CACHE_SKIP_METADATA, true);
};
