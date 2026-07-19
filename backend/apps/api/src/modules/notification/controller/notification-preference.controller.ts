import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationPreferenceService } from '../service/notification-preference.service';
import { CreateNotificationPreferenceDto, UpdateNotificationPreferenceDto, NotificationPreferenceResponseDto } from '../dto/notification-preference.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Notification Preferences')
@Controller('notification-preferences')
export class NotificationPreferenceController {
  constructor(private readonly notificationPreferenceService: NotificationPreferenceService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification preference' })
  @ApiResponse({ status: 201, description: 'Preference created successfully', type: NotificationPreferenceResponseDto })
  async create(@Body() dto: CreateNotificationPreferenceDto): Promise<NotificationPreferenceResponseDto> {
    return this.notificationPreferenceService.create(dto);
  }

  @Put('user/:userId')
  @ApiOperation({ summary: 'Update notification preference' })
  @ApiResponse({ status: 200, description: 'Preference updated successfully', type: NotificationPreferenceResponseDto })
  async update(@Param('userId') userId: string, @Body() dto: UpdateNotificationPreferenceDto): Promise<NotificationPreferenceResponseDto> {
    return this.notificationPreferenceService.update(userId, dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notification preference by user' })
  @ApiResponse({ status: 200, description: 'Preference retrieved successfully', type: NotificationPreferenceResponseDto })
  async findByUserId(@Param('userId') userId: string): Promise<NotificationPreferenceResponseDto> {
    return this.notificationPreferenceService.getOrCreate(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification preference by ID' })
  @ApiResponse({ status: 200, description: 'Preference retrieved successfully', type: NotificationPreferenceResponseDto })
  async findById(@Param('id') id: string): Promise<NotificationPreferenceResponseDto> {
    return this.notificationPreferenceService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification preferences' })
  @ApiResponse({ status: 200, description: 'Preferences retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationPreferenceService.findAll(filter, { ...pagination, ...sort });
  }
}
