import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { WalletRepository } from '../repository/wallet.repository';
import { WalletMapper } from '../mappers/wallet.mapper';
import { PaymentValidator } from '../validators/payment.validator';
import {
  WalletNotFoundException,
  InsufficientFundsException,
} from '../exceptions/payment.exception';
import { WalletStatus } from '@prisma/client';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly walletRepository: WalletRepository,
  ) {}

  async createForUser(userId: string): Promise<any> {
    this.logger.log(`Creating wallet for user ${userId}`);

    const existingWallet = await this.walletRepository.findByUserId(userId);
    if (existingWallet) {
      return WalletMapper.toResponseDto(existingWallet);
    }

    const walletData = WalletMapper.toCreateInput({ userId });
    const wallet = await this.walletRepository.create(walletData);

    this.logger.log(`Wallet created successfully for user ${userId}`);
    return WalletMapper.toResponseDto(wallet);
  }

  async findById(id: string): Promise<any> {
    const wallet = await this.walletRepository.findById(id);
    if (!wallet) {
      throw new WalletNotFoundException(id);
    }
    return WalletMapper.toResponseDto(wallet);
  }

  async findByUserId(userId: string): Promise<any> {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new WalletNotFoundException(userId);
    }
    return WalletMapper.toResponseDto(wallet);
  }

  async creditWallet(walletId: string, amount: number, description: string, reference: string): Promise<any> {
    this.logger.log(`Crediting wallet ${walletId} with amount ${amount}`);

    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet) {
      throw new WalletNotFoundException(walletId);
    }

    if (!PaymentValidator.isValidAmount(amount)) {
      throw new Error('Invalid amount');
    }

    await this.prisma.$transaction(async (tx: any) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: walletId },
        data: {
          balance: { increment: amount },
          availableBalance: { increment: amount },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId,
          type: 'CREDIT',
          amount,
          balanceBefore: wallet.balance,
          balanceAfter: updatedWallet.balance,
          description,
          reference,
          status: 'COMPLETED',
        },
      });
    });

    return this.findById(walletId);
  }

  async debitWallet(walletId: string, amount: number, description: string, reference: string): Promise<any> {
    this.logger.log(`Debiting wallet ${walletId} with amount ${amount}`);

    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet) {
      throw new WalletNotFoundException(walletId);
    }

    if (!PaymentValidator.canPerformTransaction(wallet, amount)) {
      throw new InsufficientFundsException();
    }

    await this.prisma.$transaction(async (tx: any) => {
      const updatedWallet = await tx.wallet.update({
        where: { id: walletId },
        data: {
          balance: { decrement: amount },
          availableBalance: { decrement: amount },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId,
          type: 'DEBIT',
          amount,
          balanceBefore: wallet.balance,
          balanceAfter: updatedWallet.balance,
          description,
          reference,
          status: 'COMPLETED',
        },
      });
    });

    return this.findById(walletId);
  }

  async freezeWallet(walletId: string, reason: string, frozenBy: string): Promise<any> {
    this.logger.log(`Freezing wallet ${walletId}`);

    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet) {
      throw new WalletNotFoundException(walletId);
    }

    const updatedWallet = await this.walletRepository.update(walletId, {
      status: WalletStatus.FROZEN,
      frozenAt: new Date(),
      frozenBy,
      frozenReason: reason,
    });

    return WalletMapper.toResponseDto(updatedWallet);
  }

  async unfreezeWallet(walletId: string): Promise<any> {
    this.logger.log(`Unfreezing wallet ${walletId}`);

    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet) {
      throw new WalletNotFoundException(walletId);
    }

    const updatedWallet = await this.walletRepository.update(walletId, {
      status: WalletStatus.ACTIVE,
      frozenAt: null,
      frozenBy: null,
      frozenReason: null,
    });

    return WalletMapper.toResponseDto(updatedWallet);
  }

  async closeWallet(walletId: string, closedBy: string): Promise<any> {
    this.logger.log(`Closing wallet ${walletId}`);

    const wallet = await this.walletRepository.findById(walletId);
    if (!wallet) {
      throw new WalletNotFoundException(walletId);
    }

    if (Number(wallet.balance) > 0) {
      throw new Error('Cannot close wallet with non-zero balance');
    }

    const updatedWallet = await this.walletRepository.update(walletId, {
      status: WalletStatus.CLOSED,
      closedAt: new Date(),
      closedBy,
    });

    return WalletMapper.toResponseDto(updatedWallet);
  }
}
