import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationOptions } from '../../../common/types/pagination.type';

export class PaginationDto implements PaginationOptions {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  get skip(): number {
    const page = this.page || 1;
    const limit = this.limit || 10;
    return (page - 1) * limit;
  }
}
