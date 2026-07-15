import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SMSNotificationService } from '../service/sms-notification.service';
import { CreateSMSNotificationDto, SMSNotificationResponseDto } from '../dto/sms-notification.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('SMS Notifications')
@Controller('sms-notifications')
export class SMSNotificationController {
  constructor(private readonly smsNotificationService: SMSNotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create SMS notification' })
  @ApiResponse({ status: 201, description: 'SMS notification created successfully', type: SMSNotificationResponseDto })
  async create(@Body() dto: CreateSMSNotificationDto): Promise<SMSNotificationResponseDto> {
    return this.smsNotificationService.create(dto);
  }

  @Put(':id/send')
  @ApiOperation({ summary: 'Send SMS notification' })
  @ApiResponse({ status: 200, description: 'SMS sent successfully' })
  async send(@Param('id') id: string): Promise<any> {
    return this.smsNotificationService.send(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get SMS notification by ID' })
  @ApiResponse({ status: 200, description: 'SMS notification retrieved successfully', type: SMSNotificationResponseDto })
  async findById(@Param('id') id: string): Promise<SMSNotificationResponseDto> {
    return this.smsNotificationService.findById(id);
  }

  @Get('notification/:notificationId')
  @ApiOperation({ summary: 'Get SMS notifications by notification ID' })
  @ApiResponse({ status: 200, description: 'SMS notifications retrieved successfully' })
  async findByNotificationId(
    @Param('notificationId') notificationId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.smsNotificationService.findByNotificationId(notificationId, { ...pagination, ...sort });
  }

  @Get('to/:to')
  @ApiOperation({ summary: 'Get SMS notifications by recipient' })
  @ApiResponse({ status: 200, description: 'SMS notifications retrieved successfully' })
  async findByTo(
    @Param('to') to: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.smsNotificationService.findByTo(to, { ...pagination, ...sort });
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get SMS notifications by status' })
  @ApiResponse({ status: 200, description: 'SMS notifications retrieved successfully' })
  async findByStatus(
    @Param('status') status: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.smsNotificationService.findByStatus(status, { ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all SMS notifications' })
  @ApiResponse({ status: 200, description: 'SMS notifications retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.smsNotificationService.findAll(filter, { ...pagination, ...sort });
  }
}
