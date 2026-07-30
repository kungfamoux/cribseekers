import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FinanceService } from '../service/finance.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateCommissionDto } from '../dto/commission.dto';
import { CreatePayoutDto, ApprovePayoutDto, RejectPayoutDto } from '../dto/payout.dto';

@ApiTags('Finance')
@Controller('finance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // ==================== REVENUE ENDPOINTS ====================

  @Get('revenue/today')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get today\'s revenue' })
  async getTodayRevenue() {
    return this.financeService.getTodayRevenue();
  }

  @Get('revenue/monthly')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get monthly revenue' })
  async getMonthlyRevenue() {
    return this.financeService.getMonthlyRevenue();
  }

  @Get('revenue/ytd')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get year to date revenue' })
  async getYTDRevenue() {
    // Implement YTD logic
    return this.financeService.getMonthlyRevenue();
  }

  @Get('revenue/by-source')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get revenue by source' })
  async getRevenueBySource() {
    return this.financeService.getRevenueBySource();
  }

  @Get('revenue/trends')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get revenue trends' })
  async getRevenueTrends() {
    // Implement trend logic
    return { daily: [], monthly: [], yearly: [] };
  }

  // ==================== COMMISSION ENDPOINTS ====================

  @Get('commissions/:agentId')
  @Roles('SUPER_ADMIN', 'AGENT')
  @ApiOperation({ summary: 'Get agent commissions' })
  async getAgentCommissions(@Param('agentId') agentId: string) {
    return this.financeService.getAgentCommissions(agentId);
  }

  @Get('commissions/pending')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get pending commissions' })
  async getPendingCommissions() {
    // Implement pending commissions logic
    return [];
  }

  @Post('commissions/calculate')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Calculate commission' })
  async calculateCommission(@Body() dto: CreateCommissionDto) {
    return this.financeService.createCommission(dto);
  }

  @Post('commissions/distribute')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Distribute commission' })
  async distributeCommission(@Body() dto: { transactionId: string; agentId: string; amount: number }) {
    return this.financeService.distributeCommission(dto.transactionId, dto.agentId, dto.amount);
  }

  // ==================== PLATFORM WALLET ENDPOINTS ====================

  @Get('platform-wallet/balance')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get platform wallet balance' })
  async getPlatformWalletBalance() {
    return this.financeService.getPlatformWalletBalance();
  }

  @Get('platform-wallet/transactions')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get platform wallet transactions' })
  async getPlatformWalletTransactions() {
    // Implement transactions logic
    return [];
  }

  @Post('platform-wallet/credit')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Credit platform wallet' })
  async creditPlatformWallet(@Body() dto: { amount: number; description: string }) {
    return this.financeService.creditPlatformWallet(dto.amount, dto.description);
  }

  @Post('platform-wallet/debit')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Debit platform wallet' })
  async debitPlatformWallet(@Body() dto: { amount: number; description: string }) {
    return this.financeService.debitPlatformWallet(dto.amount, dto.description);
  }

  // ==================== SETTLEMENT ENDPOINTS ====================

  @Post('settlements/inspection')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Process inspection settlement' })
  async processInspectionSettlement(@Body() dto: { inspectionId: string; paymentId: string }) {
    return this.financeService.processInspectionSettlement(dto.inspectionId, dto.paymentId);
  }

  @Post('settlements/escrow')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Process escrow settlement' })
  async processEscrowSettlement(@Body() dto: { escrowId: string; amount: number }) {
    return this.financeService.processEscrowSettlement(dto.escrowId, dto.amount);
  }

  @Get('settlements/pending')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get pending settlements' })
  async getPendingSettlements() {
    return this.financeService.getPendingSettlements();
  }

  @Get('settlements/:id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get settlement by ID' })
  async getSettlement(@Param('id') _id: string) {
    return this.financeService.createSettlement({} as any);
  }

  // ==================== PAYOUT ENDPOINTS ====================

  @Post('payouts/request')
  @Roles('AGENT')
  @ApiOperation({ summary: 'Request payout' })
  async requestPayout(@Body() dto: CreatePayoutDto) {
    return this.financeService.requestPayout(dto);
  }

  @Post('payouts/:id/approve')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Approve payout' })
  async approvePayout(@Param('id') _id: string, @Body() dto: ApprovePayoutDto) {
    return this.financeService.approvePayout(dto.payoutId, 'ADMIN_ID');
  }

  @Post('payouts/:id/reject')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Reject payout' })
  async rejectPayout(@Param('id') _id: string, @Body() dto: RejectPayoutDto) {
    return this.financeService.rejectPayout(dto.payoutId, dto.reason);
  }

  @Post('payouts/:id/process')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Process payout' })
  async processPayout(@Param('id') id: string) {
    return this.financeService.processPayout(id);
  }

  @Get('payouts/:id')
  @Roles('SUPER_ADMIN', 'AGENT')
  @ApiOperation({ summary: 'Get payout by ID' })
  async getPayout(@Param('id') id: string) {
    return this.financeService.getAgentPayouts(id);
  }

  @Get('payouts/agent/:agentId')
  @Roles('SUPER_ADMIN', 'AGENT')
  @ApiOperation({ summary: 'Get payouts by agent' })
  async getPayoutsByAgent(@Param('agentId') agentId: string) {
    return this.financeService.getAgentPayouts(agentId);
  }

  @Get('payouts/pending')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get pending payouts' })
  async getPendingPayouts() {
    return this.financeService.getPendingPayouts();
  }

  @Get('payouts/processing')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get processing payouts' })
  async getProcessingPayouts() {
    // Implement processing payouts logic
    return [];
  }

  // ==================== ANALYTICS ENDPOINTS ====================

  @Get('analytics/dashboard')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get dashboard analytics' })
  async getDashboardAnalytics() {
    const todayRevenue = await this.financeService.getTodayRevenue();
    const monthlyRevenue = await this.financeService.getMonthlyRevenue();
    const pendingPayouts = await this.financeService.getPendingPayouts();
    const pendingSettlements = await this.financeService.getPendingSettlements();

    return {
      todayRevenue,
      monthlyRevenue,
      pendingPayouts: pendingPayouts.length,
      pendingSettlements: pendingSettlements.length,
    };
  }

  @Get('analytics/revenue')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get revenue analytics' })
  async getRevenueAnalytics() {
    return this.financeService.getRevenueBySource();
  }

  @Get('analytics/commissions')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get commission analytics' })
  async getCommissionAnalytics() {
    // Implement commission analytics logic
    return { total: 0, paid: 0, pending: 0 };
  }

  @Get('analytics/payouts')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get payout analytics' })
  async getPayoutAnalytics() {
    // Implement payout analytics logic
    return { total: 0, processed: 0, pending: 0 };
  }

  @Get('analytics/profit')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get profit analytics' })
  async getProfitAnalytics() {
    // Implement profit analytics logic
    return { gross: 0, net: 0, margin: 0 };
  }
}
