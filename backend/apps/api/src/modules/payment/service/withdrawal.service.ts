import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { WithdrawalRepository } from '../repository/withdrawal.repository';
import { WalletRepository } from '../repository/wallet.repository';
import { BankAccountRepository } from '../repository/bank-account.repository';
import { WithdrawalMapper } from '../mappers/withdrawal.mapper';
import { PaymentValidator } from '../validators/payment.validator';
import {
  WithdrawalNotAllowedException,
  BankAccountNotVerifiedException,
  InsufficientFundsException,
} from '../exceptions/payment.exception';

@Injectable()
export class WithdrawalService {
  private readonly logger = new Logger(WithdrawalService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly withdrawalRepository: WithdrawalRepository,
    private readonly walletRepository: WalletRepository,
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async create(dto: any): Promise<any> {
    this.logger.log(`Creating withdrawal for wallet ${dto.walletId}`);

    const wallet = await this.walletRepository.findById(dto.walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const bankAccount = await this.bankAccountRepository.findById(dto.bankAccountId);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    if (!PaymentValidator.isValidBankAccount(bankAccount)) {
      throw new BankAccountNotVerifiedException(dto.bankAccountId);
    }

    if (!PaymentValidator.canRequestWithdrawal(wallet, Number(dto.amount))) {
      throw new InsufficientFundsException();
    }

    if (!PaymentValidator.validateWithdrawalAmount(Number(dto.amount))) {
      throw new Error('Invalid withdrawal amount');
    }

    const withdrawalData = WithdrawalMapper.toCreateInput(dto);
    const withdrawal = await this.prisma.$transaction(async (tx: any) => {
      const newWithdrawal = await tx.withdrawal.create({
        data: withdrawalData,
      });

      await tx.wallet.update({
        where: { id: dto.walletId },
        data: {
          availableBalance: { decrement: Number(dto.amount) },
        },
      });

      return newWithdrawal;
    });

    this.logger.log(`Withdrawal created successfully: ${withdrawal.id}`);
    return WithdrawalMapper.toEntity(withdrawal);
  }

  async findById(id: string): Promise<any> {
    const withdrawal = await this.withdrawalRepository.findById(id);
    if (!withdrawal) {
      throw new Error('Withdrawal not found');
    }
    return WithdrawalMapper.toEntity(withdrawal);
  }

  async approve(dto: any): Promise<any> {
    this.logger.log(`Approving withdrawal ${dto.withdrawalId}`);

    const withdrawal = await this.withdrawalRepository.findById(dto.withdrawalId);
    if (!withdrawal) {
      throw new Error('Withdrawal not found');
    }

    if (!PaymentValidator.canApproveWithdrawal(withdrawal)) {
      throw new WithdrawalNotAllowedException('Withdrawal cannot be approved in current state');
    }

    const updatedWithdrawal = await this.prisma.$transaction(async (tx: any) => {
      const updated = await tx.withdrawal.update({
        where: { id: dto.withdrawalId },
        data: {
          status: 'COMPLETED',
          approvedBy: dto.approvedBy,
          approvedAt: new Date(),
          processedAt: new Date(),
        },
      });

      const wallet = await tx.wallet.findUnique({
        where: { id: withdrawal.walletId },
      });

      if (wallet) {
        await tx.wallet.update({
          where: { id: withdrawal.walletId },
          data: {
            balance: { decrement: Number(withdrawal.amount) },
          },
        });

        await tx.walletTransaction.create({
          data: {
            walletId: withdrawal.walletId,
            type: 'DEBIT',
            amount: withdrawal.amount,
            balanceBefore: wallet.balance,
            balanceAfter: wallet.balance.sub(withdrawal.amount),
            description: `Withdrawal to bank account ${withdrawal.bankAccountId}`,
            reference: `WTH-${withdrawal.id}`,
            status: 'COMPLETED',
          },
        });
      }

      return updated;
    });

    return WithdrawalMapper.toEntity(updatedWithdrawal);
  }

  async reject(dto: any): Promise<any> {
    this.logger.log(`Rejecting withdrawal ${dto.withdrawalId}`);

    const withdrawal = await this.withdrawalRepository.findById(dto.withdrawalId);
    if (!withdrawal) {
      throw new Error('Withdrawal not found');
    }

    if (!PaymentValidator.canRejectWithdrawal(withdrawal)) {
      throw new WithdrawalNotAllowedException('Withdrawal cannot be rejected in current state');
    }

    const updatedWithdrawal = await this.prisma.$transaction(async (tx: any) => {
      const updated = await tx.withdrawal.update({
        where: { id: dto.withdrawalId },
        data: {
          status: 'CANCELLED',
          rejectedBy: dto.rejectedBy,
          rejectionReason: dto.rejectionReason,
          rejectedAt: new Date(),
        },
      });

      const wallet = await tx.wallet.findUnique({
        where: { id: withdrawal.walletId },
      });

      if (wallet) {
        await tx.wallet.update({
          where: { id: withdrawal.walletId },
          data: {
            availableBalance: { increment: Number(withdrawal.amount) },
          },
        });
      }

      return updated;
    });

    return WithdrawalMapper.toEntity(updatedWithdrawal);
  }

  async findByWalletId(walletId: string, options?: any): Promise<any> {
    return this.withdrawalRepository.findByWalletId(walletId, options);
  }
}
