import { BlockedConversation } from '../entities/blocked-conversation.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IBlockedConversationRepository {
  findById(id: string): Promise<BlockedConversation | null>;
  findOne(filters: Partial<BlockedConversation>): Promise<BlockedConversation | null>;
  findMany(
    filters?: Partial<BlockedConversation>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<BlockedConversation>>;
  create(data: Omit<BlockedConversation, 'id' | 'blockedAt'>): Promise<BlockedConversation>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<BlockedConversation>): Promise<number>;
  findByConversation(conversationId: string): Promise<BlockedConversation | null>;
  findByBlockedUser(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BlockedConversation>>;
  findByBlocker(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BlockedConversation>>;
  isBlocked(conversationId: string, userId: string): Promise<boolean>;
  withTransaction(transaction: any): this;
}
