import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaystackGateway } from './gateways/paystack.gateway';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private readonly paystackWebhookSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly paymentGatewayService: PaymentGatewayService,
  ) {
    this.paystackWebhookSecret = this.configService.get<string>('PAYSTACK_WEBHOOK_SECRET') || '';
  }

  async handlePaystackWebhook(payload: any, signature: string) {
    this.logger.log(`Processing Paystack webhook for event: ${payload.event}`);

    // Verify webhook signature
    const paystackGateway = this.paymentGatewayService.getGateway('PAYSTACK') as PaystackGateway;
    const isValid = paystackGateway.verifyWebhookSignature(
      JSON.stringify(payload),
      signature,
      this.paystackWebhookSecret,
    );

    if (!isValid) {
      this.logger.warn('Invalid Paystack webhook signature');
      throw new Error('Invalid webhook signature');
    }

    // Process the webhook based on event type
    switch (payload.event) {
      case 'charge.success':
        await this.handleSuccessfulCharge(payload.data);
        break;
      case 'charge.failed':
        await this.handleFailedCharge(payload.data);
        break;
      case 'transfer.success':
        await this.handleSuccessfulTransfer(payload.data);
        break;
      case 'transfer.failed':
        await this.handleFailedTransfer(payload.data);
        break;
      case 'refund.processed':
        await this.handleRefundProcessed(payload.data);
        break;
      default:
        this.logger.log(`Unhandled Paystack event: ${payload.event}`);
    }

    return { status: 'success' };
  }

  async handleFlutterwaveWebhook(payload: any, _signature: string) {
    this.logger.log(`Processing Flutterwave webhook for event: ${payload.event}`);

    // TODO: Implement Flutterwave webhook signature verification
    // TODO: Implement Flutterwave event handling

    return { status: 'success' };
  }

  private async handleSuccessfulCharge(data: any) {
    this.logger.log(`Handling successful charge: ${data.reference}`);

    const payment = await this.prisma.payment.findFirst({
      where: { gatewayReference: data.reference },
    });

    if (!payment) {
      this.logger.warn(`Payment not found for reference: ${data.reference}`);
      return;
    }

    if (payment.status === 'COMPLETED') {
      this.logger.log(`Payment already completed: ${data.reference}`);
      return;
    }

    await this.prisma.$transaction(async (tx: any) => {
      // Update payment status
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          paidAt: new Date(),
          gatewayResponse: data,
        },
      });

      // Credit wallet if applicable
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

      // Generate receipt
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

    this.logger.log(`Successfully processed charge: ${data.reference}`);
  }

  private async handleFailedCharge(data: any) {
    this.logger.log(`Handling failed charge: ${data.reference}`);

    const payment = await this.prisma.payment.findFirst({
      where: { gatewayReference: data.reference },
    });

    if (!payment) {
      this.logger.warn(`Payment not found for reference: ${data.reference}`);
      return;
    }

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'FAILED',
        failedAt: new Date(),
        gatewayResponse: data,
      },
    });

    this.logger.log(`Successfully processed failed charge: ${data.reference}`);
  }

  private async handleSuccessfulTransfer(data: any) {
    this.logger.log(`Handling successful transfer: ${data.reference}`);

    // Update withdrawal or settlement status
    const withdrawal = await this.prisma.withdrawal.findFirst({
      where: { id: data.reference },
    });

    if (withdrawal) {
      await this.prisma.withdrawal.update({
        where: { id: withdrawal.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });
    }

    const settlement = await this.prisma.settlement.findFirst({
      where: { id: data.reference },
    });

    if (settlement) {
      await this.prisma.settlement.update({
        where: { id: settlement.id },
        data: {
          status: 'COMPLETED',
          settledAt: new Date(),
        },
      });
    }

    this.logger.log(`Successfully processed transfer: ${data.reference}`);
  }

  private async handleFailedTransfer(data: any) {
    this.logger.log(`Handling failed transfer: ${data.reference}`);

    // Update withdrawal or settlement status
    const withdrawal = await this.prisma.withdrawal.findFirst({
      where: { id: data.reference },
    });

    if (withdrawal) {
      await this.prisma.withdrawal.update({
        where: { id: withdrawal.id },
        data: {
          status: 'FAILED',
          rejectionReason: data.reason || 'Transfer failed',
        },
      });
    }

    this.logger.log(`Successfully processed failed transfer: ${data.reference}`);
  }

  private async handleRefundProcessed(data: any) {
    this.logger.log(`Handling processed refund: ${data.reference}`);

    const refund = await this.prisma.refund.findFirst({
      where: { gatewayReference: data.reference },
    });

    if (refund) {
      await this.prisma.refund.update({
        where: { id: refund.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });
    }

    this.logger.log(`Successfully processed refund: ${data.reference}`);
  }
}
