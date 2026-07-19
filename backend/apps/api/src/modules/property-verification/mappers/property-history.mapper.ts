import { PropertyHistory } from '../entities/property-history.entity';
import { VerificationHistoryDto } from '../dto/verification-history.dto';

export class PropertyHistoryMapper {
  static toEntity(prismaHistory: any): PropertyHistory {
    const entity = new PropertyHistory();
    entity.id = prismaHistory.id;
    entity.propertyId = prismaHistory.propertyId;
    entity.action = prismaHistory.action;
    entity.changes = prismaHistory.changes;
    entity.performedBy = prismaHistory.performedBy;
    entity.performedAt = prismaHistory.performedAt;
    entity.createdAt = prismaHistory.createdAt;
    return entity;
  }

  static toResponseDto(entity: PropertyHistory): VerificationHistoryDto {
    const dto = new VerificationHistoryDto();
    dto.id = entity.id;
    dto.propertyId = entity.propertyId;
    dto.action = entity.action;
    dto.changes = entity.changes;
    dto.performedBy = entity.performedBy;
    dto.performedAt = entity.performedAt;
    dto.createdAt = entity.createdAt;
    return dto;
  }

  static toCreateInput(data: Omit<PropertyHistory, 'id' | 'createdAt'>): any {
    return {
      propertyId: data.propertyId,
      action: data.action,
      changes: data.changes,
      performedBy: data.performedBy,
      performedAt: data.performedAt,
    };
  }
}
