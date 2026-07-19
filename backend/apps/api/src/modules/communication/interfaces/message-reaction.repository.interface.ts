import { MessageReaction } from '../entities/message-reaction.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IMessageReactionRepository {
  findById(id: string): Promise<MessageReaction | null>;
  findOne(filters: Partial<MessageReaction>): Promise<MessageReaction | null>;
  findMany(
    filters?: Partial<MessageReaction>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReaction>>;
  create(data: Omit<MessageReaction, 'id' | 'createdAt'>): Promise<MessageReaction>;
  delete(id: string): Promise<void>;
  deleteByMessageId(messageId: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<MessageReaction>): Promise<number>;
  findByMessage(messageId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<MessageReaction>>;
  findByUser(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<MessageReaction>>;
  findByMessageAndUser(messageId: string, userId: string): Promise<MessageReaction | null>;
  withTransaction(transaction: any): this;
}
