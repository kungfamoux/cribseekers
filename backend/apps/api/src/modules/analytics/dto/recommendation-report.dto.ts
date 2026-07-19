import { ApiProperty } from '@nestjs/swagger';

export class RecommendationReportDto {
  @ApiProperty({ description: 'Click-through rate percentage' })
  clickThroughRate: number;

  @ApiProperty({ description: 'Acceptance rate percentage' })
  acceptanceRate: number;

  @ApiProperty({ description: 'Rejection rate percentage' })
  rejectionRate: number;

  @ApiProperty({ description: 'Most effective strategy name' })
  mostEffectiveStrategy: string;

  @ApiProperty({ description: 'Strategy performance data' })
  strategyPerformance: StrategyStatsDto[];
}

export class StrategyStatsDto {
  @ApiProperty({ description: 'Strategy name' })
  strategy: string;

  @ApiProperty({ description: 'Impressions count' })
  impressions: number;

  @ApiProperty({ description: 'Clicks count' })
  clicks: number;

  @ApiProperty({ description: 'Conversions count' })
  conversions: number;

  @ApiProperty({ description: 'CTR percentage' })
  ctr: number;

  @ApiProperty({ description: 'Conversion rate percentage' })
  conversionRate: number;
}
