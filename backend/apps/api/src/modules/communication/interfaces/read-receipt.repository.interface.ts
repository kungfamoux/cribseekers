import { MessageReadReceipt } from '../entities/message-read-receipt.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IReadReceiptRepository {
  findById(id: string): Promise<MessageReadReceipt | null>;
  findOne(filters: Partial<MessageReadReceipt>): Promise<MessageReadReceipt | null>;
  findMany(
    filters?: Partial<MessageReadReceipt>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReadReceipt>>;
  create(data: Omit<MessageReadReceipt, 'id'>): Promise<MessageReadReceipt>;
  delete(id: string): Promise<void>;
  deleteByMessageId(messageId: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<MessageReadReceipt>): Promise<number>;
  findByMessage(messageId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<MessageReadReceipt>>;
  findByUser(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<MessageReadReceipt>>;
  findByConversation(conversationId: string, userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<MessageReadReceipt>>;
  markAsRead(messageId: string, userId: string): Promise<MessageReadReceipt>;
  markConversationAsRead(conversationId: string, userId: string): Promise<void>;
  getUnreadCount(conversationId: string, userId: string): Promise<number>;
  withTransaction(transaction: any): this;
}
