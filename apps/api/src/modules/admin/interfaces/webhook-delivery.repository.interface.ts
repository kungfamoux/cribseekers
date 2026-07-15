import { WebhookDelivery } from '../entities/webhook-delivery.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IWebhookDeliveryRepository {
  findById(id: string): Promise<WebhookDelivery | null>;
  findByWebhookId(webhookId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>>;
  findByEvent(event: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>>;
  findBySuccess(success: boolean, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>>;
  findPendingRetries(options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>>;
  create(data: any): Promise<WebhookDelivery>;
  update(id: string, data: any): Promise<WebhookDelivery>;
  withTransaction(transaction: any): this;
}
