import { Message } from '../entities/message.entity';
import { MessageFilter } from '../types/message-filter.type';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IMessageRepository {
  findById(id: string): Promise<Message | null>;
  findOne(filters: Partial<Message>): Promise<Message | null>;
  findMany(
    filters?: MessageFilter,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Message>>;
  create(data: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message>;
  update(id: string, data: Partial<Omit<Message, 'id' | 'createdAt'>>): Promise<Message>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<Message>;
  exists(id: string): Promise<boolean>;
  count(filters?: MessageFilter): Promise<number>;
  search(query: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Message>>;
  findByConversation(conversationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Message>>;
  findBySender(senderId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Message>>;
  findPinned(conversationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Message>>;
  markAsDelivered(messageIds: string[]): Promise<void>;
  markAsRead(messageIds: string[], userId: string): Promise<void>;
  withTransaction(transaction: any): this;
}
