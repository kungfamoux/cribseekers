import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LandlordService } from '../../landlord/service/landlord.service';
import { LandlordGuard } from '../../../common/guards/landlord.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Landlord')
@ApiBearerAuth()
@Controller('landlord')
@UseGuards(JwtAuthGuard, LandlordGuard)
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get landlord dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@User('id') userId: string) {
    return this.landlordService.getDashboard(userId);
  }

  @Get('properties')
  @ApiOperation({ summary: 'Get landlord properties' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  async getProperties(@User('id') userId: string) {
    return this.landlordService.getProperties(userId);
  }

  @Post('properties')
  @ApiOperation({ summary: 'Add new property' })
  @ApiResponse({ status: 201, description: 'Property added successfully' })
  async addProperty(@User('id') userId: string, @Body() dto: any) {
    return this.landlordService.addProperty(userId, dto);
  }

  @Put('properties/:id')
  @ApiOperation({ summary: 'Update property' })
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  async updateProperty(@User('id') userId: string, @Param('id') propertyId: string, @Body() dto: any) {
    return this.landlordService.updateProperty(userId, propertyId, dto);
  }

  @Delete('properties/:id')
  @ApiOperation({ summary: 'Delete property' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully' })
  async deleteProperty(@User('id') userId: string, @Param('id') propertyId: string) {
    return this.landlordService.deleteProperty(userId, propertyId);
  }

  @Get('tenants')
  @ApiOperation({ summary: 'Get landlord tenants' })
  @ApiResponse({ status: 200, description: 'Tenants retrieved successfully' })
  async getTenants(@User('id') userId: string) {
    return this.landlordService.getTenants(userId);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get landlord analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  async getAnalytics(@User('id') userId: string) {
    return this.landlordService.getAnalytics(userId);
  }

  @Get('rent-collection')
  @ApiOperation({ summary: 'Get rent collection data' })
  @ApiResponse({ status: 200, description: 'Rent collection data retrieved successfully' })
  async getRentCollection(@User('id') userId: string) {
    return this.landlordService.getRentCollection(userId);
  }

  @Get('maintenance')
  @ApiOperation({ summary: 'Get maintenance requests' })
  @ApiResponse({ status: 200, description: 'Maintenance requests retrieved successfully' })
  async getMaintenanceRequests(@User('id') userId: string) {
    return this.landlordService.getMaintenanceRequests(userId);
  }
}
