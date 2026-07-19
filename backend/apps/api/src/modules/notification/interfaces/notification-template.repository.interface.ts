import { NotificationTemplate } from '../entities/notification-template.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './notification.repository.interface';

export interface INotificationTemplateRepository {
  findById(id: string): Promise<NotificationTemplate | null>;
  findByName(name: string): Promise<NotificationTemplate | null>;
  findByType(type: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationTemplate>>;
  findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationTemplate>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationTemplate>>;
  create(data: any): Promise<NotificationTemplate>;
  update(id: string, data: any): Promise<NotificationTemplate>;
  delete(id: string): Promise<NotificationTemplate>;
  withTransaction(transaction: any): this;
}
