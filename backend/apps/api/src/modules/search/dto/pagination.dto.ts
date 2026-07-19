import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { SEARCH_CONSTANTS } from '../constants/search.constants';

export class PaginationDto {
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
    minimum: SEARCH_CONSTANTS.MIN_PAGE_SIZE,
    maximum: SEARCH_CONSTANTS.MAX_PAGE_SIZE,
    default: SEARCH_CONSTANTS.DEFAULT_PAGE_SIZE
  })
  @IsOptional()
  @IsNumber()
  @Min(SEARCH_CONSTANTS.MIN_PAGE_SIZE)
  @Max(SEARCH_CONSTANTS.MAX_PAGE_SIZE)
  @Type(() => Number)
  limit?: number;
}
