import { IsString, IsEnum, IsNumber, IsOptional, Min, Max, MaxLength, IsDateString, MinLength } from 'class-validator';
import { PropertyStatus, PropertyVisibility, ListingType, PropertyCondition, PricePeriod } from '@prisma/client';

export class CreatePropertyDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  categoryId: string;

  @IsString()
  typeId: string;

  @IsString()
  purposeId: string;

  @IsEnum(ListingType)
  listingType: ListingType;

  @IsOptional()
  @IsEnum(PropertyCondition)
  condition?: PropertyCondition;

  @IsNumber()
  @Min(0)
  price: number;

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

  @IsString()
  locationId: string;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsOptional()
  @IsEnum(PropertyVisibility)
  visibility?: PropertyVisibility;

  @IsOptional()
  @IsDateString()
  featuredUntil?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsString()
  ownerId: string;
}
