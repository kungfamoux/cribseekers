import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { TypingIndicator } from '../entities/typing-indicator.entity';
import { ITypingRepository } from '../interfaces/typing.repository.interface';
import { COMMUNICATION_CONSTANTS } from '../constants/communication.constants';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class TypingRepository implements ITypingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<TypingIndicator | null> {
    const prismaTyping = await this.prisma.typingIndicator.findUnique({
      where: { id },
    });
    return prismaTyping ? this.mapToEntity(prismaTyping) : null;
  }

  async findOne(filters: Partial<TypingIndicator>): Promise<TypingIndicator | null> {
    const prismaTyping = await this.prisma.typingIndicator.findFirst({
      where: filters,
    });
    return prismaTyping ? this.mapToEntity(prismaTyping) : null;
  }

  async findMany(
    filters?: Partial<TypingIndicator>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<TypingIndicator>> {
    const { page = 1, limit = 20, sortBy = 'lastTypedAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.typingIndicator.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.typingIndicator.count({ where: filters }),
    ]);

    return {
      data: data.map((t: any) => this.mapToEntity(t)),
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

  async create(data: Omit<TypingIndicator, 'id' | 'createdAt' | 'updatedAt'>): Promise<TypingIndicator> {
    const prismaTyping = await this.prisma.typingIndicator.create({
      data,
    });
    return this.mapToEntity(prismaTyping);
  }

  async update(id: string, data: Partial<Omit<TypingIndicator, 'id' | 'createdAt'>>): Promise<TypingIndicator> {
    const prismaTyping = await this.prisma.typingIndicator.update({
      where: { id },
      data,
    });
    return this.mapToEntity(prismaTyping);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.typingIndicator.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.typingIndicator.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<TypingIndicator>): Promise<number> {
    return this.prisma.typingIndicator.count({ where: filters });
  }

  async findByConversation(
    conversationId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<TypingIndicator>> {
    return this.findMany({ conversationId }, options);
  }

  async findByUser(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<TypingIndicator>> {
    return this.findMany({ userId }, options);
  }

  async startTyping(conversationId: string, userId: string): Promise<TypingIndicator> {
    const existing = await this.findOne({ conversationId, userId });
    
    if (existing) {
      return this.update(existing.id, {
        isTyping: true,
        lastTypedAt: new Date(),
      });
    }

    return this.create({
      conversationId,
      userId,
      isTyping: true,
      lastTypedAt: new Date(),
    });
  }

  async stopTyping(conversationId: string, userId: string): Promise<void> {
    const existing = await this.findOne({ conversationId, userId });
    if (existing) {
      await this.update(existing.id, { isTyping: false });
    }
  }

  async expireOldIndicators(): Promise<void> {
    const expiryDate = new Date(Date.now() - COMMUNICATION_CONSTANTS.TYPING_INDICATOR_EXPIRY);
    await this.prisma.typingIndicator.deleteMany({
      where: {
        lastTypedAt: { lt: expiryDate },
      },
    });
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private mapToEntity(prismaTyping: any): TypingIndicator {
    const entity = new TypingIndicator();
    entity.id = prismaTyping.id;
    entity.conversationId = prismaTyping.conversationId;
    entity.userId = prismaTyping.userId;
    entity.isTyping = prismaTyping.isTyping;
    entity.lastTypedAt = prismaTyping.lastTypedAt;
    entity.createdAt = prismaTyping.createdAt;
    entity.updatedAt = prismaTyping.updatedAt;
    return entity;
  }
}
