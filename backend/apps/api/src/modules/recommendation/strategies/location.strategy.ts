import { Injectable } from '@nestjs/common';
import { IRecommendationStrategy, RecommendationContext } from '../interfaces/recommendation-strategy.interface';
import { RecommendationItem } from '../types/recommendation-result.type';
import { RecommendationRepository } from '../repository/recommendation.repository';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@Injectable()
export class LocationStrategy implements IRecommendationStrategy {
  constructor(private readonly recommendationRepository: RecommendationRepository) {}

  getName(): string {
    return RECOMMENDATION_CONSTANTS.STRATEGIES.LOCATION;
  }

  getWeight(): number {
    return 0.2;
  }

  async execute(context: RecommendationContext): Promise<RecommendationItem[]> {
    if (!context.locationId) {
      return [];
    }

    const result = await this.recommendationRepository.getByLocation(
      context.locationId,
      context.userId,
      { page: 1, limit: context.limit || 20 },
    );

    return result.data;
  }
}
