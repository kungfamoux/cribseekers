import { IsOptional, IsEnum } from 'class-validator';

export enum PropertySortField {
  PRICE = 'price',
  BEDROOMS = 'bedrooms',
  BATHROOMS = 'bathrooms',
  SQUARE_FEET = 'squareFeet',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  VIEWS = 'views',
  INQUIRIES = 'inquiries',
  PUBLISHED_AT = 'publishedAt',
}

export class PropertySortDto {
  @IsOptional()
  @IsEnum(PropertySortField)
  sortBy?: PropertySortField;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
