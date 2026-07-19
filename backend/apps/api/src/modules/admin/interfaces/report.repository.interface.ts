import { Report } from '../entities/report.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IReportRepository {
  findById(id: string): Promise<Report | null>;
  findByCategory(categoryId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Report>>;
  findByReportedBy(reportedBy: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Report>>;
  findByEntity(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Report>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Report>>;
  findByAssignedTo(assignedTo: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Report>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Report>>;
  create(data: any): Promise<Report>;
  update(id: string, data: any): Promise<Report>;
  withTransaction(transaction: any): this;
}
