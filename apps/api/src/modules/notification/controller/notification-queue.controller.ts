import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationQueueService } from '../service/notification-queue.service';
import { CreateNotificationQueueDto, NotificationQueueResponseDto } from '../dto/notification-queue.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Notification Queue')
@Controller('notification-queue')
export class NotificationQueueController {
  constructor(private readonly notificationQueueService: NotificationQueueService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification queue item' })
  @ApiResponse({ status: 201, description: 'Queue item created successfully', type: NotificationQueueResponseDto })
  async create(@Body() dto: CreateNotificationQueueDto): Promise<NotificationQueueResponseDto> {
    return this.notificationQueueService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update notification queue item' })
  @ApiResponse({ status: 200, description: 'Queue item updated successfully', type: NotificationQueueResponseDto })
  async update(@Param('id') id: string, @Body() dto: any): Promise<NotificationQueueResponseDto> {
    return this.notificationQueueService.update(id, dto);
  }

  @Put(':id/process')
  @ApiOperation({ summary: 'Process notification queue item' })
  @ApiResponse({ status: 200, description: 'Queue item processed successfully' })
  async process(@Param('id') id: string): Promise<any> {
    return this.notificationQueueService.update(id, { status: 'SENT', sentAt: new Date() });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification queue item by ID' })
  @ApiResponse({ status: 200, description: 'Queue item retrieved successfully', type: NotificationQueueResponseDto })
  async findById(@Param('id') id: string): Promise<NotificationQueueResponseDto> {
    return this.notificationQueueService.findById(id);
  }

  @Get('notification/:notificationId')
  @ApiOperation({ summary: 'Get queue items by notification' })
  @ApiResponse({ status: 200, description: 'Queue items retrieved successfully' })
  async findByNotificationId(
    @Param('notificationId') notificationId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationQueueService.findByNotificationId(notificationId, { ...pagination, ...sort });
  }

  @Get('channel/:channel')
  @ApiOperation({ summary: 'Get queue items by channel' })
  @ApiResponse({ status: 200, description: 'Queue items retrieved successfully' })
  async findByChannel(
    @Param('channel') channel: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationQueueService.findByChannel(channel, { ...pagination, ...sort });
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get queue items by status' })
  @ApiResponse({ status: 200, description: 'Queue items retrieved successfully' })
  async findByStatus(
    @Param('status') status: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationQueueService.findByStatus(status, { ...pagination, ...sort });
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending queue items' })
  @ApiResponse({ status: 200, description: 'Pending queue items retrieved successfully' })
  async findPending(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationQueueService.findPending({ ...pagination, ...sort });
  }

  @Get('failed')
  @ApiOperation({ summary: 'Get failed queue items' })
  @ApiResponse({ status: 200, description: 'Failed queue items retrieved successfully' })
  async findFailed(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationQueueService.findFailed({ ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification queue items' })
  @ApiResponse({ status: 200, description: 'Queue items retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.notificationQueueService.findAll(filter, { ...pagination, ...sort });
  }
}
