import { ApiKey } from '../entities/api-key.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IApiKeyRepository {
  findById(id: string): Promise<ApiKey | null>;
  findByKey(key: string): Promise<ApiKey | null>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ApiKey>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ApiKey>>;
  create(data: any): Promise<ApiKey>;
  update(id: string, data: any): Promise<ApiKey>;
  delete(id: string): Promise<ApiKey>;
  withTransaction(transaction: any): this;
}
