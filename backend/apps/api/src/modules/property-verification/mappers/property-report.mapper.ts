import { PropertyReport } from '../entities/property-report.entity';

export class PropertyReportMapper {
  static toEntity(prismaReport: any): PropertyReport {
    const entity = new PropertyReport();
    entity.id = prismaReport.id;
    entity.propertyId = prismaReport.propertyId;
    entity.reportedBy = prismaReport.reportedBy;
    entity.reason = prismaReport.reason;
    entity.description = prismaReport.description;
    entity.status = prismaReport.status;
    entity.reviewedBy = prismaReport.reviewedBy;
    entity.reviewedAt = prismaReport.reviewedAt;
    entity.resolution = prismaReport.resolution;
    entity.createdAt = prismaReport.createdAt;
    entity.updatedAt = prismaReport.updatedAt;
    entity.deletedAt = prismaReport.deletedAt;
    return entity;
  }

  static toCreateInput(data: Omit<PropertyReport, 'id' | 'createdAt' | 'updatedAt'>): any {
    return {
      propertyId: data.propertyId,
      reportedBy: data.reportedBy,
      reason: data.reason,
      description: data.description,
      status: data.status || 'PENDING',
    };
  }

  static toUpdateInput(data: Partial<any>): any {
    const input: any = {};
    if (data.status !== undefined) input.status = data.status;
    if (data.reviewedBy !== undefined) input.reviewedBy = data.reviewedBy;
    if (data.reviewedAt !== undefined) input.reviewedAt = data.reviewedAt;
    if (data.resolution !== undefined) input.resolution = data.resolution;
    return input;
  }
}
