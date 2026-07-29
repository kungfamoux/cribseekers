import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DeveloperService } from '../../developer/service/developer.service';
import { DeveloperGuard } from '../../../common/guards/developer.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Developer')
@ApiBearerAuth()
@Controller('developer')
@UseGuards(JwtAuthGuard, DeveloperGuard)
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get developer dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@User('id') userId: string) {
    return this.developerService.getDashboard(userId);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get developer projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  async getProjects(@User('id') userId: string) {
    return this.developerService.getProjects(userId);
  }

  @Post('projects')
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  async createProject(@User('id') userId: string, @Body() dto: any) {
    return this.developerService.createProject(userId, dto);
  }

  @Get('units')
  @ApiOperation({ summary: 'Get developer units' })
  @ApiResponse({ status: 200, description: 'Units retrieved successfully' })
  async getUnits(@User('id') userId: string) {
    return this.developerService.getUnits(userId);
  }

  @Get('sales')
  @ApiOperation({ summary: 'Get developer sales' })
  @ApiResponse({ status: 200, description: 'Sales retrieved successfully' })
  async getSales(@User('id') userId: string) {
    return this.developerService.getSales(userId);
  }

  @Get('reservations')
  @ApiOperation({ summary: 'Get developer reservations' })
  @ApiResponse({ status: 200, description: 'Reservations retrieved successfully' })
  async getReservations(@User('id') userId: string) {
    return this.developerService.getReservations(userId);
  }

  @Get('construction')
  @ApiOperation({ summary: 'Get construction progress' })
  @ApiResponse({ status: 200, description: 'Construction progress retrieved successfully' })
  async getConstructionProgress(@User('id') userId: string) {
    return this.developerService.getConstructionProgress(userId);
  }
}
