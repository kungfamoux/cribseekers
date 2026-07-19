import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Message } from '../entities/message.entity';
import { IMessageRepository } from '../interfaces/message.repository.interface';
import { MessageFilter } from '../types/message-filter.type';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Message | null> {
    const prismaMessage = await this.prisma.message.findUnique({
      where: { id },
      include: {
        attachments: true,
        reactions: true,
      },
    });
    return prismaMessage ? this.mapToEntity(prismaMessage) : null;
  }

  async findOne(filters: Partial<Message>): Promise<Message | null> {
    const { attachments, reactions, ...whereFilters } = filters;
    const prismaMessage = await this.prisma.message.findFirst({
      where: whereFilters,
      include: {
        attachments: true,
        reactions: true,
      },
    });
    return prismaMessage ? this.mapToEntity(prismaMessage) : null;
  }

  async findMany(
    filters?: MessageFilter,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Message>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          attachments: true,
          reactions: true,
        },
      }),
      this.prisma.message.count({ where }),
    ]);

    return {
      data: data.map((m: any) => this.mapToEntity(m)),
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

  async create(data: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message> {
    const { attachments, reactions, ...messageData } = data;
    const prismaMessage = await this.prisma.message.create({
      data: messageData,
      include: {
        attachments: true,
        reactions: true,
      },
    });
    return this.mapToEntity(prismaMessage);
  }

  async update(id: string, data: Partial<Omit<Message, 'id' | 'createdAt'>>): Promise<Message> {
    const { attachments, reactions, ...updateData } = data;
    const prismaMessage = await this.prisma.message.update({
      where: { id },
      data: updateData,
      include: {
        attachments: true,
        reactions: true,
      },
    });
    return this.mapToEntity(prismaMessage);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.message.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<Message> {
    const prismaMessage = await this.prisma.message.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: {
        attachments: true,
        reactions: true,
      },
    });
    return this.mapToEntity(prismaMessage);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.message.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: MessageFilter): Promise<number> {
    const where = this.buildWhereClause(filters);
    return this.prisma.message.count({ where });
  }

  async search(
    query: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Message>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = {
      content: { contains: query, mode: 'insensitive' as const },
      deletedAt: null,
    };

    const [data, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          attachments: true,
          reactions: true,
        },
      }),
      this.prisma.message.count({ where }),
    ]);

    return {
      data: data.map((m: any) => this.mapToEntity(m)),
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

  async findByConversation(
    conversationId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Message>> {
    return this.findMany({ conversationId }, options);
  }

  async findBySender(
    senderId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Message>> {
    return this.findMany({ senderId }, options);
  }

  async findPinned(
    conversationId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Message>> {
    return this.findMany({ conversationId, pinned: true }, options);
  }

  async markAsDelivered(messageIds: string[]): Promise<void> {
    await this.prisma.message.updateMany({
      where: { id: { in: messageIds } },
      data: { status: 'DELIVERED' },
    });
  }

  async markAsRead(messageIds: string[], _userId: string): Promise<void> {
    await this.prisma.message.updateMany({
      where: { id: { in: messageIds } },
      data: { status: 'READ' },
    });
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private buildWhereClause(filters?: MessageFilter): any {
    if (!filters) return { deletedAt: null };

    const where: any = { deletedAt: null };

    if (filters.conversationId) where.conversationId = filters.conversationId;
    if (filters.senderId) where.senderId = filters.senderId;
    if (filters.status) where.status = filters.status;
    if (filters.replyToId) where.replyToId = filters.replyToId;
    if (filters.hasAttachments) {
      where.attachments = {
        some: {},
      };
    }
    if (filters.search) {
      where.content = { contains: filters.search, mode: 'insensitive' };
    }
    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    return where;
  }

  private mapToEntity(prismaMessage: any): Message {
    const entity = new Message();
    entity.id = prismaMessage.id;
    entity.conversationId = prismaMessage.conversationId;
    entity.senderId = prismaMessage.senderId;
    entity.content = prismaMessage.content;
    entity.status = prismaMessage.status;
    entity.replyToId = prismaMessage.replyToId;
    entity.editedAt = prismaMessage.editedAt;
    entity.deletedAt = prismaMessage.deletedAt;
    entity.createdAt = prismaMessage.createdAt;
    entity.updatedAt = prismaMessage.updatedAt;
    entity.attachments = prismaMessage.attachments;
    entity.reactions = prismaMessage.reactions;
    return entity;
  }
}
