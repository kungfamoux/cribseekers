import { ActivityLog } from '../entities/activity-log.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IActivityLogRepository {
  findById(id: string): Promise<ActivityLog | null>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ActivityLog>>;
  findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ActivityLog>>;
  findByRequestId(requestId: string): Promise<ActivityLog[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ActivityLog>>;
  create(data: any): Promise<ActivityLog>;
  withTransaction(transaction: any): this;
}
