import { MessageAttachment } from '../entities/message-attachment.entity';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

export interface IMessageAttachmentRepository {
  findById(id: string): Promise<MessageAttachment | null>;
  findOne(filters: Partial<MessageAttachment>): Promise<MessageAttachment | null>;
  findMany(
    filters?: Partial<MessageAttachment>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageAttachment>>;
  create(data: Omit<MessageAttachment, 'id' | 'createdAt'>): Promise<MessageAttachment>;
  delete(id: string): Promise<void>;
  deleteByMessageId(messageId: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(filters?: Partial<MessageAttachment>): Promise<number>;
  findByMessage(messageId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<MessageAttachment>>;
  withTransaction(transaction: any): this;
}
