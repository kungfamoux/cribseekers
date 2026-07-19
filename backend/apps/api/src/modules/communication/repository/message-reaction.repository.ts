import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { MessageReaction } from '../entities/message-reaction.entity';
import { IMessageReactionRepository } from '../interfaces/message-reaction.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class MessageReactionRepository implements IMessageReactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<MessageReaction | null> {
    const prismaReaction = await this.prisma.messageReaction.findUnique({
      where: { id },
    });
    return prismaReaction ? this.mapToEntity(prismaReaction) : null;
  }

  async findOne(filters: Partial<MessageReaction>): Promise<MessageReaction | null> {
    const prismaReaction = await this.prisma.messageReaction.findFirst({
      where: filters,
    });
    return prismaReaction ? this.mapToEntity(prismaReaction) : null;
  }

  async findMany(
    filters?: Partial<MessageReaction>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReaction>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.messageReaction.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.messageReaction.count({ where: filters }),
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

  async create(data: Omit<MessageReaction, 'id' | 'createdAt'>): Promise<MessageReaction> {
    const prismaReaction = await this.prisma.messageReaction.create({
      data,
    });
    return this.mapToEntity(prismaReaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.messageReaction.delete({
      where: { id },
    });
  }

  async deleteByMessageId(messageId: string): Promise<void> {
    await this.prisma.messageReaction.deleteMany({
      where: { messageId },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.messageReaction.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<MessageReaction>): Promise<number> {
    return this.prisma.messageReaction.count({ where: filters });
  }

  async findByMessage(
    messageId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReaction>> {
    return this.findMany({ messageId }, options);
  }

  async findByUser(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<MessageReaction>> {
    return this.findMany({ userId }, options);
  }

  async findByMessageAndUser(messageId: string, userId: string): Promise<MessageReaction | null> {
    const prismaReaction = await this.prisma.messageReaction.findFirst({
      where: { messageId, userId },
    });
    return prismaReaction ? this.mapToEntity(prismaReaction) : null;
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private mapToEntity(prismaReaction: any): MessageReaction {
    const entity = new MessageReaction();
    entity.id = prismaReaction.id;
    entity.messageId = prismaReaction.messageId;
    entity.userId = prismaReaction.userId;
    entity.reaction = prismaReaction.reaction;
    entity.createdAt = prismaReaction.createdAt;
    return entity;
  }
}
