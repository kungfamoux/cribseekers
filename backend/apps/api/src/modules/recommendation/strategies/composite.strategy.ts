import { Injectable } from '@nestjs/common';
import { IRecommendationStrategy, RecommendationContext } from '../interfaces/recommendation-strategy.interface';
import { RecommendationItem } from '../types/recommendation-result.type';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@Injectable()
export class CompositeRecommendationStrategy implements IRecommendationStrategy {
  private strategies: IRecommendationStrategy[] = [];

  registerStrategy(strategy: IRecommendationStrategy): void {
    this.strategies.push(strategy);
  }

  getName(): string {
    return RECOMMENDATION_CONSTANTS.STRATEGIES.COMPOSITE;
  }

  getWeight(): number {
    return 1.0;
  }

  async execute(context: RecommendationContext): Promise<RecommendationItem[]> {
    const allResults = await Promise.all(
      this.strategies.map(strategy => strategy.execute(context)),
    );

    const combined = allResults.flat();
    const scored = this.combineScores(combined);

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, context.limit || 50);
  }

  private combineScores(items: RecommendationItem[]): RecommendationItem[] {
    const scoreMap = new Map<string, RecommendationItem>();

    for (const item of items) {
      const existing = scoreMap.get(item.propertyId);
      if (existing) {
        existing.score = Math.max(existing.score, item.score);
        existing.reasons = [...existing.reasons, ...item.reasons];
      } else {
        scoreMap.set(item.propertyId, { ...item });
      }
    }

    return Array.from(scoreMap.values());
  }
}
