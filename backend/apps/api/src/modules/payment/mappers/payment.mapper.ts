import { Payment } from '../entities/payment.entity';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { PaymentHistoryDto } from '../dto/payment-history.dto';

export class PaymentMapper {
  static toResponseDto(entity: Payment): PaymentResponseDto {
    return {
      id: entity.id,
      amount: entity.amount,
      currency: entity.currency,
      status: entity.status,
      gateway: entity.gateway,
      gatewayReference: entity.gatewayReference,
      gatewayResponse: entity.gatewayResponse,
      metadata: entity.metadata,
      description: entity.description,
      userId: entity.userId,
      walletId: entity.walletId,
      escrowId: entity.escrowId,
      inspectionId: entity.inspectionId,
      propertyId: entity.propertyId,
      paidAt: entity.paidAt,
      failedAt: entity.failedAt,
      refundedAt: entity.refundedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toHistoryDto(entity: Payment): PaymentHistoryDto {
    return {
      id: entity.id,
      amount: entity.amount,
      currency: entity.currency,
      status: entity.status,
      gateway: entity.gateway,
      description: entity.description,
      createdAt: entity.createdAt,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      amount: dto.amount,
      currency: dto.currency || 'NGN',
      gateway: dto.gateway,
      description: dto.description,
      userId: dto.userId,
      walletId: dto.walletId,
      escrowId: dto.escrowId,
      inspectionId: dto.inspectionId,
      propertyId: dto.propertyId,
      metadata: dto.metadata,
    };
  }
}
