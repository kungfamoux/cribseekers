import { RecommendationExplanation, RecommendationFactor } from '../types/recommendation-result.type';

export class RecommendationExplanationEntity implements RecommendationExplanation {
  propertyId: string;
  score: number;
  factors: RecommendationFactor[];
  generatedAt: Date;

  constructor(data: Partial<RecommendationExplanation>) {
    Object.assign(this, data);
  }
}
