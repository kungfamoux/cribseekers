import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeatureFlagService } from '../service/feature-flag.service';
import { CreateFeatureFlagDto, UpdateFeatureFlagDto, FeatureFlagResponseDto } from '../dto/feature-flag.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Feature Flags')
@Controller('feature-flags')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Post()
  @ApiOperation({ summary: 'Create feature flag' })
  @ApiResponse({ status: 201, description: 'Feature flag created successfully', type: FeatureFlagResponseDto })
  async create(@Body() dto: CreateFeatureFlagDto): Promise<FeatureFlagResponseDto> {
    return this.featureFlagService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update feature flag' })
  @ApiResponse({ status: 200, description: 'Feature flag updated successfully', type: FeatureFlagResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateFeatureFlagDto): Promise<FeatureFlagResponseDto> {
    return this.featureFlagService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feature flag' })
  @ApiResponse({ status: 200, description: 'Feature flag deleted successfully', type: FeatureFlagResponseDto })
  async delete(@Param('id') id: string): Promise<FeatureFlagResponseDto> {
    return this.featureFlagService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feature flag by ID' })
  @ApiResponse({ status: 200, description: 'Feature flag retrieved successfully', type: FeatureFlagResponseDto })
  async findById(@Param('id') id: string): Promise<FeatureFlagResponseDto> {
    return this.featureFlagService.findById(id);
  }

  @Get('key/:key')
  @ApiOperation({ summary: 'Get feature flag by key' })
  @ApiResponse({ status: 200, description: 'Feature flag retrieved successfully', type: FeatureFlagResponseDto })
  async findByKey(@Param('key') key: string): Promise<FeatureFlagResponseDto> {
    return this.featureFlagService.findByKey(key);
  }

  @Get('check/:key')
  @ApiOperation({ summary: 'Check if feature flag is enabled' })
  @ApiResponse({ status: 200, description: 'Feature flag status checked successfully' })
  async isEnabled(@Param('key') key: string, @Query('userId') userId?: string): Promise<{ enabled: boolean }> {
    const enabled = await this.featureFlagService.isEnabled(key, userId);
    return { enabled };
  }

  @Get()
  @ApiOperation({ summary: 'Get all feature flags' })
  @ApiResponse({ status: 200, description: 'Feature flags retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.featureFlagService.findAll(filter, { ...pagination, ...sort });
  }
}
