import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from '../service/notification.service';
import { CreateNotificationDto, NotificationResponseDto, NotificationDetailsDto } from '../dto/notification.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully', type: NotificationResponseDto })
  async create(@Body() dto: CreateNotificationDto): Promise<NotificationResponseDto> {
    return this.notificationService.create(dto);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read', type: NotificationResponseDto })
  async markAsRead(@Param('id') id: string): Promise<NotificationResponseDto> {
    return this.notificationService.markAsRead(id);
  }

  @Put(':id/dismiss')
  @ApiOperation({ summary: 'Dismiss notification' })
  @ApiResponse({ status: 200, description: 'Notification dismissed', type: NotificationResponseDto })
  async dismiss(@Param('id') id: string): Promise<NotificationResponseDto> {
    return this.notificationService.markAsDismissed(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification retrieved successfully', type: NotificationDetailsDto })
  async findById(@Param('id') id: string): Promise<NotificationDetailsDto> {
    return this.notificationService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications by user' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationService.findByUserId(userId, { ...pagination, ...sort });
  }

  @Get('user/:userId/unread')
  @ApiOperation({ summary: 'Get unread notifications' })
  @ApiResponse({ status: 200, description: 'Unread notifications retrieved successfully' })
  async findUnread(
    @Param('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationService.findUnread(userId, { ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationService.findAll(filter, { ...pagination, ...sort });
  }
}
