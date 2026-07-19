import { Injectable } from '@nestjs/common';
import { IRecommendationProvider } from '../interfaces/recommendation-provider.interface';
import { RecommendationFilter, RecommendationScoreFilter } from '../types/recommendation-filter.type';
import { RecommendationItem } from '../types/recommendation-result.type';
import { RecommendationRepository } from '../repository/recommendation.repository';

@Injectable()
export class DefaultRecommendationProvider implements IRecommendationProvider {
  constructor(private readonly recommendationRepository: RecommendationRepository) {}

  async generateRecommendations(
    userId: string,
    filter?: RecommendationFilter,
    scoreFilter?: RecommendationScoreFilter,
  ): Promise<RecommendationItem[]> {
    const result = await this.recommendationRepository.getRecommendations(
      userId,
      filter,
      { page: 1, limit: 50 },
      { sortBy: 'score', sortOrder: 'desc' },
    );

    let items = result.data;

    if (scoreFilter?.minScore !== undefined) {
      items = items.filter(item => item.score >= scoreFilter.minScore!);
    }

    if (scoreFilter?.maxScore !== undefined) {
      items = items.filter(item => item.score <= scoreFilter.maxScore!);
    }

    return items;
  }

  async generateSimilarProperties(
    propertyId: string,
    userId?: string,
    limit: number = 10,
  ): Promise<RecommendationItem[]> {
    const result = await this.recommendationRepository.getSimilarProperties(
      propertyId,
      userId,
      { page: 1, limit },
    );

    return result.data;
  }

  async generateLocationRecommendations(
    locationId: string,
    userId?: string,
    limit: number = 10,
  ): Promise<RecommendationItem[]> {
    const result = await this.recommendationRepository.getByLocation(
      locationId,
      userId,
      { page: 1, limit },
    );

    return result.data;
  }

  async generateBudgetRecommendations(
    userId: string,
    minPrice?: number,
    maxPrice?: number,
    limit: number = 10,
  ): Promise<RecommendationItem[]> {
    const result = await this.recommendationRepository.getByBudget(
      userId,
      minPrice,
      maxPrice,
      { page: 1, limit },
    );

    return result.data;
  }

  getProviderName(): string {
    return 'default';
  }

  isAvailable(): boolean {
    return true;
  }
}
