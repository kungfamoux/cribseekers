import { ApiProperty } from '@nestjs/swagger';

export class SearchReportDto {
  @ApiProperty({ description: 'Most searched locations' })
  mostSearchedLocations: LocationSearchStatsDto[];

  @ApiProperty({ description: 'Popular searches' })
  popularSearches: PopularSearchDto[];

  @ApiProperty({ description: 'Saved searches count' })
  savedSearches: number;

  @ApiProperty({ description: 'Search conversions' })
  searchConversions: number;

  @ApiProperty({ description: 'No-result searches' })
  noResultSearches: number;
}

export class LocationSearchStatsDto {
  @ApiProperty({ description: 'Location name' })
  location: string;

  @ApiProperty({ description: 'Search count' })
  count: number;
}

export class PopularSearchDto {
  @ApiProperty({ description: 'Search query' })
  query: string;

  @ApiProperty({ description: 'Search count' })
  count: number;
}
