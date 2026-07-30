import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
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

  @Get('saved')
  @ApiOperation({ summary: 'Get saved properties (frontend alias)' })
  @ApiResponse({ status: 200, description: 'Saved properties retrieved successfully' })
  async getSaved(@User('id') userId: string) {
    return this.buyerService.getSavedProperties(userId);
  }

  @Post('saved')
  @ApiOperation({ summary: 'Save property (frontend alias)' })
  @ApiResponse({ status: 201, description: 'Property saved successfully' })
  async savePropertyAlias(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.saveProperty(userId, dto);
  }

  @Delete('saved/:id')
  @ApiOperation({ summary: 'Remove saved property' })
  @ApiResponse({ status: 200, description: 'Property removed successfully' })
  async removeSavedProperty(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.removeSavedProperty(userId, dto);
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

  @Get('wallet')
  @ApiOperation({ summary: 'Get buyer wallet' })
  @ApiResponse({ status: 200, description: 'Wallet retrieved successfully' })
  async getWallet(@User('id') userId: string) {
    return this.buyerService.getWallet(userId);
  }

  @Post('wallet/fund')
  @ApiOperation({ summary: 'Fund wallet' })
  @ApiResponse({ status: 200, description: 'Wallet funded successfully' })
  async fundWallet(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.fundWallet(userId, dto);
  }

  @Get('wallet/transactions')
  @ApiOperation({ summary: 'Get wallet transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  async getTransactions(@User('id') userId: string) {
    return this.buyerService.getTransactions(userId);
  }

  @Get('escrow')
  @ApiOperation({ summary: 'Get escrow transactions' })
  @ApiResponse({ status: 200, description: 'Escrow transactions retrieved successfully' })
  async getEscrowTransactions(@User('id') userId: string) {
    return this.buyerService.getEscrowTransactions(userId);
  }

  @Post('escrow')
  @ApiOperation({ summary: 'Initiate escrow' })
  @ApiResponse({ status: 201, description: 'Escrow initiated successfully' })
  async initiateEscrow(@User('id') userId: string, @Body() dto: any) {
    return this.buyerService.initiateEscrow(userId, dto);
  }

  @Get('messages')
  @ApiOperation({ summary: 'Get buyer messages' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  async getMessages(@User('id') userId: string) {
    return this.buyerService.getMessages(userId);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get buyer notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async getNotifications(@User('id') userId: string) {
    return this.buyerService.getNotifications(userId);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get buyer profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@User('id') userId: string) {
    return this.buyerService.getProfile(userId);
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get buyer settings' })
  @ApiResponse({ status: 200, description: 'Settings retrieved successfully' })
  async getSettings(@User('id') userId: string) {
    return this.buyerService.getSettings(userId);
  }
}
