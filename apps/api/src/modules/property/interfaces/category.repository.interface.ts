import { PropertyCategory } from '../entities/property-category.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface ICategoryRepository {
  findById(id: string): Promise<PropertyCategory | null>;
  findOne(filters: Partial<PropertyCategory>): Promise<PropertyCategory | null>;
  findMany(filters?: Partial<PropertyCategory>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyCategory>>;
  create(data: Omit<PropertyCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyCategory>;
  update(id: string, data: Partial<Omit<PropertyCategory, 'id' | 'createdAt'>>): Promise<PropertyCategory>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<PropertyCategory>): Promise<number>;
  findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyCategory>>;
}
