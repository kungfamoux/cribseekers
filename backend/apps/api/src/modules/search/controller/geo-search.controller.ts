import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GeoSearchService } from '../service/geo-search.service';
import { GeoSearchDto } from '../dto/geo-search.dto';
import { SearchResponseDto } from '../dto/search-response.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Geo Search')
@Controller('search/geo')
export class GeoSearchController {
  constructor(private readonly geoSearchService: GeoSearchService) {}

  @Get('nearby')
  @ApiOperation({ summary: 'Search nearby properties' })
  @ApiResponse({ status: 200, description: 'Nearby properties retrieved successfully' })
  @ApiQuery({ type: GeoSearchDto })
  @ApiQuery({ type: PaginationDto, required: false })
  async searchNearby(
    @Query() dto: GeoSearchDto,
    @Query() pagination?: PaginationDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.geoSearchService.searchNearby(dto, pagination);
  }

  @Get('radius')
  @ApiOperation({ summary: 'Search properties within radius' })
  @ApiResponse({ status: 200, description: 'Properties within radius retrieved successfully' })
  @ApiQuery({ type: GeoSearchDto })
  @ApiQuery({ type: PaginationDto, required: false })
  async searchByRadius(
    @Query() dto: GeoSearchDto,
    @Query() pagination?: PaginationDto,
  ): Promise<{ data: SearchResponseDto[]; meta: any }> {
    return this.geoSearchService.searchByRadius(dto, pagination);
  }
}
