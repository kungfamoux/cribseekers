import { AdminAction } from '../entities/admin-action.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IAdminActionRepository {
  findById(id: string): Promise<AdminAction | null>;
  findByAdminId(adminId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>>;
  findByTargetEntity(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>>;
  findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>>;
  create(data: any): Promise<AdminAction>;
  withTransaction(transaction: any): this;
}
