import { InspectionSchedule } from '../entities/inspection-schedule.entity';

export class InspectionScheduleMapper {
  static toEntity(data: any): InspectionSchedule {
    return {
      id: data.id,
      inspectionId: data.inspectionId,
      startTime: data.startTime,
      endTime: data.endTime,
      isAvailable: data.isAvailable,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(inspectionId: string, startTime: Date, endTime: Date): any {
    return {
      inspectionId,
      startTime,
      endTime,
      isAvailable: true,
    };
  }
}
