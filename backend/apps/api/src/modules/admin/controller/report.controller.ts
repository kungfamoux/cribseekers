import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReportService } from '../service/report.service';
import { CreateReportDto, UpdateReportStatusDto, ReportResponseDto } from '../dto/report.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create report' })
  @ApiResponse({ status: 201, description: 'Report created successfully', type: ReportResponseDto })
  async create(@Body() dto: CreateReportDto): Promise<ReportResponseDto> {
    return this.reportService.create(dto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update report status' })
  @ApiResponse({ status: 200, description: 'Report status updated successfully', type: ReportResponseDto })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateReportStatusDto): Promise<ReportResponseDto> {
    return this.reportService.updateStatus(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report retrieved successfully', type: ReportResponseDto })
  async findById(@Param('id') id: string): Promise<ReportResponseDto> {
    return this.reportService.findById(id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get reports by category' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.reportService.findByCategory(categoryId, { ...pagination, ...sort });
  }

  @Get('reported-by/:reportedBy')
  @ApiOperation({ summary: 'Get reports by reporter' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findByReportedBy(
    @Param('reportedBy') reportedBy: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.reportService.findByReportedBy(reportedBy, { ...pagination, ...sort });
  }

  @Get('entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Get reports by entity' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.reportService.findByEntity(entityType, entityId, { ...pagination, ...sort });
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get reports by status' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findByStatus(
    @Param('status') status: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.reportService.findByStatus(status, { ...pagination, ...sort });
  }

  @Get('assigned/:assignedTo')
  @ApiOperation({ summary: 'Get reports by assignee' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findByAssignedTo(
    @Param('assignedTo') assignedTo: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.reportService.findByAssignedTo(assignedTo, { ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.reportService.findAll(filter, { ...pagination, ...sort });
  }
}
