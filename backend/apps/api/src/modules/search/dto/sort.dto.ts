import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';
import { SEARCH_CONSTANTS } from '../constants/search.constants';

export class SortDto {
  @ApiPropertyOptional({ 
    description: 'Sort by field',
    enum: Object.values(SEARCH_CONSTANTS.SORT_OPTIONS)
  })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(SEARCH_CONSTANTS.SORT_OPTIONS))
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Sort order' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
