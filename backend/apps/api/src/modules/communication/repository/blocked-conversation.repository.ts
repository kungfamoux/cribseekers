import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { BlockedConversation } from '../entities/blocked-conversation.entity';
import { IBlockedConversationRepository } from '../interfaces/blocked-conversation.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class BlockedConversationRepository implements IBlockedConversationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<BlockedConversation | null> {
    const prismaBlocked = await this.prisma.blockedConversation.findUnique({
      where: { id },
    });
    return prismaBlocked ? this.mapToEntity(prismaBlocked) : null;
  }

  async findOne(filters: Partial<BlockedConversation>): Promise<BlockedConversation | null> {
    const prismaBlocked = await this.prisma.blockedConversation.findFirst({
      where: filters,
    });
    return prismaBlocked ? this.mapToEntity(prismaBlocked) : null;
  }

  async findMany(
    filters?: Partial<BlockedConversation>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<BlockedConversation>> {
    const { page = 1, limit = 20, sortBy = 'blockedAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.blockedConversation.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.blockedConversation.count({ where: filters }),
    ]);

    return {
      data: data.map((b: any) => this.mapToEntity(b)),
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

  async create(data: Omit<BlockedConversation, 'id' | 'blockedAt'>): Promise<BlockedConversation> {
    const prismaBlocked = await this.prisma.blockedConversation.create({
      data,
    });
    return this.mapToEntity(prismaBlocked);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.blockedConversation.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.blockedConversation.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<BlockedConversation>): Promise<number> {
    return this.prisma.blockedConversation.count({ where: filters });
  }

  async findByConversation(conversationId: string): Promise<BlockedConversation | null> {
    const prismaBlocked = await this.prisma.blockedConversation.findUnique({
      where: { conversationId },
    });
    return prismaBlocked ? this.mapToEntity(prismaBlocked) : null;
  }

  async findByBlockedUser(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<BlockedConversation>> {
    return this.findMany({ blockedUserId: userId }, options);
  }

  async findByBlocker(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<BlockedConversation>> {
    return this.findMany({ blockedBy: userId }, options);
  }

  async isBlocked(conversationId: string, userId: string): Promise<boolean> {
    const blocked = await this.findByConversation(conversationId);
    if (!blocked) return false;
    return blocked.blockedBy === userId || blocked.blockedUserId === userId;
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private mapToEntity(prismaBlocked: any): BlockedConversation {
    const entity = new BlockedConversation();
    entity.id = prismaBlocked.id;
    entity.conversationId = prismaBlocked.conversationId;
    entity.blockedBy = prismaBlocked.blockedBy;
    entity.blockedUserId = prismaBlocked.blockedUserId;
    entity.reason = prismaBlocked.reason;
    entity.blockedAt = prismaBlocked.blockedAt;
    return entity;
  }
}
