import { Refund } from '../entities/refund.entity';

export class RefundMapper {
  static toEntity(data: any): Refund {
    return {
      id: data.id,
      paymentId: data.paymentId,
      escrowId: data.escrowId,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      reason: data.reason,
      gateway: data.gateway,
      gatewayReference: data.gatewayReference,
      processedAt: data.processedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      paymentId: dto.paymentId,
      escrowId: dto.escrowId,
      amount: dto.amount,
      currency: 'NGN',
      reason: dto.reason,
      gateway: 'PAYSTACK',
    };
  }
}
