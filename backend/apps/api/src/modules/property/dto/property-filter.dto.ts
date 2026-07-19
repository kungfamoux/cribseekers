import { IsString, IsEnum, IsNumber, IsOptional, Min, Max, IsArray, IsBoolean } from 'class-validator';
import { PropertyStatus, PropertyVisibility, ListingType, PropertyCondition } from '@prisma/client';

export class PropertyFilterDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  lga?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  estate?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  typeId?: string;

  @IsOptional()
  @IsString()
  purposeId?: string;

  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType;

  @IsOptional()
  @IsEnum(PropertyCondition)
  condition?: PropertyCondition;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minBathrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBathrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsOptional()
  @IsEnum(PropertyVisibility)
  visibility?: PropertyVisibility;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50)
  radius?: number;

  @IsOptional()
  @IsArray()
  @IsString()
  amenityIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString()
  tags?: string[];
}
