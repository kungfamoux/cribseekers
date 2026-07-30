import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateFinanceTransactionDto } from '../dto/finance-transaction.dto';
import { CreateCommissionDto } from '../dto/commission.dto';
import { CreateSettlementDto } from '../dto/settlement.dto';
import { CreatePayoutDto } from '../dto/payout.dto';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  // ==================== REVENUE ENGINE ====================

  async createTransaction(dto: CreateFinanceTransactionDto) {
    return this.prisma.financeTransaction.create({
      data: dto,
    });
  }

  async getTodayRevenue() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactions = await this.prisma.financeTransaction.findMany({
      where: {
        status: 'SUCCESS' as any,
        createdAt: { gte: today },
      },
    });

    const total = transactions.reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const inspection = transactions
      .filter((t: any) => t.transactionType === 'INSPECTION')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const escrow = transactions
      .filter((t: any) => t.transactionType === 'ESCROW')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const premium = transactions
      .filter((t: any) => t.transactionType === 'PREMIUM')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const ads = transactions
      .filter((t: any) => t.transactionType === 'ADVERTISEMENT')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);

    return { total, inspection, escrow, premium, ads };
  }

  async getMonthlyRevenue() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

    const transactions = await this.prisma.financeTransaction.findMany({
      where: {
        status: 'SUCCESS' as any,
        createdAt: { gte: firstDay },
      },
    });

    const total = transactions.reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const inspection = transactions
      .filter((t: any) => t.transactionType === 'INSPECTION')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const escrow = transactions
      .filter((t: any) => t.transactionType === 'ESCROW')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const premium = transactions
      .filter((t: any) => t.transactionType === 'PREMIUM')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
    const ads = transactions
      .filter((t: any) => t.transactionType === 'ADVERTISEMENT')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);

    return { total, inspection, escrow, premium, ads };
  }

  async getRevenueBySource() {
    const transactions = await this.prisma.financeTransaction.findMany({
      where: { status: 'SUCCESS' as any },
    });

    const total = transactions.reduce((sum: number, t: any) => sum + Number(t.amount), 0);

    const bySource = {
      INSPECTION: 0,
      ESCROW: 0,
      PREMIUM: 0,
      ADVERTISEMENT: 0,
      MOVING_SERVICE: 0,
    };

    transactions.forEach((t: any) => {
      bySource[t.transactionType as keyof typeof bySource] += Number(t.amount);
    });

    return {
      total,
      bySource: {
        INSPECTION: (bySource.INSPECTION / total) * 100,
        ESCROW: (bySource.ESCROW / total) * 100,
        PREMIUM: (bySource.PREMIUM / total) * 100,
        ADVERTISEMENT: (bySource.ADVERTISEMENT / total) * 100,
        MOVING_SERVICE: (bySource.MOVING_SERVICE / total) * 100,
      },
    };
  }

  // ==================== COMMISSION ENGINE ====================

  async calculateInspectionCommission(_amount: number) {
    const INSPECTION_FEE = 5000;
    const PLATFORM_PERCENTAGE = 0.4;
    const AGENT_PERCENTAGE = 0.6;

    const platformRevenue = INSPECTION_FEE * PLATFORM_PERCENTAGE;
    const agentRevenue = INSPECTION_FEE * AGENT_PERCENTAGE;

    return {
      total: INSPECTION_FEE,
      platformRevenue,
      agentRevenue,
    };
  }

  async calculateEscrowFee(amount: number) {
    const ESCROW_FEE_PERCENTAGE = 0.02;
    const platformFee = amount * ESCROW_FEE_PERCENTAGE;
    const totalCharge = amount + platformFee;

    return {
      escrowAmount: amount,
      platformFee,
      totalCharge,
    };
  }

  async createCommission(dto: CreateCommissionDto) {
    return this.prisma.commission.create({
      data: dto,
    });
  }

  async distributeCommission(transactionId: string, agentId: string, amount: number) {
    // Create commission record
    const commission = await this.prisma.commission.create({
      data: {
        transactionId,
        agentId,
        commissionType: 'INSPECTION_COMMISSION',
        amount,
        percentage: 60,
        status: 'PENDING',
      },
    });

    // Credit agent wallet
    const walletId = await this.getAgentWalletId(agentId);
    const currentBalance = await this.getWalletBalance(walletId);
    await this.prisma.walletTransaction.create({
      data: {
        walletId,
        amount: amount as any,
        type: 'CREDIT',
        description: 'Inspection commission',
        balanceBefore: currentBalance,
        balanceAfter: currentBalance + Number(amount),
        reference: `COMM-${commission.id}`,
        metadata: { commissionId: commission.id },
      },
    });

    // Update commission status
    await this.prisma.commission.update({
      where: { id: commission.id },
      data: { status: 'PAID', paidAt: new Date() },
    });

    return commission;
  }

  async getAgentCommissions(agentId: string) {
    return this.prisma.commission.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==================== SETTLEMENT ENGINE ====================

  async processInspectionSettlement(inspectionId: string, _paymentId: string) {
    const commission = await this.calculateInspectionCommission(0);

    // Create finance transaction
    const transaction = await this.prisma.financeTransaction.create({
      data: {
        transactionType: 'INSPECTION' as any,
        source: 'Inspection Payment',
        amount: commission.total,
        currency: 'NGN',
        platformRevenue: commission.platformRevenue,
        serviceProviderRevenue: commission.agentRevenue,
        reference: `INS-${inspectionId}`,
        status: 'SUCCESS' as any,
      },
    });

    // Create settlement
    const settlement = await this.prisma.financeSettlement.create({
      data: {
        entityType: 'Inspection',
        entityId: inspectionId,
        amount: commission.total,
        platformFee: commission.platformRevenue,
        serviceProviderFee: commission.agentRevenue,
        status: 'COMPLETED',
        processedAt: new Date(),
      },
    });

    // Credit platform wallet
    await this.creditPlatformWallet(commission.platformRevenue, 'Inspection fee');

    return { transaction, settlement };
  }

  async processEscrowSettlement(escrowId: string, amount: number) {
    const feeCalculation = await this.calculateEscrowFee(amount);

    // Create finance transaction
    const transaction = await this.prisma.financeTransaction.create({
      data: {
        transactionType: 'ESCROW' as any,
        source: 'Escrow Fee',
        amount: feeCalculation.platformFee,
        currency: 'NGN',
        platformRevenue: feeCalculation.platformFee,
        serviceProviderRevenue: 0,
        reference: `ESC-${escrowId}`,
        status: 'SUCCESS' as any,
      },
    });

    // Create settlement
    const settlement = await this.prisma.financeSettlement.create({
      data: {
        entityType: 'Escrow',
        entityId: escrowId,
        amount: feeCalculation.platformFee,
        platformFee: feeCalculation.platformFee,
        serviceProviderFee: 0,
        status: 'COMPLETED',
        processedAt: new Date(),
      },
    });

    // Credit platform wallet
    await this.creditPlatformWallet(feeCalculation.platformFee, 'Escrow fee');

    return { transaction, settlement };
  }

  async createSettlement(dto: CreateSettlementDto) {
    return this.prisma.financeSettlement.create({
      data: dto,
    });
  }

  async getPendingSettlements() {
    return this.prisma.financeSettlement.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==================== PAYOUT ENGINE ====================

  async requestPayout(dto: CreatePayoutDto) {
    const PAYOUT_FEE = 100;
    const netAmount = dto.amount - PAYOUT_FEE;

    // Validate minimum withdrawal
    if (dto.amount < 10000) {
      throw new BadRequestException('Minimum withdrawal amount is ₦10,000');
    }

    // Check agent wallet balance
    const wallet = await this.getAgentWalletId(dto.agentId);
    const balance = await this.getWalletBalance(wallet);

    if (balance < dto.amount) {
      throw new BadRequestException('Insufficient wallet balance');
    }

    const payout = await this.prisma.payout.create({
      data: {
        agentId: dto.agentId,
        amount: dto.amount,
        fee: PAYOUT_FEE,
        netAmount,
        bankAccountId: dto.bankAccountId,
        status: 'PENDING',
        reference: `PAY-${Date.now()}`,
      },
    });

    return payout;
  }

  async approvePayout(payoutId: string, adminId: string) {
    const payout = await this.prisma.payout.findUnique({
      where: { id: payoutId },
      include: { bankAccount: true },
    });

    if (!payout) {
      throw new NotFoundException('Payout not found');
    }

    if (payout.status !== 'PENDING') {
      throw new BadRequestException('Payout is not in pending status');
    }

    // Process payout via Paystack (implement actual Paystack integration)
    // For now, just update status
    const updated = await this.prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: 'PROCESSING',
        approvedBy: adminId,
        approvedAt: new Date(),
      },
    });

    // Debit agent wallet
    await this.debitAgentWallet(payout.agentId, Number(payout.amount));

    return updated;
  }

  async rejectPayout(payoutId: string, reason: string) {
    return this.prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: 'REJECTED',
        rejectionReason: reason,
      },
    });
  }

  async processPayout(payoutId: string) {
    // Implement actual Paystack transfer here
    return this.prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: 'COMPLETED',
        processedAt: new Date(),
      },
    });
  }

  async getPendingPayouts() {
    return this.prisma.payout.findMany({
      where: { status: 'PENDING' },
      include: { agent: true, bankAccount: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAgentPayouts(agentId: string) {
    return this.prisma.payout.findMany({
      where: { agentId },
      include: { bankAccount: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==================== PLATFORM WALLET ====================

  async getPlatformWalletBalance() {
    const platformWallet = await this.getPlatformWallet();
    const transactions = await this.prisma.walletTransaction.findMany({
      where: { walletId: platformWallet.id },
    });

    const balance = transactions.reduce((sum: number, t: any) => {
      return t.type === 'CREDIT' ? sum + Number(t.amount) : sum - Number(t.amount);
    }, 0);

    return balance;
  }

  async creditPlatformWallet(amount: number, description: string) {
    const platformWallet = await this.getPlatformWallet();
    const currentBalance = await this.getWalletBalance(platformWallet.id);

    return this.prisma.walletTransaction.create({
      data: {
        walletId: platformWallet.id,
        amount: amount as any,
        type: 'CREDIT',
        description,
        balanceBefore: currentBalance,
        balanceAfter: currentBalance + amount,
        reference: `CREDIT-${Date.now()}`,
      },
    });
  }

  async debitPlatformWallet(amount: number, description: string) {
    const platformWallet = await this.getPlatformWallet();
    const currentBalance = await this.getWalletBalance(platformWallet.id);

    return this.prisma.walletTransaction.create({
      data: {
        walletId: platformWallet.id,
        amount: amount as any,
        type: 'DEBIT',
        description,
        balanceBefore: currentBalance,
        balanceAfter: currentBalance - amount,
        reference: `DEBIT-${Date.now()}`,
      },
    });
  }

  async getPlatformWallet() {
    let wallet = await this.prisma.wallet.findFirst({
      where: { userId: 'PLATFORM_SYSTEM' },
    });

    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: {
          userId: 'PLATFORM_SYSTEM',
          currency: 'NGN',
          balance: 0,
          status: 'ACTIVE',
        },
      });
    }

    return wallet;
  }

  // ==================== HELPER METHODS ====================

  private async getAgentWalletId(agentId: string) {
    let wallet = await this.prisma.wallet.findFirst({
      where: { userId: agentId },
    });

    if (!wallet) {
      wallet = await this.prisma.wallet.create({
        data: {
          userId: agentId,
          currency: 'NGN',
          balance: 0,
          status: 'ACTIVE',
        },
      });
    }

    return wallet.id;
  }

  private async getWalletBalance(walletId: string) {
    const transactions = await this.prisma.walletTransaction.findMany({
      where: { walletId },
    });

    return transactions.reduce((sum: number, t: any) => {
      return t.type === 'CREDIT' ? sum + Number(t.amount) : sum - Number(t.amount);
    }, 0);
  }

  private async debitAgentWallet(agentId: string, amount: number) {
    const walletId = await this.getAgentWalletId(agentId);
    const currentBalance = await this.getWalletBalance(walletId);

    return this.prisma.walletTransaction.create({
      data: {
        walletId,
        amount: amount as any,
        type: 'DEBIT',
        description: 'Payout withdrawal',
        balanceBefore: currentBalance,
        balanceAfter: currentBalance - amount,
        reference: `PAYOUT-${Date.now()}`,
      },
    });
  }
}
