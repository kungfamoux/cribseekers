import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AgentService } from '../../agent/service/agent.service';
import { AgentGuard } from '../../../common/guards/agent.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Agent')
@ApiBearerAuth()
@Controller('agent')
@UseGuards(JwtAuthGuard, AgentGuard)
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get agent dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@User('id') userId: string) {
    return this.agentService.getDashboard(userId);
  }

  @Get('listings')
  @ApiOperation({ summary: 'Get agent listings' })
  @ApiResponse({ status: 200, description: 'Listings retrieved successfully' })
  async getListings(@User('id') userId: string) {
    return this.agentService.getListings(userId);
  }

  @Get('leads')
  @ApiOperation({ summary: 'Get agent leads' })
  @ApiResponse({ status: 200, description: 'Leads retrieved successfully' })
  async getLeads(@User('id') userId: string) {
    return this.agentService.getLeads(userId);
  }

  @Get('clients')
  @ApiOperation({ summary: 'Get agent clients' })
  @ApiResponse({ status: 200, description: 'Clients retrieved successfully' })
  async getClients(@User('id') userId: string) {
    return this.agentService.getClients(userId);
  }

  @Get('commissions')
  @ApiOperation({ summary: 'Get agent commissions' })
  @ApiResponse({ status: 200, description: 'Commissions retrieved successfully' })
  async getCommissions(@User('id') userId: string) {
    return this.agentService.getCommissions(userId);
  }

  @Get('appointments')
  @ApiOperation({ summary: 'Get agent appointments' })
  @ApiResponse({ status: 200, description: 'Appointments retrieved successfully' })
  async getAppointments(@User('id') userId: string) {
    return this.agentService.getAppointments(userId);
  }

  @Post('appointments')
  @ApiOperation({ summary: 'Create appointment' })
  @ApiResponse({ status: 201, description: 'Appointment created successfully' })
  async createAppointment(@User('id') userId: string, @Body() dto: any) {
    return this.agentService.createAppointment(userId, dto);
  }

  @Get('deals')
  @ApiOperation({ summary: 'Get agent deals' })
  @ApiResponse({ status: 200, description: 'Deals retrieved successfully' })
  async getDeals(@User('id') userId: string) {
    return this.agentService.getDeals(userId);
  }

  @Get('wallet')
  @ApiOperation({ summary: 'Get agent wallet' })
  @ApiResponse({ status: 200, description: 'Wallet retrieved successfully' })
  async getWallet(@User('id') userId: string) {
    return this.agentService.getWallet(userId);
  }

  @Get('properties')
  @ApiOperation({ summary: 'Get agent properties' })
  @ApiResponse({ status: 200, description: 'Properties retrieved successfully' })
  async getProperties(@User('id') userId: string) {
    return this.agentService.getProperties(userId);
  }

  @Get('messages')
  @ApiOperation({ summary: 'Get agent messages' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  async getMessages(@User('id') userId: string) {
    return this.agentService.getMessages(userId);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get agent notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async getNotifications(@User('id') userId: string) {
    return this.agentService.getNotifications(userId);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get agent profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@User('id') userId: string) {
    return this.agentService.getProfile(userId);
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get agent settings' })
  @ApiResponse({ status: 200, description: 'Settings retrieved successfully' })
  async getSettings(@User('id') userId: string) {
    return this.agentService.getSettings(userId);
  }
}
