import { ApiProperty } from '@nestjs/swagger';

export class RecommendationFactorDto {
  @ApiProperty({ description: 'Factor name' })
  name: string;

  @ApiProperty({ description: 'Factor value' })
  value: number;

  @ApiProperty({ description: 'Factor weight' })
  weight: number;

  @ApiProperty({ description: 'Contribution to score' })
  contribution: number;

  @ApiProperty({ description: 'Factor description' })
  description: string;
}

export class RecommendationExplanationDto {
  @ApiProperty({ description: 'Property ID' })
  propertyId: string;

  @ApiProperty({ description: 'Recommendation score' })
  score: number;

  @ApiProperty({ description: 'Scoring factors' })
  factors: RecommendationFactorDto[];

  @ApiProperty({ description: 'Generated at' })
  generatedAt: Date;
}
