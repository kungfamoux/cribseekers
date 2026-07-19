import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

export class RecommendationPaginationDto {
  @ApiPropertyOptional({ 
    description: 'Page number',
    minimum: 1,
    default: 1
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ 
    description: 'Items per page',
    minimum: RECOMMENDATION_CONSTANTS.MIN_PAGE_SIZE,
    maximum: RECOMMENDATION_CONSTANTS.MAX_PAGE_SIZE,
    default: RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE
  })
  @IsOptional()
  @IsNumber()
  @Min(RECOMMENDATION_CONSTANTS.MIN_PAGE_SIZE)
  @Max(RECOMMENDATION_CONSTANTS.MAX_PAGE_SIZE)
  @Type(() => Number)
  limit?: number;
}
