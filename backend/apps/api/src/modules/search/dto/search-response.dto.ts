import { ApiProperty } from '@nestjs/swagger';

export class SearchResponseDto {
  @ApiProperty({ description: 'Property ID' })
  id: string;

  @ApiProperty({ description: 'Property title' })
  title: string;

  @ApiProperty({ description: 'Property description' })
  description: string;

  @ApiProperty({ description: 'Price' })
  price: number;

  @ApiProperty({ description: 'Currency' })
  currency: string;

  @ApiProperty({ description: 'Price period' })
  pricePeriod?: string;

  @ApiProperty({ description: 'Category ID' })
  categoryId: string;

  @ApiProperty({ description: 'Type ID' })
  typeId: string;

  @ApiProperty({ description: 'Purpose ID' })
  purposeId: string;

  @ApiProperty({ description: 'Location ID' })
  locationId: string;

  @ApiProperty({ description: 'State' })
  state: string;

  @ApiProperty({ description: 'City' })
  city: string;

  @ApiProperty({ description: 'Local Government Area' })
  lga?: string;

  @ApiProperty({ description: 'District' })
  district?: string;

  @ApiProperty({ description: 'Estate' })
  estate?: string;

  @ApiProperty({ description: 'Number of bedrooms' })
  bedrooms?: number;

  @ApiProperty({ description: 'Number of bathrooms' })
  bathrooms?: number;

  @ApiProperty({ description: 'Square feet' })
  squareFeet?: number;

  @ApiProperty({ description: 'Square meters' })
  squareMeters?: number;

  @ApiProperty({ description: 'Status' })
  status: string;

  @ApiProperty({ description: 'Is featured' })
  featured: boolean;

  @ApiProperty({ description: 'Is verified' })
  verified: boolean;

  @ApiProperty({ description: 'Number of views' })
  views: number;

  @ApiProperty({ description: 'Published date' })
  publishedAt: Date;

  @ApiProperty({ description: 'Distance in km (for geo search)' })
  distance?: number;

  @ApiProperty({ description: 'Thumbnail URL' })
  thumbnailUrl?: string;
}

export class SearchSuggestionDto {
  @ApiProperty({ description: 'Suggestion ID' })
  id: string;

  @ApiProperty({ description: 'Type of suggestion' })
  type: 'state' | 'city' | 'lga' | 'estate' | 'district';

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'State' })
  state?: string;

  @ApiProperty({ description: 'City' })
  city?: string;

  @ApiProperty({ description: 'Property count' })
  count: number;
}
