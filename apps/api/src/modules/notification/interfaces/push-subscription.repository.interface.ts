import { PushSubscription } from '../entities/push-subscription.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './notification.repository.interface';

export interface IPushSubscriptionRepository {
  findById(id: string): Promise<PushSubscription | null>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PushSubscription>>;
  findByEndpoint(endpoint: string): Promise<PushSubscription | null>;
  findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PushSubscription>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PushSubscription>>;
  create(data: any): Promise<PushSubscription>;
  update(id: string, data: any): Promise<PushSubscription>;
  delete(id: string): Promise<PushSubscription>;
  withTransaction(transaction: any): this;
}
