import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../service/admin.service';
import { UserModerationDto, SuspendUserDto, ReactivateUserDto } from '../dto/user-moderation.dto';
import { ApprovePropertyDto, RejectPropertyDto } from '../dto/property-moderation.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users/moderate')
  @ApiOperation({ summary: 'Moderate user account' })
  @ApiResponse({ status: 200, description: 'User moderated successfully' })
  async moderateUser(@User('id') adminId: string, @User('role') adminRole: string, @Body() dto: UserModerationDto): Promise<any> {
    return this.adminService.performAdminAction(
      adminId,
      adminRole,
      dto.action,
      'USER',
      dto.userId,
      dto.reason,
    );
  }

  @Post('users/suspend')
  @ApiOperation({ summary: 'Suspend user account' })
  @ApiResponse({ status: 200, description: 'User suspended successfully' })
  async suspendUser(@User('id') adminId: string, @User('role') adminRole: string, @Body() dto: SuspendUserDto): Promise<any> {
    return this.adminService.performAdminAction(
      adminId,
      adminRole,
      'SUSPEND_USER',
      'USER',
      dto.userId,
      dto.reason,
    );
  }

  @Post('users/reactivate')
  @ApiOperation({ summary: 'Reactivate user account' })
  @ApiResponse({ status: 200, description: 'User reactivated successfully' })
  async reactivateUser(@User('id') adminId: string, @User('role') adminRole: string, @Body() dto: ReactivateUserDto): Promise<any> {
    return this.adminService.performAdminAction(
      adminId,
      adminRole,
      'REACTIVATE_USER',
      'USER',
      dto.userId,
      dto.reason,
    );
  }


  @Post('properties/approve')
  @ApiOperation({ summary: 'Approve property' })
  @ApiResponse({ status: 200, description: 'Property approved successfully' })
  async approveProperty(@User('id') adminId: string, @User('role') adminRole: string, @Body() dto: ApprovePropertyDto): Promise<any> {
    return this.adminService.performAdminAction(
      adminId,
      adminRole,
      'APPROVE_PROPERTY',
      'PROPERTY',
      dto.propertyId,
      'Approved by admin',
    );
  }

  @Post('properties/reject')
  @ApiOperation({ summary: 'Reject property' })
  @ApiResponse({ status: 200, description: 'Property rejected successfully' })
  async rejectProperty(@User('id') adminId: string, @User('role') adminRole: string, @Body() dto: RejectPropertyDto): Promise<any> {
    return this.adminService.performAdminAction(
      adminId,
      adminRole,
      'REJECT_PROPERTY',
      'PROPERTY',
      dto.propertyId,
      dto.reason,
    );
  }

  @Get('actions/:adminId')
  @ApiOperation({ summary: 'Get admin actions' })
  @ApiResponse({ status: 200, description: 'Admin actions retrieved successfully' })
  async getAdminActions(
    @Param('adminId') adminId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.adminService.getAdminActions(adminId, { ...pagination, ...sort });
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get audit logs' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  async getAuditLogs(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.adminService.getAuditLogs(filter, { ...pagination, ...sort });
  }

  @Get('activity-logs')
  @ApiOperation({ summary: 'Get activity logs' })
  @ApiResponse({ status: 200, description: 'Activity logs retrieved successfully' })
  async getActivityLogs(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
  ): Promise<any> {
    return this.adminService.getActivityLogs(filter, { ...pagination, ...sort });
  }
}
