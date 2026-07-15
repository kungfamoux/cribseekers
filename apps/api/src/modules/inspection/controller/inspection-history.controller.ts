import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InspectionHistoryService } from '../service/inspection-history.service';
import { InspectionPaginationDto } from '../dto/inspection-pagination.dto';

@ApiTags('Inspection History')
@Controller('inspections/:inspectionId/history')
export class InspectionHistoryController {
  constructor(private readonly historyService: InspectionHistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get history for an inspection' })
  @ApiResponse({ status: 200, description: 'History retrieved successfully' })
  async findByInspectionId(@Param('inspectionId') inspectionId: string, @Query() pagination: InspectionPaginationDto) {
    return this.historyService.findByInspectionId(inspectionId, pagination);
  }

  @Get('performed-by/:userId')
  @ApiOperation({ summary: 'Get history performed by a user' })
  @ApiResponse({ status: 200, description: 'History retrieved successfully' })
  async findByPerformedBy(@Param('userId') userId: string, @Query() pagination: InspectionPaginationDto) {
    return this.historyService.findByPerformedBy(userId, pagination);
  }
}
