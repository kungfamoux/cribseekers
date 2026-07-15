import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuditService } from '../service/audit.service';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Audit Logs')
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get audit log by ID' })
  @ApiResponse({ status: 200, description: 'Audit log retrieved successfully' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.auditService.findById(id);
  }

  @Get('actor/:actorId')
  @ApiOperation({ summary: 'Get audit logs by actor ID' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async findByActorId(
    @Param('actorId') actorId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.auditService.findByActorId(actorId, { ...pagination, ...sort });
  }

  @Get('entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Get audit logs by entity' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async findByEntityType(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.auditService.findByEntityType(entityType, entityId, { ...pagination, ...sort });
  }

  @Get('action/:action')
  @ApiOperation({ summary: 'Get audit logs by action' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async findByAction(
    @Param('action') action: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.auditService.findByAction(action, { ...pagination, ...sort });
  }

  @Get('request/:requestId')
  @ApiOperation({ summary: 'Get audit logs by request ID' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async findByRequestId(@Param('requestId') requestId: string): Promise<any> {
    return this.auditService.findByRequestId(requestId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all audit logs' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async findAll(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.auditService.findAll(filter, { ...pagination, ...sort });
  }
}
