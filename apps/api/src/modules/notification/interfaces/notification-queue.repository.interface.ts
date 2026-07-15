import { NotificationQueue } from '../entities/notification-queue.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './notification.repository.interface';

export interface INotificationQueueRepository {
  findById(id: string): Promise<NotificationQueue | null>;
  findByNotificationId(notificationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  findByChannel(channel: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  findPending(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  findFailed(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  findRetryable(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>>;
  create(data: any): Promise<NotificationQueue>;
  update(id: string, data: any): Promise<NotificationQueue>;
  softDelete(id: string): Promise<NotificationQueue>;
  withTransaction(transaction: any): this;
}
