import { Role } from '../entities/role.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IRoleRepository {
  findById(id: string): Promise<Role | null>;
  findOne(filters: Partial<Role>): Promise<Role | null>;
  findMany(filters?: Partial<Role>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Role>>;
  create(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role>;
  update(id: string, data: Partial<Omit<Role, 'id' | 'createdAt'>>): Promise<Role>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<Role>): Promise<number>;
  paginate(options: PaginationOptions): Promise<PaginationResult<Role>>;
  findByName(name: string): Promise<Role | null>;
  findByType(type: string): Promise<Role[]>;
}
