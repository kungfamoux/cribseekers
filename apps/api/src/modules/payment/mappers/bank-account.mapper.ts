import { BankAccount } from '../entities/bank-account.entity';

export class BankAccountMapper {
  static toEntity(data: any): BankAccount {
    return {
      id: data.id,
      walletId: data.walletId,
      bankName: data.bankName,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      bankCode: data.bankCode,
      isDefault: data.isDefault,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      walletId: dto.walletId,
      bankName: dto.bankName,
      accountName: dto.accountName,
      accountNumber: dto.accountNumber,
      bankCode: dto.bankCode,
      isDefault: dto.isDefault || false,
      isVerified: false,
    };
  }
}
