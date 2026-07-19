import { Notification } from '../entities/notification.entity';

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

export interface INotificationRepository {
  findById(id: string): Promise<Notification | null>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  findByType(type: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  findByPriority(priority: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  findUnread(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  findExpired(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>>;
  create(data: any): Promise<Notification>;
  update(id: string, data: any): Promise<Notification>;
  markAsRead(id: string): Promise<Notification>;
  markAsDismissed(id: string): Promise<Notification>;
  withTransaction(transaction: any): this;
}
