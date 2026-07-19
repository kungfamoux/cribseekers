import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationTemplateService } from '../service/notification-template.service';
import { CreateNotificationTemplateDto, UpdateNotificationTemplateDto, NotificationTemplateResponseDto } from '../dto/notification-template.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Notification Templates')
@Controller('notification-templates')
export class NotificationTemplateController {
  constructor(private readonly notificationTemplateService: NotificationTemplateService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification template' })
  @ApiResponse({ status: 201, description: 'Template created successfully', type: NotificationTemplateResponseDto })
  async create(@Body() dto: CreateNotificationTemplateDto): Promise<NotificationTemplateResponseDto> {
    return this.notificationTemplateService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update notification template' })
  @ApiResponse({ status: 200, description: 'Template updated successfully', type: NotificationTemplateResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateNotificationTemplateDto): Promise<NotificationTemplateResponseDto> {
    return this.notificationTemplateService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification template' })
  @ApiResponse({ status: 200, description: 'Template deleted successfully', type: NotificationTemplateResponseDto })
  async delete(@Param('id') id: string): Promise<NotificationTemplateResponseDto> {
    return this.notificationTemplateService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification template by ID' })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully', type: NotificationTemplateResponseDto })
  async findById(@Param('id') id: string): Promise<NotificationTemplateResponseDto> {
    return this.notificationTemplateService.findById(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get notification template by name' })
  @ApiResponse({ status: 200, description: 'Template retrieved successfully', type: NotificationTemplateResponseDto })
  async findByName(@Param('name') name: string): Promise<NotificationTemplateResponseDto> {
    return this.notificationTemplateService.findByName(name);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get notification templates by type' })
  @ApiResponse({ status: 200, description: 'Templates retrieved successfully' })
  async findByType(
    @Param('type') type: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationTemplateService.findByType(type, { ...pagination, ...sort });
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active notification templates' })
  @ApiResponse({ status: 200, description: 'Active templates retrieved successfully' })
  async findActive(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationTemplateService.findActive({ ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification templates' })
  @ApiResponse({ status: 200, description: 'Templates retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationTemplateService.findAll(filter, { ...pagination, ...sort });
  }
}
