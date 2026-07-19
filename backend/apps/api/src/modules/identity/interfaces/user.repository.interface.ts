import { User } from '../entities/user.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findOne(filters: Partial<User>): Promise<User | null>;
  findMany(filters?: Partial<User>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<User>>;
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<User>): Promise<number>;
  paginate(options: PaginationOptions): Promise<PaginationResult<User>>;
  search(query: string, options?: PaginationOptions): Promise<PaginationResult<User>>;
  findByEmail(email: string): Promise<User | null>;
  findByPhoneNumber(phoneNumber: string): Promise<User | null>;
  findByEmailOrPhone(email?: string, phoneNumber?: string): Promise<User | null>;
}
