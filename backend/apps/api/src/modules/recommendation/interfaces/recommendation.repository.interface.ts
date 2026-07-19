import { RecommendationFilter, RecommendationPaginationOptions, RecommendationSortOptions } from '../types/recommendation-filter.type';
import { RecommendationItem, RecommendationExplanation, RecommendationFeedback } from '../types/recommendation-result.type';
import { PaginationResult } from '../../../common/types/pagination.type';

export interface IRecommendationRepository {
  // Get recommendations for a user
  getRecommendations(
    userId: string,
    filter?: RecommendationFilter,
    pagination?: RecommendationPaginationOptions,
    sort?: RecommendationSortOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get similar properties
  getSimilarProperties(
    propertyId: string,
    userId?: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get popular recommendations
  getPopular(
    filter?: RecommendationFilter,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get recommendations by location
  getByLocation(
    locationId: string,
    userId?: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get recommendations by budget
  getByBudget(
    userId: string,
    minPrice?: number,
    maxPrice?: number,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get recommendations by category
  getByCategory(
    categoryId: string,
    userId?: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get recommendations based on inspection history
  getByInspectionHistory(
    userId: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get recommendations based on favorite history
  getByFavoriteHistory(
    userId: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>>;

  // Get recommendation explanation
  getExplanation(propertyId: string, userId: string): Promise<RecommendationExplanation | null>;

  // Save feedback
  saveFeedback(feedback: Omit<RecommendationFeedback, 'id' | 'createdAt'>): Promise<RecommendationFeedback>;

  // Get user feedback
  getUserFeedback(userId: string, propertyId?: string): Promise<RecommendationFeedback[]>;

  // Get recently viewed properties
  getRecentlyViewed(userId: string, limit?: number): Promise<RecommendationItem[]>;

  // Get recently searched
  getRecentlySearched(userId: string, limit?: number): Promise<RecommendationItem[]>;

  // Get user preferences for scoring
  getUserPreferences(userId: string): Promise<any>;
}
