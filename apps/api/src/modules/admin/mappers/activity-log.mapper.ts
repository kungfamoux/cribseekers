import { ActivityLog } from '../entities/activity-log.entity';

export class ActivityLogMapper {
  static toEntity(data: any): ActivityLog {
    return {
      id: data.id,
      userId: data.userId,
      action: data.action,
      description: data.description,
      metadata: data.metadata,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
      createdAt: data.createdAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      userId: data.userId,
      action: data.action,
      description: data.description,
      metadata: data.metadata,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
    };
  }
}
