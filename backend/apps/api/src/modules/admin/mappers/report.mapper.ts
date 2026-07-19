import { Report } from '../entities/report.entity';

export class ReportMapper {
  static toEntity(data: any): Report {
    return {
      id: data.id,
      categoryId: data.categoryId,
      reportedBy: data.reportedBy,
      entityType: data.entityType,
      entityId: data.entityId,
      reason: data.reason,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignedTo: data.assignedTo,
      resolvedBy: data.resolvedBy,
      resolvedAt: data.resolvedAt,
      resolution: data.resolution,
      metadata: data.metadata,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      categoryId: data.categoryId,
      reportedBy: data.reportedBy,
      entityType: data.entityType,
      entityId: data.entityId,
      reason: data.reason,
      description: data.description,
      status: data.status,
      priority: data.priority,
      metadata: data.metadata,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      status: data.status,
      assignedTo: data.assignedTo,
      resolvedBy: data.resolvedBy,
      resolvedAt: data.resolvedAt,
      resolution: data.resolution,
      metadata: data.metadata,
    };
  }
}
