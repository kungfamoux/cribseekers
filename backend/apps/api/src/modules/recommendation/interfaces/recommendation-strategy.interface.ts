import { RecommendationItem } from '../types/recommendation-result.type';

export interface IRecommendationStrategy {
  /**
   * Strategy name
   */
  getName(): string;

  /**
   * Execute strategy to generate recommendations
   */
  execute(context: RecommendationContext): Promise<RecommendationItem[]>;

  /**
   * Get strategy weight
   */
  getWeight(): number;
}

export interface RecommendationContext {
  userId: string;
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
  limit?: number;
  excludeViewed?: boolean;
  excludeFavorited?: boolean;
  excludeHidden?: boolean;
}
