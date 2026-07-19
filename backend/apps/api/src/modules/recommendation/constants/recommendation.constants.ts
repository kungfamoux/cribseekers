export const RECOMMENDATION_CONSTANTS = {
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,

  // Scoring weights (configurable via admin settings)
  DEFAULT_WEIGHTS: {
    location: 0.25,
    priceSimilarity: 0.20,
    propertyType: 0.15,
    purpose: 0.10,
    bedrooms: 0.08,
    bathrooms: 0.07,
    amenities: 0.05,
    favorites: 0.04,
    views: 0.03,
    searchHistory: 0.02,
    inspectionHistory: 0.01,
    popularity: 0.05,
    freshness: 0.03,
    verificationStatus: 0.02,
    featuredStatus: 0.02,
    recency: 0.03,
  } as const,

  // Score thresholds
  MIN_SCORE: 0,
  MAX_SCORE: 100,
  MIN_RECOMMENDATION_SCORE: 50,

  // Recommendation types
  RECOMMENDATION_TYPES: {
    PERSONALIZED: 'personalized',
    SIMILAR: 'similar',
    POPULAR: 'popular',
    TRENDING: 'trending',
    RECENTLY_VIEWED: 'recently_viewed',
    RECENTLY_SEARCHED: 'recently_searched',
    NEARBY: 'nearby',
    BUDGET: 'budget',
    CATEGORY: 'category',
    INSPECTION: 'inspection',
    FAVORITE: 'favorite',
  } as const,

  // Feedback types
  FEEDBACK_TYPES: {
    LIKE: 'like',
    DISLIKE: 'dislike',
    HIDE: 'hide',
    SAVE: 'save',
  } as const,

  // Strategy names
  STRATEGIES: {
    POPULAR: 'popular',
    SIMILAR_PROPERTY: 'similar_property',
    BUDGET: 'budget',
    LOCATION: 'location',
    FAVORITE: 'favorite',
    RECENT_VIEW: 'recent_view',
    SEARCH_HISTORY: 'search_history',
    INSPECTION: 'inspection',
    COMPOSITE: 'composite',
  } as const,

  // Cache TTL (in seconds) - for future Redis implementation
  CACHE_TTL: 3600,

  // Maximum recommendations per request
  MAX_RECOMMENDATIONS: 50,
} as const;
