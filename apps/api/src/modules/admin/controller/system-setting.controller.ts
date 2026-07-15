import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemSettingService } from '../service/system-setting.service';
import { CreateSystemSettingDto, UpdateSystemSettingDto, SystemSettingResponseDto } from '../dto/system-setting.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('System Settings')
@Controller('system-settings')
export class SystemSettingController {
  constructor(private readonly systemSettingService: SystemSettingService) {}

  @Post()
  @ApiOperation({ summary: 'Create system setting' })
  @ApiResponse({ status: 201, description: 'System setting created successfully', type: SystemSettingResponseDto })
  async create(@Body() dto: CreateSystemSettingDto): Promise<SystemSettingResponseDto> {
    return this.systemSettingService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update system setting' })
  @ApiResponse({ status: 200, description: 'System setting updated successfully', type: SystemSettingResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateSystemSettingDto): Promise<SystemSettingResponseDto> {
    return this.systemSettingService.update(id, dto, 'admin-id');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete system setting' })
  @ApiResponse({ status: 200, description: 'System setting deleted successfully', type: SystemSettingResponseDto })
  async delete(@Param('id') id: string): Promise<SystemSettingResponseDto> {
    return this.systemSettingService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get system setting by ID' })
  @ApiResponse({ status: 200, description: 'System setting retrieved successfully', type: SystemSettingResponseDto })
  async findById(@Param('id') id: string): Promise<SystemSettingResponseDto> {
    return this.systemSettingService.findById(id);
  }

  @Get('key/:key')
  @ApiOperation({ summary: 'Get system setting by key' })
  @ApiResponse({ status: 200, description: 'System setting retrieved successfully', type: SystemSettingResponseDto })
  async findByKey(@Param('key') key: string): Promise<SystemSettingResponseDto> {
    return this.systemSettingService.findByKey(key);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get system settings by category' })
  @ApiResponse({ status: 200, description: 'System settings retrieved successfully' })
  async findByCategory(
    @Param('category') category: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.systemSettingService.findByCategory(category, { ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all system settings' })
  @ApiResponse({ status: 200, description: 'System settings retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.systemSettingService.findAll(filter, { ...pagination, ...sort });
  }
}
