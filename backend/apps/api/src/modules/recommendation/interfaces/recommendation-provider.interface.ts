import { RecommendationFilter, RecommendationScoreFilter } from '../types/recommendation-filter.type';
import { RecommendationItem } from '../types/recommendation-result.type';

export interface IRecommendationProvider {
  /**
   * Generate recommendations for a user
   */
  generateRecommendations(
    userId: string,
    filter?: RecommendationFilter,
    scoreFilter?: RecommendationScoreFilter,
  ): Promise<RecommendationItem[]>;

  /**
   * Generate similar property recommendations
   */
  generateSimilarProperties(
    propertyId: string,
    userId?: string,
    limit?: number,
  ): Promise<RecommendationItem[]>;

  /**
   * Generate recommendations based on location
   */
  generateLocationRecommendations(
    locationId: string,
    userId?: string,
    limit?: number,
  ): Promise<RecommendationItem[]>;

  /**
   * Generate recommendations based on budget
   */
  generateBudgetRecommendations(
    userId: string,
    minPrice?: number,
    maxPrice?: number,
    limit?: number,
  ): Promise<RecommendationItem[]>;

  /**
   * Get provider name
   */
  getProviderName(): string;

  /**
   * Check if provider is available
   */
  isAvailable(): boolean;
}
