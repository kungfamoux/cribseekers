import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailNotificationService } from '../service/email-notification.service';
import { CreateEmailNotificationDto, EmailNotificationResponseDto } from '../dto/email-notification.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Email Notifications')
@Controller('email-notifications')
export class EmailNotificationController {
  constructor(private readonly emailNotificationService: EmailNotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create email notification' })
  @ApiResponse({ status: 201, description: 'Email notification created successfully', type: EmailNotificationResponseDto })
  async create(@Body() dto: CreateEmailNotificationDto): Promise<EmailNotificationResponseDto> {
    return this.emailNotificationService.create(dto);
  }

  @Put(':id/send')
  @ApiOperation({ summary: 'Send email notification' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  async send(@Param('id') id: string): Promise<any> {
    return this.emailNotificationService.send(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get email notification by ID' })
  @ApiResponse({ status: 200, description: 'Email notification retrieved successfully', type: EmailNotificationResponseDto })
  async findById(@Param('id') id: string): Promise<EmailNotificationResponseDto> {
    return this.emailNotificationService.findById(id);
  }

  @Get('notification/:notificationId')
  @ApiOperation({ summary: 'Get email notifications by notification ID' })
  @ApiResponse({ status: 200, description: 'Email notifications retrieved successfully' })
  async findByNotificationId(
    @Param('notificationId') notificationId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.emailNotificationService.findByNotificationId(notificationId, { ...pagination, ...sort });
  }

  @Get('to/:to')
  @ApiOperation({ summary: 'Get email notifications by recipient' })
  @ApiResponse({ status: 200, description: 'Email notifications retrieved successfully' })
  async findByTo(
    @Param('to') to: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.emailNotificationService.findByTo(to, { ...pagination, ...sort });
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get email notifications by status' })
  @ApiResponse({ status: 200, description: 'Email notifications retrieved successfully' })
  async findByStatus(
    @Param('status') status: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.emailNotificationService.findByStatus(status, { ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all email notifications' })
  @ApiResponse({ status: 200, description: 'Email notifications retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.emailNotificationService.findAll(filter, { ...pagination, ...sort });
  }
}
