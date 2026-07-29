import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BuyerService } from '../../buyer/service/buyer.service';
import { BuyerGuard } from '../../../common/guards/buyer.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Buyer')
@ApiBearerAuth()
@Controller('buyer')
@UseGuards(JwtAuthGuard, BuyerGuard)
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get buyer dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@User('id') userId: string) {
    return this.buyerService.getDashboard(userId);
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get property recommendations' })
  @ApiResponse({ status: 200, description: 'Recommendations retrieved successfully' })
  async getRecommendations(@User('id') userId: string) {
    return this.buyerService.getRecommendations(userId);
  }

  @Get('saved-properties')
  @ApiOperation({ summary: 'Get saved properties' })
  @ApiResponse({ status: 200, description: 'Saved properties retrieved successfully' })
  async getSavedProperties(@User('id') userId: string) {
    return this.buyerService.getSavedProperties(userId);
  }

  @Post('saved-properties')
  @ApiOperation({ summary: 'Save property' })
  @ApiResponse({ status: 201, description: 'Property saved successfully' })
  async saveProperty(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.saveProperty(userId, dto);
  }

  @Get('offers')
  @ApiOperation({ summary: 'Get buyer offers' })
  @ApiResponse({ status: 200, description: 'Offers retrieved successfully' })
  async getOffers(@User('id') userId: string) {
    return this.buyerService.getOffers(userId);
  }

  @Post('offers')
  @ApiOperation({ summary: 'Create property offer' })
  @ApiResponse({ status: 201, description: 'Offer created successfully' })
  async createOffer(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.createOffer(userId, dto);
  }

  @Get('comparisons')
  @ApiOperation({ summary: 'Get property comparisons' })
  @ApiResponse({ status: 200, description: 'Comparisons retrieved successfully' })
  async getComparisons(@User('id') userId: string) {
    return this.buyerService.getComparisons(userId);
  }

  @Get('inspections')
  @ApiOperation({ summary: 'Get inspection bookings' })
  @ApiResponse({ status: 200, description: 'Inspections retrieved successfully' })
  async getInspections(@User('id') userId: string) {
    return this.buyerService.getInspections(userId);
  }

  @Post('inspections')
  @ApiOperation({ summary: 'Book property inspection' })
  @ApiResponse({ status: 201, description: 'Inspection booked successfully' })
  async bookInspection(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.bookInspection(userId, dto);
  }
}
