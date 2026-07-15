import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivityService } from '../service/activity.service';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Activity Logs')
@Controller('activity-logs')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get activity log by ID' })
  @ApiResponse({ status: 200, description: 'Activity log retrieved successfully' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.activityService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get activity logs by user ID' })
  @ApiResponse({ status: 200, description: 'Activity logs retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.activityService.findByUserId(userId, { ...pagination, ...sort });
  }

  @Get('action/:action')
  @ApiOperation({ summary: 'Get activity logs by action' })
  @ApiResponse({ status: 200, description: 'Activity logs retrieved successfully' })
  async findByAction(
    @Param('action') action: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.activityService.findByAction(action, { ...pagination, ...sort });
  }

  @Get('request/:requestId')
  @ApiOperation({ summary: 'Get activity logs by request ID' })
  @ApiResponse({ status: 200, description: 'Activity logs retrieved successfully' })
  async findByRequestId(@Param('requestId') requestId: string): Promise<any> {
    return this.activityService.findByRequestId(requestId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity logs' })
  @ApiResponse({ status: 200, description: 'Activity logs retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.activityService.findAll(filter, { ...pagination, ...sort });
  }
}
