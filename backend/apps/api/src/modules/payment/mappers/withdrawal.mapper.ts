import { Withdrawal } from '../entities/withdrawal.entity';

export class WithdrawalMapper {
  static toEntity(data: any): Withdrawal {
    return {
      id: data.id,
      walletId: data.walletId,
      bankAccountId: data.bankAccountId,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      reason: data.reason,
      processedAt: data.processedAt,
      rejectedAt: data.rejectedAt,
      rejectionReason: data.rejectionReason,
      approvedBy: data.approvedBy,
      approvedAt: data.approvedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      walletId: dto.walletId,
      bankAccountId: dto.bankAccountId,
      amount: dto.amount,
      currency: 'NGN',
      reason: dto.reason,
    };
  }
}
