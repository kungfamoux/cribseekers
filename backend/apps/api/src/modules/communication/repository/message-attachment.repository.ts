import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { MessageAttachment } from '../entities/message-attachment.entity';
import { IMessageAttachmentRepository } from '../interfaces/message-attachment.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class MessageAttachmentRepository implements IMessageAttachmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<MessageAttachment | null> {
    const prismaAttachment = await this.prisma.messageAttachment.findUnique({
      where: { id },
    });
    return prismaAttachment ? this.mapToEntity(prismaAttachment) : null;
  }

  async findOne(filters: Partial<MessageAttachment>): Promise<MessageAttachment | null> {
    const { metadata, ...whereFilters } = filters;
    const prismaAttachment = await this.prisma.messageAttachment.findFirst({
      where: whereFilters,
    });
    return prismaAttachment ? this.mapToEntity(prismaAttachment) : null;
  }

  async findMany(
    filters?: Partial<MessageAttachment>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageAttachment>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;
    const { metadata, ...whereFilters } = filters || {};

    const [data, total] = await Promise.all([
      this.prisma.messageAttachment.findMany({
        where: whereFilters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.messageAttachment.count({ where: whereFilters }),
    ]);

    return {
      data: data.map((a: any) => this.mapToEntity(a)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async create(data: Omit<MessageAttachment, 'id' | 'createdAt'>): Promise<MessageAttachment> {
    const { metadata, ...createData } = data as any;
    const prismaAttachment = await this.prisma.messageAttachment.create({
      data: createData,
    });
    return this.mapToEntity(prismaAttachment);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.messageAttachment.delete({
      where: { id },
    });
  }

  async deleteByMessageId(messageId: string): Promise<void> {
    await this.prisma.messageAttachment.deleteMany({
      where: { messageId },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.messageAttachment.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<MessageAttachment>): Promise<number> {
    const { metadata, ...whereFilters } = filters || {};
    return this.prisma.messageAttachment.count({ where: whereFilters });
  }

  async findByMessage(
    messageId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageAttachment>> {
    return this.findMany({ messageId }, options);
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private mapToEntity(prismaAttachment: any): MessageAttachment {
    const entity = new MessageAttachment();
    entity.id = prismaAttachment.id;
    entity.messageId = prismaAttachment.messageId;
    entity.type = prismaAttachment.type;
    entity.url = prismaAttachment.url;
    entity.fileName = prismaAttachment.fileName;
    entity.fileSize = prismaAttachment.fileSize;
    entity.mimeType = prismaAttachment.mimeType;
    entity.thumbnailUrl = prismaAttachment.thumbnailUrl;
    entity.metadata = prismaAttachment.metadata;
    entity.createdAt = prismaAttachment.createdAt;
    return entity;
  }
}
