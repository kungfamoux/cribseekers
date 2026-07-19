export interface RecommendationFilter {
  userId?: string;
  propertyId?: string;
  locationId?: string;
  categoryId?: string;
  typeId?: string;
  purposeId?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  state?: string;
  city?: string;
  lga?: string;
  estate?: string;
  district?: string;
  excludeViewed?: boolean;
  excludeFavorited?: boolean;
  excludeHidden?: boolean;
}

export interface RecommendationScoreFilter {
  weights?: Record<string, number>;
  minScore?: number;
  maxScore?: number;
  includeReasons?: boolean;
}

export interface RecommendationPaginationOptions {
  page?: number;
  limit?: number;
  skip?: number;
}

export interface RecommendationSortOptions {
  sortBy?: 'score' | 'price' | 'popularity' | 'freshness' | 'distance';
  sortOrder?: 'asc' | 'desc';
}
