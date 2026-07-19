import { ReportCategory } from '../entities/report-category.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IReportCategoryRepository {
  findById(id: string): Promise<ReportCategory | null>;
  findByName(name: string): Promise<ReportCategory | null>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ReportCategory>>;
  create(data: any): Promise<ReportCategory>;
  update(id: string, data: any): Promise<ReportCategory>;
  delete(id: string): Promise<ReportCategory>;
  withTransaction(transaction: any): this;
}
