import { PropertyReport } from '../entities/property-report.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface IPropertyReportRepository {
  findById(id: string): Promise<PropertyReport | null>;
  findByPropertyId(propertyId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>>;
  findByReporter(reporterId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>>;
  findMany(filters?: Partial<PropertyReport>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>>;
  create(data: Omit<PropertyReport, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyReport>;
  update(id: string, data: Partial<Omit<PropertyReport, 'id' | 'createdAt'>>): Promise<PropertyReport>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<PropertyReport>): Promise<number>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>>;
  hasUserReportedProperty(propertyId: string, userId: string): Promise<boolean>;
  withTransaction(transaction: any): this;
}
