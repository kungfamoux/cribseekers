import { AdminAction } from '../entities/admin-action.entity';

export class AdminActionMapper {
  static toEntity(data: any): AdminAction {
    return {
      id: data.id,
      adminId: data.adminId,
      action: data.action,
      targetEntityType: data.targetEntityType,
      targetEntityId: data.targetEntityId,
      reason: data.reason,
      outcome: data.outcome,
      metadata: data.metadata,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
      createdAt: data.createdAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      adminId: data.adminId,
      action: data.action,
      targetEntityType: data.targetEntityType,
      targetEntityId: data.targetEntityId,
      reason: data.reason,
      outcome: data.outcome,
      metadata: data.metadata,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
    };
  }
}
