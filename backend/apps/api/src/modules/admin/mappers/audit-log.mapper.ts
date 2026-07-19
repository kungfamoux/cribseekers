import { AuditLog } from '../entities/audit-log.entity';

export class AuditLogMapper {
  static toEntity(data: any): AuditLog {
    return {
      id: data.id,
      actorId: data.actorId,
      actorType: data.actorType,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      changes: data.changes,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
      metadata: data.metadata,
      createdAt: data.createdAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      actorId: data.actorId,
      actorType: data.actorType,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      changes: data.changes,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
      metadata: data.metadata,
    };
  }
}
