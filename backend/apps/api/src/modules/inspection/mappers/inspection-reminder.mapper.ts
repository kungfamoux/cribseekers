import { InspectionReminder } from '../entities/inspection-reminder.entity';

export class InspectionReminderMapper {
  static toEntity(data: any): InspectionReminder {
    return {
      id: data.id,
      inspectionId: data.inspectionId,
      userId: data.userId,
      remindAt: data.remindAt,
      status: data.status,
      sentAt: data.sentAt,
      method: data.method,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(inspectionId: string, userId: string, remindAt: Date, method: string): any {
    return {
      inspectionId,
      userId,
      remindAt,
      status: 'PENDING',
      method,
    };
  }
}
