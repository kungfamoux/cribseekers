import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PropertyService } from '../service/property.service';
import { PropertySummaryDto } from '../dto/property-summary.dto';
import { PropertySortDto } from '../dto/property-sort.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get properties by owner' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  @ApiParam({ name: 'ownerId', description: 'Owner ID' })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: PropertySortDto, required: false })
  async findByOwner(
    @Param('ownerId') ownerId: string,
    @Query() pagination?: PaginationDto,
    @Query() sort?: PropertySortDto,
  ): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    return this.propertyService.findByOwner(ownerId, pagination, sort);
  }
}
