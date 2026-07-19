import { PropertyHistory } from '../entities/property-history.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface IPropertyHistoryRepository {
  findById(id: string): Promise<PropertyHistory | null>;
  findByPropertyId(propertyId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>>;
  findMany(filters?: Partial<PropertyHistory>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>>;
  create(data: Omit<PropertyHistory, 'id' | 'createdAt'>): Promise<PropertyHistory>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<PropertyHistory>): Promise<number>;
  findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>>;
  findByPerformedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>>;
  withTransaction(transaction: any): this;
}
