import { Conversation } from '../entities/conversation.entity';
import { ConversationFilter } from '../types/conversation-filter.type';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IConversationRepository {
  findById(id: string): Promise<Conversation | null>;
  findOne(filters: Partial<Conversation>): Promise<Conversation | null>;
  findMany(
    filters?: ConversationFilter,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>>;
  create(data: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Conversation>;
  update(id: string, data: Partial<Omit<Conversation, 'id' | 'createdAt'>>): Promise<Conversation>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: ConversationFilter): Promise<number>;
  search(query: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Conversation>>;
  findByProperty(propertyId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Conversation>>;
  findByInspection(inspectionId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Conversation>>;
  findByUser(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Conversation>>;
  archive(id: string, userId: string): Promise<Conversation>;
  unarchive(id: string): Promise<Conversation>;
  findByParticipants(userIds: string[], options?: PaginationOptions & SortOptions): Promise<PaginationResult<Conversation>>;
  withTransaction(transaction: any): this;
}
