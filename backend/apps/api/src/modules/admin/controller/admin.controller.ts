import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from '../service/admin.service';
import { UserModerationDto, SuspendUserDto, ReactivateUserDto, DeleteUserDto } from '../dto/user-moderation.dto';
import { ApprovePropertyDto, RejectPropertyDto } from '../dto/property-moderation.dto';
import { PaginationDto, SortDto, FilterDto } from '../dto/pagination.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users/moderate')
  @ApiOperation({ summary: 'Moderate user account' })
  @ApiResponse({ status: 200, description: 'User moderated successfully' })
  async moderateUser(@Body() dto: UserModerationDto): Promise<any> {
    return this.adminService.performAdminAction(
      'admin-id',
      'SUPER_ADMIN',
      dto.action,
      'USER',
      dto.userId,
      dto.reason,
    );
  }

  @Post('users/suspend')
  @ApiOperation({ summary: 'Suspend user account' })
  @ApiResponse({ status: 200, description: 'User suspended successfully' })
  async suspendUser(@Body() dto: SuspendUserDto): Promise<any> {
    return this.adminService.performAdminAction(
      'admin-id',
      'SUPPORT_ADMIN',
      'SUSPEND_USER',
      'USER',
      dto.userId,
      dto.reason,
    );
  }

  @Post('users/reactivate')
  @ApiOperation({ summary: 'Reactivate user account' })
  @ApiResponse({ status: 200, description: 'User reactivated successfully' })
  async reactivateUser(@Body() dto: ReactivateUserDto): Promise<any> {
    return this.adminService.performAdminAction(
      'admin-id',
      'SUPPORT_ADMIN',
      'REACTIVATE_USER',
      'USER',
      dto.userId,
      dto.reason,
    );
  }

  @Post('users/remove')
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Body() dto: DeleteUserDto): Promise<any> {
    return this.adminService.performAdminAction(
      'admin-id',
      'SUPER_ADMIN',
      'DELETE_USER',
      'USER',
      dto.userId,
      dto.reason,
    );
  }

  @Post('properties/approve')
  @ApiOperation({ summary: 'Approve property' })
  @ApiResponse({ status: 200, description: 'Property approved successfully' })
  async approveProperty(@Body() dto: ApprovePropertyDto): Promise<any> {
    return this.adminService.performAdminAction(
      'admin-id',
      'SUPPORT_ADMIN',
      'APPROVE_PROPERTY',
      'PROPERTY',
      dto.propertyId,
      'Approved by admin',
    );
  }

  @Post('properties/reject')
  @ApiOperation({ summary: 'Reject property' })
  @ApiResponse({ status: 200, description: 'Property rejected successfully' })
  async rejectProperty(@Body() dto: RejectPropertyDto): Promise<any> {
    return this.adminService.performAdminAction(
      'admin-id',
      'SUPPORT_ADMIN',
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
