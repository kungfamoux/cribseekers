import { Inspection } from '../entities/inspection.entity';
import { InspectionResponseDto } from '../dto/inspection-response.dto';
import { InspectionSummaryDto } from '../dto/inspection-summary.dto';
import { InspectionDetailsDto } from '../dto/inspection-details.dto';

export class InspectionMapper {
  static toResponseDto(entity: Inspection): InspectionResponseDto {
    return {
      id: entity.id,
      propertyId: entity.propertyId,
      type: entity.type,
      status: entity.status,
      scheduledAt: entity.scheduledAt,
      durationMinutes: entity.durationMinutes,
      notes: entity.notes,
      result: entity.result,
      resultNotes: entity.resultNotes,
      cancelReason: entity.cancelReason,
      rescheduledFrom: entity.rescheduledFrom,
      requestedBy: entity.requestedBy,
      confirmedBy: entity.confirmedBy,
      completedBy: entity.completedBy,
      confirmedAt: entity.confirmedAt,
      completedAt: entity.completedAt,
      cancelledAt: entity.cancelledAt,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummaryDto(entity: Inspection): InspectionSummaryDto {
    return {
      id: entity.id,
      propertyId: entity.propertyId,
      type: entity.type,
      status: entity.status,
      scheduledAt: entity.scheduledAt,
      requestedBy: entity.requestedBy,
      createdAt: entity.createdAt,
    };
  }

  static toDetailsDto(entity: Inspection): InspectionDetailsDto {
    return {
      ...this.toSummaryDto(entity),
      durationMinutes: entity.durationMinutes,
      notes: entity.notes,
      result: entity.result,
      resultNotes: entity.resultNotes,
      cancelReason: entity.cancelReason,
      rescheduledFrom: entity.rescheduledFrom,
      confirmedBy: entity.confirmedBy,
      completedBy: entity.completedBy,
      confirmedAt: entity.confirmedAt,
      completedAt: entity.completedAt,
      cancelledAt: entity.cancelledAt,
      expiresAt: entity.expiresAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateInput(dto: any, requestedBy: string): any {
    return {
      propertyId: dto.propertyId,
      type: dto.type || 'PHYSICAL',
      status: 'REQUESTED',
      scheduledAt: dto.scheduledAt,
      durationMinutes: dto.durationMinutes,
      notes: dto.notes,
      requestedBy,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.scheduledAt !== undefined) data.scheduledAt = dto.scheduledAt;
    if (dto.durationMinutes !== undefined) data.durationMinutes = dto.durationMinutes;
    if (dto.notes !== undefined) data.notes = dto.notes;
    if (dto.type !== undefined) data.type = dto.type;
    return data;
  }
}
