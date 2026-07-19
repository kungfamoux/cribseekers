import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean, IsUUID, Min } from 'class-validator';

export class RecommendationRequestDto {
  @ApiPropertyOptional({ description: 'Property ID for similar recommendations' })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional({ description: 'Location ID' })
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Type ID' })
  @IsOptional()
  @IsUUID()
  typeId?: string;

  @ApiPropertyOptional({ description: 'Purpose ID' })
  @IsOptional()
  @IsUUID()
  purposeId?: string;

  @ApiPropertyOptional({ description: 'Minimum price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Minimum bedrooms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBedrooms?: number;

  @ApiPropertyOptional({ description: 'Minimum bathrooms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minBathrooms?: number;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Exclude viewed properties' })
  @IsOptional()
  @IsBoolean()
  excludeViewed?: boolean;

  @ApiPropertyOptional({ description: 'Exclude favorited properties' })
  @IsOptional()
  @IsBoolean()
  excludeFavorited?: boolean;

  @ApiPropertyOptional({ description: 'Exclude hidden properties' })
  @IsOptional()
  @IsBoolean()
  excludeHidden?: boolean;
}
