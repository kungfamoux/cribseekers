import { InspectionParticipant } from '../entities/inspection-participant.entity';

export class InspectionParticipantMapper {
  static toEntity(data: any): InspectionParticipant {
    return {
      id: data.id,
      inspectionId: data.inspectionId,
      userId: data.userId,
      role: data.role,
      status: data.status,
      joinedAt: data.joinedAt,
      leftAt: data.leftAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(inspectionId: string, userId: string, role: string): any {
    return {
      inspectionId,
      userId,
      role,
      status: 'PENDING',
    };
  }
}
