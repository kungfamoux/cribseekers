import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean, IsUUID, Min } from 'class-validator';

export class PropertySearchDto {
  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;

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

  @ApiPropertyOptional({ description: 'Number of bedrooms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ description: 'Number of bathrooms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ description: 'Furnished property' })
  @IsOptional()
  @IsBoolean()
  furnished?: boolean;

  @ApiPropertyOptional({ description: 'Serviced property' })
  @IsOptional()
  @IsBoolean()
  serviced?: boolean;

  @ApiPropertyOptional({ description: 'Verified property' })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiPropertyOptional({ description: 'Featured property' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Property purpose ID' })
  @IsOptional()
  @IsUUID()
  purpose?: string;

  @ApiPropertyOptional({ description: 'Property type ID' })
  @IsOptional()
  @IsUUID()
  propertyType?: string;

  @ApiPropertyOptional({ description: 'Property category ID' })
  @IsOptional()
  @IsUUID()
  category?: string;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Local Government Area' })
  @IsOptional()
  @IsString()
  lga?: string;

  @ApiPropertyOptional({ description: 'Estate' })
  @IsOptional()
  @IsString()
  estate?: string;

  @ApiPropertyOptional({ description: 'District' })
  @IsOptional()
  @IsString()
  district?: string;
}
