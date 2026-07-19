import { IsString, IsEnum, IsNumber, IsOptional, Min, Max, MaxLength, IsDateString, MinLength, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { PropertyStatus, PropertyVisibility, ListingType, PropertyCondition, PricePeriod } from '@prisma/client';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

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
  price?: number;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @IsOptional()
  @IsEnum(PricePeriod)
  pricePeriod?: PricePeriod;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  squareFeet?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  squareMeters?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  lotSize?: number;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(2100)
  yearBuilt?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  parkingSpaces?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  floors?: number;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsOptional()
  @IsEnum(PropertyVisibility)
  visibility?: PropertyVisibility;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsDateString()
  featuredUntil?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsDateString()
  verifiedAt?: string;

  @IsOptional()
  @IsString()
  verifiedBy?: string;
}
