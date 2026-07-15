import { AuditLog } from '../entities/audit-log.entity';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface SortOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface IAuditLogRepository {
  findById(id: string): Promise<AuditLog | null>;
  findByActorId(actorId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>>;
  findByEntityType(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>>;
  findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>>;
  findByRequestId(requestId: string): Promise<AuditLog[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>>;
  create(data: any): Promise<AuditLog>;
  withTransaction(transaction: any): this;
}
