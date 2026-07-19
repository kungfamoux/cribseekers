import { ReportCategory } from '../entities/report-category.entity';

export class ReportCategoryMapper {
  static toEntity(data: any): ReportCategory {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      sortOrder: data.sortOrder,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      sortOrder: data.sortOrder,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      sortOrder: data.sortOrder,
    };
  }
}
