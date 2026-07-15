import { Escrow } from '../entities/escrow.entity';

export class EscrowMapper {
  static toEntity(data: any): Escrow {
    return {
      id: data.id,
      walletId: data.walletId,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      propertyId: data.propertyId,
      inspectionId: data.inspectionId,
      paymentId: data.paymentId,
      payerId: data.payerId,
      payeeId: data.payeeId,
      releaseCondition: data.releaseCondition,
      releaseAt: data.releaseAt,
      refundAt: data.refundAt,
      disputedAt: data.disputedAt,
      disputeReason: data.disputeReason,
      resolvedAt: data.resolvedAt,
      resolutionNotes: data.resolutionNotes,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      walletId: dto.walletId,
      amount: dto.amount,
      currency: dto.currency || 'NGN',
      payerId: dto.payerId,
      payeeId: dto.payeeId,
      propertyId: dto.propertyId,
      inspectionId: dto.inspectionId,
      paymentId: dto.paymentId,
      releaseCondition: dto.releaseCondition,
    };
  }
}
