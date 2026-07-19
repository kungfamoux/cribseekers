import { Injectable } from '@nestjs/common';
import { IRecommendationStrategy, RecommendationContext } from '../interfaces/recommendation-strategy.interface';
import { RecommendationItem } from '../types/recommendation-result.type';
import { RecommendationRepository } from '../repository/recommendation.repository';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@Injectable()
export class SimilarPropertyStrategy implements IRecommendationStrategy {
  constructor(private readonly recommendationRepository: RecommendationRepository) {}

  getName(): string {
    return RECOMMENDATION_CONSTANTS.STRATEGIES.SIMILAR_PROPERTY;
  }

  getWeight(): number {
    return 0.25;
  }

  async execute(context: RecommendationContext): Promise<RecommendationItem[]> {
    if (!context.propertyId) {
      return [];
    }

    const result = await this.recommendationRepository.getSimilarProperties(
      context.propertyId,
      context.userId,
      { page: 1, limit: context.limit || 20 },
    );

    return result.data;
  }
}
