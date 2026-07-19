import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { MessageReadReceipt } from '../entities/message-read-receipt.entity';
import { IReadReceiptRepository } from '../interfaces/read-receipt.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class ReadReceiptRepository implements IReadReceiptRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<MessageReadReceipt | null> {
    const prismaReceipt = await this.prisma.messageReadReceipt.findUnique({
      where: { id },
    });
    return prismaReceipt ? this.mapToEntity(prismaReceipt) : null;
  }

  async findOne(filters: Partial<MessageReadReceipt>): Promise<MessageReadReceipt | null> {
    const prismaReceipt = await this.prisma.messageReadReceipt.findFirst({
      where: filters,
    });
    return prismaReceipt ? this.mapToEntity(prismaReceipt) : null;
  }

  async findMany(
    filters?: Partial<MessageReadReceipt>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReadReceipt>> {
    const { page = 1, limit = 20, sortBy = 'readAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.messageReadReceipt.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.messageReadReceipt.count({ where: filters }),
    ]);

    return {
      data: data.map((r: any) => this.mapToEntity(r)),
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

  async create(data: Omit<MessageReadReceipt, 'id'>): Promise<MessageReadReceipt> {
    const prismaReceipt = await this.prisma.messageReadReceipt.create({
      data,
    });
    return this.mapToEntity(prismaReceipt);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.messageReadReceipt.delete({
      where: { id },
    });
  }

  async deleteByMessageId(messageId: string): Promise<void> {
    await this.prisma.messageReadReceipt.deleteMany({
      where: { messageId },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.messageReadReceipt.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<MessageReadReceipt>): Promise<number> {
    return this.prisma.messageReadReceipt.count({ where: filters });
  }

  async findByMessage(
    messageId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReadReceipt>> {
    return this.findMany({ messageId }, options);
  }

  async findByUser(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReadReceipt>> {
    return this.findMany({ userId }, options);
  }

  async findByConversation(
    conversationId: string,
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReadReceipt>> {
    const { page = 1, limit = 20, sortBy = 'readAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.messageReadReceipt.findMany({
        where: {
          message: {
            conversationId,
          },
          userId,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.messageReadReceipt.count({
        where: {
          message: {
            conversationId,
          },
          userId,
        },
      }),
    ]);

    return {
      data: data.map((r: any) => this.mapToEntity(r)),
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

  async markAsRead(messageId: string, userId: string): Promise<MessageReadReceipt> {
    const existing = await this.findOne({ messageId, userId });
    
    if (existing) {
      return existing;
    }

    return this.create({
      messageId,
      userId,
      readAt: new Date(),
    });
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    const unreadMessages = await this.prisma.message.findMany({
      where: {
        conversationId,
        senderId: { not: userId },
        status: { not: 'READ' },
      },
      select: { id: true },
    });

    for (const message of unreadMessages) {
      await this.markAsRead(message.id, userId);
    }
  }

  async getUnreadCount(conversationId: string, userId: string): Promise<number> {
    return this.prisma.message.count({
      where: {
        conversationId,
        senderId: { not: userId },
        status: { not: 'READ' },
      },
    });
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private mapToEntity(prismaReceipt: any): MessageReadReceipt {
    const entity = new MessageReadReceipt();
    entity.id = prismaReceipt.id;
    entity.messageId = prismaReceipt.messageId;
    entity.userId = prismaReceipt.userId;
    entity.readAt = prismaReceipt.readAt;
    return entity;
  }
}
