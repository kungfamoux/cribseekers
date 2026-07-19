import { PropertyType } from '../entities/property-type.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface ITypeRepository {
  findById(id: string): Promise<PropertyType | null>;
  findOne(filters: Partial<PropertyType>): Promise<PropertyType | null>;
  findMany(filters?: Partial<PropertyType>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyType>>;
  create(data: Omit<PropertyType, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyType>;
  update(id: string, data: Partial<Omit<PropertyType, 'id' | 'createdAt'>>): Promise<PropertyType>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<PropertyType>): Promise<number>;
  findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyType>>;
}
