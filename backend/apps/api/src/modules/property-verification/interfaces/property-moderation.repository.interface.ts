import { PropertyModeration } from '../entities/property-moderation.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface IPropertyModerationRepository {
  findById(id: string): Promise<PropertyModeration | null>;
  findByPropertyId(propertyId: string): Promise<PropertyModeration | null>;
  findMany(filters?: Partial<PropertyModeration>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyModeration>>;
  create(data: Omit<PropertyModeration, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyModeration>;
  update(id: string, data: Partial<Omit<PropertyModeration, 'id' | 'createdAt'>>): Promise<PropertyModeration>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<PropertyModeration>): Promise<number>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyModeration>>;
  findByReviewer(reviewerId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyModeration>>;
  withTransaction(transaction: any): this;
}
