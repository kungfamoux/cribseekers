import { Settlement } from '../entities/settlement.entity';
import { SettlementResponseDto } from '../dto/settlement-response.dto';

export class SettlementMapper {
  static toResponseDto(entity: Settlement): SettlementResponseDto {
    return {
      id: entity.id,
      escrowId: entity.escrowId,
      amount: entity.amount,
      currency: entity.currency,
      status: entity.status,
      settledAt: entity.settledAt,
      gateway: entity.gateway,
      gatewayReference: entity.gatewayReference,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateInput(escrowId: string, amount: number): any {
    return {
      escrowId,
      amount,
      currency: 'NGN',
    };
  }
}
