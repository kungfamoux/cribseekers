import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InspectionReminderService } from '../service/inspection-reminder.service';
import { ReminderDto } from '../dto/reminder.dto';
import { InspectionPaginationDto } from '../dto/inspection-pagination.dto';

@ApiTags('Inspection Reminders')
@Controller('inspections/:inspectionId/reminders')
export class InspectionReminderController {
  constructor(private readonly reminderService: InspectionReminderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reminder for inspection' })
  @ApiResponse({ status: 201, description: 'Reminder created successfully' })
  async create(@Param('inspectionId') inspectionId: string, @Body() dto: ReminderDto) {
    dto.inspectionId = inspectionId;
    return this.reminderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get reminders for an inspection' })
  @ApiResponse({ status: 200, description: 'Reminders retrieved successfully' })
  async findByInspectionId(@Param('inspectionId') inspectionId: string, @Query() pagination: InspectionPaginationDto) {
    return this.reminderService.findByInspectionId(inspectionId, pagination);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get reminders for a user' })
  @ApiResponse({ status: 200, description: 'Reminders retrieved successfully' })
  async findByUserId(@Param('userId') userId: string, @Query() pagination: InspectionPaginationDto) {
    return this.reminderService.findByUserId(userId, pagination);
  }

  @Post('send-pending')
  @ApiOperation({ summary: 'Send all pending reminders' })
  @ApiResponse({ status: 200, description: 'Pending reminders sent successfully' })
  async sendPending(): Promise<void> {
    return this.reminderService.sendPendingReminders();
  }
}
