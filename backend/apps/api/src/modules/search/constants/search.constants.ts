export const SEARCH_CONSTANTS = {
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,

  // Search radius limits (in kilometers)
  MIN_SEARCH_RADIUS: 0.1, // 100 meters
  MAX_SEARCH_RADIUS: 100, // 100 kilometers
  DEFAULT_SEARCH_RADIUS: 5, // 5 kilometers

  // Coordinate validation
  MIN_LATITUDE: -90,
  MAX_LATITUDE: 90,
  MIN_LONGITUDE: -180,
  MAX_LONGITUDE: 180,

  // Search result limits
  MAX_SUGGESTIONS: 10,
  MAX_NEARBY_RESULTS: 50,

  // Sort options
  SORT_OPTIONS: {
    NEWEST: 'newest',
    OLDEST: 'oldest',
    PRICE_LOW_HIGH: 'price_low_high',
    PRICE_HIGH_LOW: 'price_high_low',
    DISTANCE: 'distance',
    POPULARITY: 'popularity',
    FEATURED: 'featured',
  } as const,

  // Search types
  SEARCH_TYPES: {
    GLOBAL: 'global',
    KEYWORD: 'keyword',
    STATE: 'state',
    CITY: 'city',
    LGA: 'lga',
    AREA: 'area',
    NEARBY: 'nearby',
    RADIUS: 'radius',
    CATEGORY: 'category',
    TYPE: 'type',
    PURPOSE: 'purpose',
  } as const,

  // Property status filters
  PROPERTY_STATUS: {
    PUBLISHED: 'PUBLISHED',
    VERIFIED: 'VERIFIED',
    AVAILABLE: 'AVAILABLE',
  } as const,
} as const;
