import { Wallet } from '../entities/wallet.entity';
import { WalletResponseDto } from '../dto/wallet-response.dto';
import { WalletSummaryDto } from '../dto/wallet-summary.dto';

export class WalletMapper {
  static toResponseDto(entity: Wallet): WalletResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      balance: entity.balance,
      availableBalance: entity.availableBalance,
      currency: entity.currency,
      status: entity.status,
      frozenAt: entity.frozenAt,
      frozenBy: entity.frozenBy,
      frozenReason: entity.frozenReason,
      closedAt: entity.closedAt,
      closedBy: entity.closedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummaryDto(entity: Wallet): WalletSummaryDto {
    return {
      id: entity.id,
      userId: entity.userId,
      balance: entity.balance,
      availableBalance: entity.availableBalance,
      currency: entity.currency,
      status: entity.status,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      userId: dto.userId,
      currency: dto.currency || 'NGN',
      status: dto.status || 'ACTIVE',
    };
  }
}
