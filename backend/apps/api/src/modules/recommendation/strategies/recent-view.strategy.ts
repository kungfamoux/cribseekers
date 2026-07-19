import { Injectable } from '@nestjs/common';
import { IRecommendationStrategy, RecommendationContext } from '../interfaces/recommendation-strategy.interface';
import { RecommendationItem } from '../types/recommendation-result.type';
import { RecommendationRepository } from '../repository/recommendation.repository';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@Injectable()
export class RecentViewStrategy implements IRecommendationStrategy {
  constructor(private readonly recommendationRepository: RecommendationRepository) {}

  getName(): string {
    return RECOMMENDATION_CONSTANTS.STRATEGIES.RECENT_VIEW;
  }

  getWeight(): number {
    return 0.1;
  }

  async execute(context: RecommendationContext): Promise<RecommendationItem[]> {
    if (!context.userId) {
      return [];
    }

    const items = await this.recommendationRepository.getRecentlyViewed(
      context.userId,
      context.limit || 10,
    );

    return items;
  }
}
