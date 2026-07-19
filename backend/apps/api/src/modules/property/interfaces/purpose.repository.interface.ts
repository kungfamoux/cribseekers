import { PropertyPurpose } from '../entities/property-purpose.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface IPurposeRepository {
  findById(id: string): Promise<PropertyPurpose | null>;
  findOne(filters: Partial<PropertyPurpose>): Promise<PropertyPurpose | null>;
  findMany(filters?: Partial<PropertyPurpose>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyPurpose>>;
  create(data: Omit<PropertyPurpose, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyPurpose>;
  update(id: string, data: Partial<Omit<PropertyPurpose, 'id' | 'createdAt'>>): Promise<PropertyPurpose>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<PropertyPurpose>): Promise<number>;
  findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyPurpose>>;
}
