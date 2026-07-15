import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IPaymentRepository } from '../interfaces/payment.repository.interface';
import { PaymentMapper } from '../mappers/payment.mapper';
import { PaymentValidator } from '../validators/payment.validator';
import {
  DuplicatePaymentException,
} from '../exceptions/payment.exception';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async initializePayment(dto: any): Promise<any> {
    this.logger.log(`Initializing payment for user ${dto.userId}`);

    if (!PaymentValidator.isValidCurrency(dto.currency || 'NGN')) {
      throw new Error('Invalid currency. Only NGN is supported');
    }

    if (!PaymentValidator.isValidGateway(dto.gateway)) {
      throw new Error('Invalid payment gateway');
    }

    if (!PaymentValidator.isValidAmount(dto.amount)) {
      throw new Error('Invalid amount');
    }

    const existingPayment = await this.paymentRepository.findByGatewayReference(dto.gatewayReference);
    if (existingPayment) {
      throw new DuplicatePaymentException(dto.gatewayReference);
    }

    const paymentData = PaymentMapper.toCreateInput(dto);
    const payment = await this.paymentRepository.create(paymentData);

    this.logger.log(`Payment initialized successfully: ${payment.id}`);
    return PaymentMapper.toResponseDto(payment);
  }

  async verifyPayment(dto: any): Promise<any> {
    this.logger.log(`Verifying payment with reference ${dto.gatewayReference}`);

    const payment = await this.paymentRepository.findByGatewayReference(dto.gatewayReference);
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status === PaymentStatus.COMPLETED) {
      return PaymentMapper.toResponseDto(payment);
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.COMPLETED,
          paidAt: new Date(),
        },
      });

      if (payment.walletId) {
        const wallet = await tx.wallet.findUnique({
          where: { id: payment.walletId },
        });

        if (wallet) {
          await tx.wallet.update({
            where: { id: payment.walletId },
            data: {
              balance: { increment: Number(payment.amount) },
              availableBalance: { increment: Number(payment.amount) },
            },
          });

          await tx.walletTransaction.create({
            data: {
              walletId: payment.walletId,
              type: 'CREDIT',
              amount: payment.amount,
              balanceBefore: wallet.balance,
              balanceAfter: wallet.balance.add(payment.amount),
              description: `Payment for ${payment.description || 'transaction'}`,
              reference: `PAY-${payment.id}`,
              status: 'COMPLETED',
            },
          });
        }
      }

      await tx.receipt.create({
        data: {
          paymentId: payment.id,
          userId: payment.userId,
          amount: payment.amount,
          currency: payment.currency,
          receiptNumber: `RCT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          issuedAt: new Date(),
        },
      });
    });

    const updatedPayment = await this.paymentRepository.findById(payment.id);
    if (!updatedPayment) {
      throw new Error('Payment not found after update');
    }
    return PaymentMapper.toResponseDto(updatedPayment);
  }

  async findById(id: string): Promise<any> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    return PaymentMapper.toResponseDto(payment);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    const result = await this.paymentRepository.findByUserId(userId, options);
    return {
      data: result.data.map((p) => PaymentMapper.toHistoryDto(p)),
      meta: result.meta,
    };
  }

  async processRefund(paymentId: string, amount: number, reason?: string): Promise<any> {
    this.logger.log(`Processing refund for payment ${paymentId}`);

    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (!PaymentValidator.canRefundPayment(payment)) {
      throw new Error('Payment cannot be refunded');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: PaymentStatus.REFUNDED,
          refundedAt: new Date(),
        },
      });

      if (payment.walletId) {
        const wallet = await tx.wallet.findUnique({
          where: { id: payment.walletId },
        });

        if (wallet) {
          await tx.wallet.update({
            where: { id: payment.walletId },
            data: {
              balance: { decrement: Number(amount) },
              availableBalance: { decrement: Number(amount) },
            },
          });

          await tx.walletTransaction.create({
            data: {
              walletId: payment.walletId,
              type: 'DEBIT',
              amount,
              balanceBefore: wallet.balance,
              balanceAfter: wallet.balance.sub(amount),
              description: `Refund for payment ${paymentId}`,
              reference: `REF-${paymentId}`,
              status: 'COMPLETED',
            },
          });
        }
      }

      await tx.refund.create({
        data: {
          paymentId,
          amount,
          currency: 'NGN',
          reason,
          gateway: payment.gateway,
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });
    });

    return this.findById(paymentId);
  }
}
