import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InspectionService } from '../service/inspection.service';
import { CreateInspectionDto } from '../dto/create-inspection.dto';
import { InspectionPaginationDto } from '../dto/inspection-pagination.dto';
import { CancelInspectionDto } from '../dto/cancel-inspection.dto';
import { RescheduleInspectionDto } from '../dto/reschedule-inspection.dto';
import { AssignParticipantDto } from '../dto/assign-participant.dto';
import { InspectionMapper } from '../mappers/inspection.mapper';

@ApiTags('Inspections')
@Controller('inspections')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inspection request' })
  @ApiResponse({ status: 201, description: 'Inspection created successfully' })
  async create(@Body() dto: CreateInspectionDto, @Body('userId') userId: string) {
    const inspection = await this.inspectionService.create(dto, userId);
    return InspectionMapper.toResponseDto(inspection);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inspection by ID' })
  @ApiResponse({ status: 200, description: 'Inspection retrieved successfully' })
  async findById(@Param('id') id: string) {
    const inspection = await this.inspectionService.findById(id);
    return InspectionMapper.toResponseDto(inspection);
  }

  @Get('property/:propertyId')
  @ApiOperation({ summary: 'Get inspections by property ID' })
  @ApiResponse({ status: 200, description: 'Inspections retrieved successfully' })
  async findByPropertyId(
    @Param('propertyId') propertyId: string,
    @Query() pagination: InspectionPaginationDto,
  ) {
    const result = await this.inspectionService.findByPropertyId(propertyId, pagination);
    return {
      data: result.data.map((i: any) => InspectionMapper.toSummaryDto(i)),
      meta: result.meta,
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get inspections by requesting user' })
  @ApiResponse({ status: 200, description: 'Inspections retrieved successfully' })
  async findByRequestedBy(
    @Param('userId') userId: string,
    @Query() pagination: InspectionPaginationDto,
  ) {
    const result = await this.inspectionService.findByRequestedBy(userId, pagination);
    return {
      data: result.data.map((i: any) => InspectionMapper.toSummaryDto(i)),
      meta: result.meta,
    };
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Confirm an inspection' })
  @ApiResponse({ status: 200, description: 'Inspection confirmed successfully' })
  async confirm(@Param('id') id: string, @Body('userId') userId: string) {
    const inspection = await this.inspectionService.confirm(id, userId);
    return InspectionMapper.toResponseDto(inspection);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel an inspection' })
  @ApiResponse({ status: 200, description: 'Inspection cancelled successfully' })
  async cancel(@Param('id') id: string, @Body() dto: CancelInspectionDto, @Body('userId') userId: string) {
    const inspection = await this.inspectionService.cancel(id, dto.reason, userId);
    return InspectionMapper.toResponseDto(inspection);
  }

  @Post(':id/reschedule')
  @ApiOperation({ summary: 'Reschedule an inspection' })
  @ApiResponse({ status: 200, description: 'Inspection rescheduled successfully' })
  async reschedule(@Param('id') id: string, @Body() dto: RescheduleInspectionDto, @Body('userId') userId: string) {
    const inspection = await this.inspectionService.reschedule(id, dto.newScheduledAt, dto.notes || '', userId);
    return InspectionMapper.toResponseDto(inspection);
  }

  @Post(':id/participants')
  @ApiOperation({ summary: 'Add participant to inspection' })
  @ApiResponse({ status: 201, description: 'Participant added successfully' })
  async addParticipant(@Param('id') id: string, @Body() dto: AssignParticipantDto, @Body('addedBy') addedBy: string) {
    return this.inspectionService.addParticipant(id, dto.userId, dto.role, addedBy);
  }
}
