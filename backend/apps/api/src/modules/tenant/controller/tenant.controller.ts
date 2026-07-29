import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TenantService } from '../../tenant/service/tenant.service';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Tenant')
@ApiBearerAuth()
@Controller('tenant')
@UseGuards(JwtAuthGuard, TenantGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get tenant dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@User('id') userId: string) {
    return this.tenantService.getDashboard(userId);
  }

  @Get('leases')
  @ApiOperation({ summary: 'Get tenant leases' })
  @ApiResponse({ status: 200, description: 'Leases retrieved successfully' })
  async getLeases(@User('id') userId: string) {
    return this.tenantService.getLeases(userId);
  }

  @Post('applications')
  @ApiOperation({ summary: 'Submit rental application' })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
  async submitApplication(@User('id') userId: string, @Body() dto: any) {
    return this.tenantService.submitApplication(userId, dto);
  }

  @Get('applications')
  @ApiOperation({ summary: 'Get tenant applications' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  async getApplications(@User('id') userId: string) {
    return this.tenantService.getApplications(userId);
  }

  @Post('maintenance')
  @ApiOperation({ summary: 'Submit maintenance request' })
  @ApiResponse({ status: 201, description: 'Maintenance request submitted successfully' })
  async submitMaintenance(@User('id') userId: string, @Body() dto: any) {
    return this.tenantService.submitMaintenance(userId, dto);
  }

  @Get('maintenance')
  @ApiOperation({ summary: 'Get maintenance requests' })
  @ApiResponse({ status: 200, description: 'Maintenance requests retrieved successfully' })
  async getMaintenanceRequests(@User('id') userId: string) {
    return this.tenantService.getMaintenanceRequests(userId);
  }

  @Get('payments')
  @ApiOperation({ summary: 'Get rent payments' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
  async getPayments(@User('id') userId: string) {
    return this.tenantService.getPayments(userId);
  }

  @Get('inspections')
  @ApiOperation({ summary: 'Get inspection bookings' })
  @ApiResponse({ status: 200, description: 'Inspections retrieved successfully' })
  async getInspections(@User('id') userId: string) {
    return this.tenantService.getInspections(userId);
  }
}
