import { EmailNotification } from '../entities/email-notification.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './notification.repository.interface';

export interface IEmailNotificationRepository {
  findById(id: string): Promise<EmailNotification | null>;
  findByNotificationId(notificationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>>;
  findByTo(to: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>>;
  create(data: any): Promise<EmailNotification>;
  update(id: string, data: any): Promise<EmailNotification>;
  softDelete(id: string): Promise<EmailNotification>;
  withTransaction(transaction: any): this;
}
