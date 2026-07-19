import { Injectable } from '@nestjs/common';
import { IRecommendationStrategy, RecommendationContext } from '../interfaces/recommendation-strategy.interface';
import { RecommendationItem } from '../types/recommendation-result.type';
import { RecommendationRepository } from '../repository/recommendation.repository';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@Injectable()
export class PopularStrategy implements IRecommendationStrategy {
  constructor(private readonly recommendationRepository: RecommendationRepository) {}

  getName(): string {
    return RECOMMENDATION_CONSTANTS.STRATEGIES.POPULAR;
  }

  getWeight(): number {
    return 0.3;
  }

  async execute(context: RecommendationContext): Promise<RecommendationItem[]> {
    const result = await this.recommendationRepository.getPopular(
      {
        categoryId: context.categoryId,
        typeId: context.typeId,
        purposeId: context.purposeId,
        state: context.state,
        city: context.city,
      },
      { page: 1, limit: context.limit || 20 },
    );

    return result.data;
  }
}
