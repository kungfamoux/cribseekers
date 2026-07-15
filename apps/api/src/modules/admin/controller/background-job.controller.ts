import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BackgroundJobService } from '../service/background-job.service';
import { CreateBackgroundJobDto, BackgroundJobResponseDto } from '../dto/background-job.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Background Jobs')
@Controller('background-jobs')
export class BackgroundJobController {
  constructor(private readonly backgroundJobService: BackgroundJobService) {}

  @Post()
  @ApiOperation({ summary: 'Create background job' })
  @ApiResponse({ status: 201, description: 'Background job created successfully', type: BackgroundJobResponseDto })
  async create(@Body() dto: CreateBackgroundJobDto): Promise<BackgroundJobResponseDto> {
    return this.backgroundJobService.create(dto);
  }

  @Put(':id/start')
  @ApiOperation({ summary: 'Start background job' })
  @ApiResponse({ status: 200, description: 'Background job started successfully', type: BackgroundJobResponseDto })
  async start(@Param('id') id: string): Promise<BackgroundJobResponseDto> {
    return this.backgroundJobService.start(id);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Complete background job' })
  @ApiResponse({ status: 200, description: 'Background job completed successfully', type: BackgroundJobResponseDto })
  async complete(@Param('id') id: string): Promise<BackgroundJobResponseDto> {
    return this.backgroundJobService.complete(id);
  }

  @Put(':id/fail')
  @ApiOperation({ summary: 'Fail background job' })
  @ApiResponse({ status: 200, description: 'Background job failed successfully', type: BackgroundJobResponseDto })
  async fail(@Param('id') id: string, @Body('error') error: string): Promise<BackgroundJobResponseDto> {
    return this.backgroundJobService.fail(id, error);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete background job' })
  @ApiResponse({ status: 200, description: 'Background job deleted successfully', type: BackgroundJobResponseDto })
  async delete(@Param('id') id: string): Promise<BackgroundJobResponseDto> {
    return this.backgroundJobService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get background job by ID' })
  @ApiResponse({ status: 200, description: 'Background job retrieved successfully', type: BackgroundJobResponseDto })
  async findById(@Param('id') id: string): Promise<BackgroundJobResponseDto> {
    return this.backgroundJobService.findById(id);
  }

  @Get('queue/:queue')
  @ApiOperation({ summary: 'Get background jobs by queue' })
  @ApiResponse({ status: 200, description: 'Background jobs retrieved successfully' })
  async findByQueue(
    @Param('queue') queue: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.backgroundJobService.findByQueue(queue, { ...pagination, ...sort });
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get background jobs by status' })
  @ApiResponse({ status: 200, description: 'Background jobs retrieved successfully' })
  async findByStatus(
    @Param('status') status: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.backgroundJobService.findByStatus(status, { ...pagination, ...sort });
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending background jobs' })
  @ApiResponse({ status: 200, description: 'Pending jobs retrieved successfully' })
  async findPendingJobs(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.backgroundJobService.findPendingJobs({ ...pagination, ...sort });
  }

  @Get('failed')
  @ApiOperation({ summary: 'Get failed background jobs' })
  @ApiResponse({ status: 200, description: 'Failed jobs retrieved successfully' })
  async findFailedJobs(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.backgroundJobService.findFailedJobs({ ...pagination, ...sort });
  }

  @Get()
  @ApiOperation({ summary: 'Get all background jobs' })
  @ApiResponse({ status: 200, description: 'Background jobs retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.backgroundJobService.findAll(filter, { ...pagination, ...sort });
  }
}
