import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PushNotificationService } from '../service/push-notification.service';
import { CreatePushSubscriptionDto, UpdatePushSubscriptionDto, PushSubscriptionResponseDto } from '../dto/push-subscription.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Push Subscriptions')
@Controller('push-subscriptions')
export class PushSubscriptionController {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create push subscription' })
  @ApiResponse({ status: 201, description: 'Push subscription created successfully', type: PushSubscriptionResponseDto })
  async create(@Body() dto: CreatePushSubscriptionDto): Promise<PushSubscriptionResponseDto> {
    return this.pushNotificationService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update push subscription' })
  @ApiResponse({ status: 200, description: 'Push subscription updated successfully', type: PushSubscriptionResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdatePushSubscriptionDto): Promise<PushSubscriptionResponseDto> {
    return this.pushNotificationService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete push subscription' })
  @ApiResponse({ status: 200, description: 'Push subscription deleted successfully', type: PushSubscriptionResponseDto })
  async delete(@Param('id') id: string): Promise<PushSubscriptionResponseDto> {
    return this.pushNotificationService.delete(id);
  }

  @Post('user/:userId/send')
  @ApiOperation({ summary: 'Send push notification to user' })
  @ApiResponse({ status: 200, description: 'Push notification sent successfully' })
  async sendToUser(@Param('userId') userId: string, @Body('payload') payload: any): Promise<any> {
    return this.pushNotificationService.sendToUser(userId, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get push subscription by ID' })
  @ApiResponse({ status: 200, description: 'Push subscription retrieved successfully', type: PushSubscriptionResponseDto })
  async findById(@Param('id') id: string): Promise<PushSubscriptionResponseDto> {
    return this.pushNotificationService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get push subscriptions by user' })
  @ApiResponse({ status: 200, description: 'Push subscriptions retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.pushNotificationService.findByUserId(userId, { ...pagination, ...sort });
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active push subscriptions' })
  @ApiResponse({ status: 200, description: 'Active push subscriptions retrieved successfully' })
  async findActive(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.pushNotificationService.findActive({ ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all push subscriptions' })
  @ApiResponse({ status: 200, description: 'Push subscriptions retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.pushNotificationService.findAll(filter, { ...pagination, ...sort });
  }
}
