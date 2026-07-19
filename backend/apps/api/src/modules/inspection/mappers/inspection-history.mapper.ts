import { InspectionHistory } from '../entities/inspection-history.entity';
import { InspectionHistoryDto } from '../dto/inspection-history.dto';

export class InspectionHistoryMapper {
  static toDto(entity: InspectionHistory): InspectionHistoryDto {
    return {
      id: entity.id,
      inspectionId: entity.inspectionId,
      action: entity.action,
      previousState: entity.previousState,
      newState: entity.newState,
      performedBy: entity.performedBy,
      performedAt: entity.performedAt,
      notes: entity.notes,
    };
  }

  static toCreateInput(inspectionId: string, action: string, newState: string, performedBy: string, notes?: string): any {
    return {
      inspectionId,
      action,
      newState,
      performedBy,
      notes,
    };
  }
}
