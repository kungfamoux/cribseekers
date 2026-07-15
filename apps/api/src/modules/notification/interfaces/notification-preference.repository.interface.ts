import { NotificationPreference } from '../entities/notification-preference.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './notification.repository.interface';

export interface INotificationPreferenceRepository {
  findById(id: string): Promise<NotificationPreference | null>;
  findByUserId(userId: string): Promise<NotificationPreference | null>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationPreference>>;
  create(data: any): Promise<NotificationPreference>;
  update(id: string, data: any): Promise<NotificationPreference>;
  delete(id: string): Promise<NotificationPreference>;
  withTransaction(transaction: any): this;
}
