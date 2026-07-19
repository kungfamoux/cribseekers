import { IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { PropertyStatus, PropertyVisibility, ListingType } from '@prisma/client';

export class PropertySearchDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBedrooms?: number;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsOptional()
  @IsEnum(PropertyVisibility)
  visibility?: PropertyVisibility;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;
}
