export const CACHE_PREFIX = 'cribseekers';
export const CACHE_DEFAULT_TTL = 3600; // 1 hour in seconds
export const CACHE_NAMESPACE_SEPARATOR = ':';

export const CacheNamespaces = {
  PROPERTY: 'property',
  PROPERTY_SEARCH: 'property_search',
  GEO_SEARCH: 'geo_search',
  AI_RECOMMENDATIONS: 'ai_recommendations',
  ANALYTICS: 'analytics',
  DASHBOARD: 'dashboard',
  CATEGORIES: 'categories',
  PROPERTY_TYPES: 'property_types',
  PURPOSES: 'purposes',
  AMENITIES: 'amenities',
  FEATURE_FLAGS: 'feature_flags',
  SYSTEM_SETTINGS: 'system_settings',
  SEARCH_SUGGESTIONS: 'search_suggestions',
  POPULAR_PROPERTIES: 'popular_properties',
  FREQUENTLY_VIEWED: 'frequently_viewed',
  USER_SESSIONS: 'user_sessions',
  RATE_LIMIT: 'rate_limit',
} as const;

export type CacheNamespace = typeof CacheNamespaces[keyof typeof CacheNamespaces];

export const CacheTags = {
  PROPERTY_UPDATE: 'property_update',
  PROPERTY_DELETE: 'property_delete',
  USER_UPDATE: 'user_update',
  CATEGORY_UPDATE: 'category_update',
  AMENITY_UPDATE: 'amenity_update',
  FEATURE_FLAG_UPDATE: 'feature_flag_update',
  SYSTEM_SETTING_UPDATE: 'system_setting_update',
} as const;

export type CacheTag = typeof CacheTags[keyof typeof CacheTags];
