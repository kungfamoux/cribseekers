import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InspectionFeedbackService } from '../service/inspection-feedback.service';
import { InspectionFeedbackDto } from '../dto/inspection-feedback.dto';
import { InspectionPaginationDto } from '../dto/inspection-pagination.dto';

@ApiTags('Inspection Feedback')
@Controller('inspections/:inspectionId/feedback')
export class InspectionFeedbackController {
  constructor(private readonly feedbackService: InspectionFeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit feedback for an inspection' })
  @ApiResponse({ status: 201, description: 'Feedback submitted successfully' })
  async submit(@Param('inspectionId') inspectionId: string, @Body() dto: InspectionFeedbackDto, @Body('userId') userId: string) {
    dto.inspectionId = inspectionId;
    return this.feedbackService.submitFeedback(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get feedback for an inspection' })
  @ApiResponse({ status: 200, description: 'Feedback retrieved successfully' })
  async findByInspectionId(@Param('inspectionId') inspectionId: string) {
    return this.feedbackService.findByInspectionId(inspectionId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get feedback by user' })
  @ApiResponse({ status: 200, description: 'Feedback retrieved successfully' })
  async findByUserId(@Param('userId') userId: string, @Query() pagination: InspectionPaginationDto) {
    return this.feedbackService.findByUserId(userId, pagination);
  }
}
