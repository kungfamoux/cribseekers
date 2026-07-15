import { SMSNotification } from '../entities/sms-notification.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './notification.repository.interface';

export interface ISMSNotificationRepository {
  findById(id: string): Promise<SMSNotification | null>;
  findByNotificationId(notificationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>>;
  findByTo(to: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>>;
  create(data: any): Promise<SMSNotification>;
  update(id: string, data: any): Promise<SMSNotification>;
  softDelete(id: string): Promise<SMSNotification>;
  withTransaction(transaction: any): this;
}
