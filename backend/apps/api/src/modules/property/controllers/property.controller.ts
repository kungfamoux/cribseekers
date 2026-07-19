import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PropertyService } from '../service/property.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertySummaryDto } from '../dto/property-summary.dto';
import { PropertyFilterDto } from '../dto/property-filter.dto';
import { PropertySearchDto } from '../dto/property-search.dto';
import { PropertySortDto } from '../dto/property-sort.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({ status: 201, description: 'Property created successfully', type: PropertyResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Property already exists' })
  @ApiBearerAuth()
  async create(@Body() dto: CreatePropertyDto): Promise<PropertyResponseDto> {
    return this.propertyService.create(dto, 'current-user-id');
  }

  @Get()
  @ApiOperation({ summary: 'Get all properties with filters' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  @ApiQuery({ type: PropertyFilterDto, required: false })
  @ApiQuery({ type: PaginationDto, required: false })
  @ApiQuery({ type: PropertySortDto, required: false })
  async findAll(
    @Query() filter?: PropertyFilterDto,
    @Query() pagination?: PaginationDto,
    @Query() sort?: PropertySortDto,
  ): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    return this.propertyService.findAll(filter, pagination, sort);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search properties' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  @ApiQuery({ type: PropertySearchDto })
  async search(@Query() dto: PropertySearchDto): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    return this.propertyService.search(dto);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured properties' })
  @ApiResponse({ status: 200, description: 'Featured properties retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findFeatured(@Query() pagination?: PaginationDto): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    return this.propertyService.findFeatured(pagination);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published properties' })
  @ApiResponse({ status: 200, description: 'Published properties retrieved successfully' })
  @ApiQuery({ type: PaginationDto, required: false })
  async findPublished(@Query() pagination?: PaginationDto): Promise<{ data: PropertySummaryDto[]; meta: any }> {
    return this.propertyService.findPublished(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({ status: 200, description: 'Property retrieved successfully', type: PropertyResponseDto })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  async findById(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.propertyService.findById(id);
  }

  @Get(':id/summary')
  @ApiOperation({ summary: 'Get property summary by ID' })
  @ApiResponse({ status: 200, description: 'Property summary retrieved successfully', type: PropertySummaryDto })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  async findSummaryById(@Param('id') id: string): Promise<PropertySummaryDto> {
    return this.propertyService.findSummaryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update property' })
  @ApiResponse({ status: 200, description: 'Property updated successfully', type: PropertyResponseDto })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() dto: UpdatePropertyDto): Promise<PropertyResponseDto> {
    return this.propertyService.update(id, dto, 'current-user-id');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete property' })
  @ApiResponse({ status: 204, description: 'Property deleted successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    return this.propertyService.delete(id);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish property' })
  @ApiResponse({ status: 200, description: 'Property published successfully', type: PropertyResponseDto })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiBearerAuth()
  async publish(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.propertyService.publish(id, 'current-user-id');
  }

  @Post(':id/unpublish')
  @ApiOperation({ summary: 'Unpublish property' })
  @ApiResponse({ status: 200, description: 'Property unpublished successfully', type: PropertyResponseDto })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiBearerAuth()
  async unpublish(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.propertyService.unpublish(id);
  }

  @Post(':id/verify')
  @ApiOperation({ summary: 'Verify property' })
  @ApiResponse({ status: 200, description: 'Property verified successfully', type: PropertyResponseDto })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  @ApiBearerAuth()
  async verify(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.propertyService.verify(id, 'current-user-id');
  }

  @Post(':id/views')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Increment property views' })
  @ApiResponse({ status: 204, description: 'Views incremented successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  async incrementViews(@Param('id') id: string): Promise<void> {
    return this.propertyService.incrementViews(id);
  }

  @Post(':id/inquiries')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Increment property inquiries' })
  @ApiResponse({ status: 204, description: 'Inquiries incremented successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiParam({ name: 'id', description: 'Property ID' })
  async incrementInquiries(@Param('id') id: string): Promise<void> {
    return this.propertyService.incrementInquiries(id);
  }
}
