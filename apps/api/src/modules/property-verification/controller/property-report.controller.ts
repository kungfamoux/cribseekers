import { Controller, Post, Body, Get, Query, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PropertyReportService } from '../service/property-report.service';
import { PropertyReportDto } from '../dto/property-report.dto';
import { PaginationDto } from '../dto/pagination.dto';

@ApiTags('Property Reports')
@Controller('property-reports')
export class PropertyReportController {
  constructor(private readonly reportService: PropertyReportService) {}

  @Post()
  @ApiOperation({ summary: 'Report a property' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  async reportProperty(@Body() dto: PropertyReportDto): Promise<any> {
    return this.reportService.reportProperty(dto, 'current-user-id');
  }

  @Put(':reportId/review')
  @ApiOperation({ summary: 'Review a property report' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async reviewReport(
    @Param('reportId') reportId: string,
    @Body() body: { resolution: string },
  ): Promise<any> {
    return this.reportService.reviewReport(reportId, body.resolution, 'current-user-id');
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get reports for a property' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async getPropertyReports(
    @Param('propertyId') propertyId: string,
    @Query() pagination: PaginationDto,
  ): Promise<any> {
    return this.reportService.getPropertyReports(propertyId, pagination);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get reports by user' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async getUserReports(
    @Param('userId') userId: string,
    @Query() pagination: PaginationDto,
  ): Promise<any> {
    return this.reportService.getUserReports(userId, pagination);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending reports' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  async getPendingReports(@Query() pagination: PaginationDto): Promise<any> {
    return this.reportService.getPendingReports(pagination);
  }
}
