import { TypingIndicator } from '../entities/typing-indicator.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface ITypingRepository {
  findById(id: string): Promise<TypingIndicator | null>;
  findOne(filters: Partial<TypingIndicator>): Promise<TypingIndicator | null>;
  findMany(
    filters?: Partial<TypingIndicator>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<TypingIndicator>>;
  create(data: Omit<TypingIndicator, 'id' | 'createdAt' | 'updatedAt'>): Promise<TypingIndicator>;
  update(id: string, data: Partial<Omit<TypingIndicator, 'id' | 'createdAt'>>): Promise<TypingIndicator>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<TypingIndicator>): Promise<number>;
  findByConversation(conversationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<TypingIndicator>>;
  findByUser(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<TypingIndicator>>;
  startTyping(conversationId: string, userId: string): Promise<TypingIndicator>;
  stopTyping(conversationId: string, userId: string): Promise<void>;
  expireOldIndicators(): Promise<void>;
  withTransaction(transaction: any): this;
}
