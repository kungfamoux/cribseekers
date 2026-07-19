import { ApiProperty } from '@nestjs/swagger';

export class RecommendationReasonDto {
  @ApiProperty({ description: 'Reason type' })
  type: string;

  @ApiProperty({ description: 'Reason description' })
  description: string;

  @ApiProperty({ description: 'Weight' })
  weight: number;

  @ApiProperty({ description: 'Contribution to score' })
  contribution: number;
}

export class RecommendationItemDto {
  @ApiProperty({ description: 'Property ID' })
  propertyId: string;

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

  @ApiProperty({ description: 'Distance in km' })
  distance?: number;

  @ApiProperty({ description: 'Thumbnail URL' })
  thumbnailUrl?: string;

  @ApiProperty({ description: 'Recommendation score' })
  score: number;

  @ApiProperty({ description: 'Recommendation reasons' })
  reasons: RecommendationReasonDto[];
}

export class RecommendationResponseDto {
  @ApiProperty({ description: 'Recommendation items' })
  data: RecommendationItemDto[];

  @ApiProperty({ description: 'Pagination metadata' })
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
