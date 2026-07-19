import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';
import { SEARCH_CONSTANTS } from '../constants/search.constants';

export class GeoSearchDto {
  @ApiProperty({ description: 'Latitude' })
  @IsNumber()
  @Min(SEARCH_CONSTANTS.MIN_LATITUDE)
  @Max(SEARCH_CONSTANTS.MAX_LATITUDE)
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNumber()
  @Min(SEARCH_CONSTANTS.MIN_LONGITUDE)
  @Max(SEARCH_CONSTANTS.MAX_LONGITUDE)
  longitude: number;

  @ApiProperty({ 
    description: 'Search radius in kilometers',
    minimum: SEARCH_CONSTANTS.MIN_SEARCH_RADIUS,
    maximum: SEARCH_CONSTANTS.MAX_SEARCH_RADIUS,
    default: SEARCH_CONSTANTS.DEFAULT_SEARCH_RADIUS
  })
  @IsNumber()
  @Min(SEARCH_CONSTANTS.MIN_SEARCH_RADIUS)
  @Max(SEARCH_CONSTANTS.MAX_SEARCH_RADIUS)
  radius: number;
}
