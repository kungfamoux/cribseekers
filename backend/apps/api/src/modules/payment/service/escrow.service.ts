import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { EscrowRepository } from '../repository/escrow.repository';
import { WalletRepository } from '../repository/wallet.repository';
import { EscrowMapper } from '../mappers/escrow.mapper';
import { PaymentValidator } from '../validators/payment.validator';
import {
  EscrowNotFoundException,
  RefundNotAllowedException,
} from '../exceptions/payment.exception';
import { EscrowStatus } from '@prisma/client';

@Injectable()
export class EscrowService {
  private readonly logger = new Logger(EscrowService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly escrowRepository: EscrowRepository,
    private readonly walletRepository: WalletRepository,
  ) {}

  async create(dto: any): Promise<any> {
    this.logger.log(`Creating escrow for wallet ${dto.walletId}`);

    const wallet = await this.walletRepository.findById(dto.walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (!PaymentValidator.canPerformTransaction(wallet, Number(dto.amount))) {
      throw new Error('Insufficient funds');
    }

    const escrowData = EscrowMapper.toCreateInput(dto);
    const escrow = await this.prisma.$transaction(async (tx: any) => {
      const newEscrow = await tx.escrow.create({
        data: {
          ...escrowData,
          status: EscrowStatus.FUNDED,
        },
      });

      await tx.wallet.update({
        where: { id: dto.walletId },
        data: {
          balance: { decrement: Number(dto.amount) },
          availableBalance: { decrement: Number(dto.amount) },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: dto.walletId,
          type: 'DEBIT',
          amount: dto.amount,
          balanceBefore: wallet.balance,
          balanceAfter: wallet.balance.sub(dto.amount),
          description: `Escrow funding for ${dto.propertyId || dto.inspectionId}`,
          reference: `ESC-${newEscrow.id}`,
          status: 'COMPLETED',
        },
      });

      return newEscrow;
    });

    this.logger.log(`Escrow created successfully: ${escrow.id}`);
    return escrow;
  }

  async findById(id: string): Promise<any> {
    const escrow = await this.escrowRepository.findById(id);
    if (!escrow) {
      throw new EscrowNotFoundException(id);
    }
    return EscrowMapper.toEntity(escrow);
  }

  async release(escrowId: string, notes?: string): Promise<any> {
    this.logger.log(`Releasing escrow ${escrowId}${notes ? ` with notes: ${notes}` : ''}`);

    const escrow = await this.escrowRepository.findById(escrowId);
    if (!escrow) {
      throw new EscrowNotFoundException(escrowId);
    }

    if (!PaymentValidator.canReleaseEscrow(escrow)) {
      throw new RefundNotAllowedException('Escrow cannot be released in current state');
    }

    const updatedEscrow = await this.prisma.$transaction(async (tx: any) => {
      const updated = await tx.escrow.update({
        where: { id: escrowId },
        data: {
          status: EscrowStatus.RELEASED,
          releaseAt: new Date(),
          resolutionNotes: notes,
        },
      });

      const wallet = await tx.wallet.findUnique({
        where: { id: escrow.payeeId },
      });

      if (wallet) {
        await tx.wallet.update({
          where: { id: escrow.payeeId },
          data: {
            balance: { increment: Number(escrow.amount) },
            availableBalance: { increment: Number(escrow.amount) },
          },
        });

        await tx.walletTransaction.create({
          data: {
            walletId: escrow.payeeId,
            type: 'CREDIT',
            amount: escrow.amount,
            balanceBefore: wallet.balance,
            balanceAfter: wallet.balance.add(escrow.amount),
            description: `Escrow release from ${escrow.payerId}`,
            reference: `ESC-REL-${escrowId}`,
            status: 'COMPLETED',
          },
        });
      }

      return updated;
    });

    return EscrowMapper.toEntity(updatedEscrow);
  }

  async refund(escrowId: string, reason?: string): Promise<any> {
    this.logger.log(`Refunding escrow ${escrowId}${reason ? ` with reason: ${reason}` : ''}`);

    const escrow = await this.escrowRepository.findById(escrowId);
    if (!escrow) {
      throw new EscrowNotFoundException(escrowId);
    }

    if (!PaymentValidator.canRefundEscrow(escrow)) {
      throw new RefundNotAllowedException('Escrow cannot be refunded in current state');
    }

    const updatedEscrow = await this.prisma.$transaction(async (tx: any) => {
      const updated = await tx.escrow.update({
        where: { id: escrowId },
        data: {
          status: EscrowStatus.REFUNDED,
          refundAt: new Date(),
          disputeReason: reason,
        },
      });

      const wallet = await tx.wallet.findUnique({
        where: { id: escrow.walletId },
      });

      if (wallet) {
        await tx.wallet.update({
          where: { id: escrow.walletId },
          data: {
            balance: { increment: Number(escrow.amount) },
            availableBalance: { increment: Number(escrow.amount) },
          },
        });

        await tx.walletTransaction.create({
          data: {
            walletId: escrow.walletId,
            type: 'CREDIT',
            amount: escrow.amount,
            balanceBefore: wallet.balance,
            balanceAfter: wallet.balance.add(escrow.amount),
            description: `Escrow refund`,
            reference: `ESC-REF-${escrowId}`,
            status: 'COMPLETED',
          },
        });
      }

      return updated;
    });

    return EscrowMapper.toEntity(updatedEscrow);
  }

  async findByPayerId(payerId: string, options?: any): Promise<any> {
    return this.escrowRepository.findByPayerId(payerId, options);
  }

  async findByPayeeId(payeeId: string, options?: any): Promise<any> {
    return this.escrowRepository.findByPayeeId(payeeId, options);
  }
}
