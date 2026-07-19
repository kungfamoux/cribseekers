import { RecommendationMetrics } from '../types/analytics-result.type';

export class RecommendationMetricsEntity implements RecommendationMetrics {
  clickThroughRate: number;
  acceptanceRate: number;
  rejectionRate: number;
  mostEffectiveStrategy: string;
  strategyPerformance: Array<{ strategy: string; impressions: number; clicks: number; conversions: number; ctr: number; conversionRate: number }>;

  constructor(data?: Partial<RecommendationMetrics>) {
    Object.assign(this, data);
  }
}
