import { ApiProperty } from '@nestjs/swagger';

export class PropertyReportDto {
  @ApiProperty({ description: 'Total listings' })
  totalListings: number;

  @ApiProperty({ description: 'Listings by state' })
  byState: Record<string, number>;

  @ApiProperty({ description: 'Listings by city' })
  byCity: Record<string, number>;

  @ApiProperty({ description: 'Listings by LGA' })
  byLga: Record<string, number>;

  @ApiProperty({ description: 'Listings by category' })
  byCategory: Record<string, number>;

  @ApiProperty({ description: 'Listings by type' })
  byType: Record<string, number>;

  @ApiProperty({ description: 'Listings by purpose' })
  byPurpose: Record<string, number>;

  @ApiProperty({ description: 'Price distribution' })
  priceDistribution: PriceBucketDto[];

  @ApiProperty({ description: 'Verification statistics' })
  verificationStatistics: VerificationStatsDto;

  @ApiProperty({ description: 'Availability statistics' })
  availability: AvailabilityStatsDto;

  @ApiProperty({ description: 'Most viewed properties' })
  mostViewed: TopPropertyDto[];

  @ApiProperty({ description: 'Most favorited properties' })
  mostFavorited: TopPropertyDto[];

  @ApiProperty({ description: 'Most contacted properties' })
  mostContacted: TopPropertyDto[];

  @ApiProperty({ description: 'Most inspected properties' })
  mostInspected: TopPropertyDto[];
}

export class PriceBucketDto {
  @ApiProperty({ description: 'Minimum price' })
  min: number;

  @ApiProperty({ description: 'Maximum price' })
  max: number;

  @ApiProperty({ description: 'Count in bucket' })
  count: number;
}

export class VerificationStatsDto {
  @ApiProperty({ description: 'Verified count' })
  verified: number;

  @ApiProperty({ description: 'Pending count' })
  pending: number;

  @ApiProperty({ description: 'Rejected count' })
  rejected: number;

  @ApiProperty({ description: 'Verification rate percentage' })
  rate: number;
}

export class AvailabilityStatsDto {
  @ApiProperty({ description: 'Available count' })
  available: number;

  @ApiProperty({ description: 'Rented count' })
  rented: number;

  @ApiProperty({ description: 'Unavailable count' })
  unavailable: number;
}

export class TopPropertyDto {
  @ApiProperty({ description: 'Property ID' })
  propertyId: string;

  @ApiProperty({ description: 'Property title' })
  title: string;

  @ApiProperty({ description: 'Count' })
  count: number;
}
