import { Webhook } from '../entities/webhook.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IWebhookRepository {
  findById(id: string): Promise<Webhook | null>;
  findByUrl(url: string): Promise<Webhook | null>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Webhook>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Webhook>>;
  create(data: any): Promise<Webhook>;
  update(id: string, data: any): Promise<Webhook>;
  delete(id: string): Promise<Webhook>;
  withTransaction(transaction: any): this;
}
