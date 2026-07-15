import { Property } from '../entities/property.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IPropertyRepository {
  findById(id: string): Promise<Property | null>;
  findOne(filters: Partial<Property>): Promise<Property | null>;
  findMany(filters?: Partial<Property>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  create(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property>;
  update(id: string, data: Partial<Omit<Property, 'id' | 'createdAt'>>): Promise<Property>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<Property>): Promise<number>;
  search(query: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findByOwner(ownerId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findByCategory(categoryId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findByType(typeId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findByPurpose(purposeId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findByLocation(locationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findFeatured(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findPublished(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  findVerified(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>>;
  incrementViews(id: string): Promise<void>;
  incrementInquiries(id: string): Promise<void>;
  withTransaction(transaction: any): this;
}
