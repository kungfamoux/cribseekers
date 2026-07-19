import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Conversation } from '../entities/conversation.entity';
import { IConversationRepository } from '../interfaces/conversation.repository.interface';
import { ConversationFilter } from '../types/conversation-filter.type';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class ConversationRepository implements IConversationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Conversation | null> {
    const prismaConversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: true,
      },
    });
    return prismaConversation ? this.mapToEntity(prismaConversation) : null;
  }

  async findOne(filters: Partial<Conversation>): Promise<Conversation | null> {
    const { participants, ...whereFilters } = filters;
    const prismaConversation = await this.prisma.conversation.findFirst({
      where: whereFilters,
      include: {
        participants: true,
      },
    });
    return prismaConversation ? this.mapToEntity(prismaConversation) : null;
  }

  async findMany(
    filters?: ConversationFilter,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          participants: true,
        },
      }),
      this.prisma.conversation.count({ where }),
    ]);

    return {
      data: data.map((c: any) => this.mapToEntity(c)),
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

  async create(data: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Conversation> {
    const { participants, ...conversationData } = data;
    const prismaConversation = await this.prisma.conversation.create({
      data: {
        ...conversationData,
        participants: participants
          ? {
              create: participants.map((p: any) => ({
                userId: p.userId,
                role: p.role || 'PARTICIPANT',
              })),
            }
          : undefined,
      },
      include: {
        participants: true,
      },
    });
    return this.mapToEntity(prismaConversation);
  }

  async update(id: string, data: Partial<Omit<Conversation, 'id' | 'createdAt'>>): Promise<Conversation> {
    const { participants, ...updateData } = data;
    const prismaConversation = await this.prisma.conversation.update({
      where: { id },
      data: updateData,
      include: {
        participants: true,
      },
    });
    return this.mapToEntity(prismaConversation);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.conversation.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.conversation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.conversation.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: ConversationFilter): Promise<number> {
    const where = this.buildWhereClause(filters);
    return this.prisma.conversation.count({ where });
  }

  async search(
    query: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = {
      OR: [
        { subject: { contains: query, mode: 'insensitive' as const } },
      ],
      deletedAt: null,
    };

    const [data, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          participants: true,
        },
      }),
      this.prisma.conversation.count({ where }),
    ]);

    return {
      data: data.map((c: any) => this.mapToEntity(c)),
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

  async findByProperty(
    propertyId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>> {
    return this.findMany({ propertyId }, options);
  }

  async findByInspection(
    inspectionId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>> {
    return this.findMany({ inspectionId }, options);
  }

  async findByUser(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where: {
          participants: {
            some: { userId },
          },
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          participants: true,
        },
      }),
      this.prisma.conversation.count({
        where: {
          participants: {
            some: { userId },
          },
          deletedAt: null,
        },
      }),
    ]);

    return {
      data: data.map((c: any) => this.mapToEntity(c)),
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

  async archive(id: string, userId: string): Promise<Conversation> {
    const prismaConversation = await this.prisma.conversation.update({
      where: { id },
      data: {
        archivedBy: userId,
        archivedAt: new Date(),
      },
      include: {
        participants: true,
      },
    });
    return this.mapToEntity(prismaConversation);
  }

  async unarchive(id: string): Promise<Conversation> {
    const prismaConversation = await this.prisma.conversation.update({
      where: { id },
      data: {
        archivedBy: null,
        archivedAt: null,
      },
      include: {
        participants: true,
      },
    });
    return this.mapToEntity(prismaConversation);
  }

  async findByParticipants(
    userIds: string[],
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Conversation>> {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              userId: { in: userIds },
            },
          },
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          participants: true,
        },
      }),
      this.prisma.conversation.count({
        where: {
          participants: {
            some: {
              userId: { in: userIds },
            },
          },
          deletedAt: null,
        },
      }),
    ]);

    return {
      data: data.map((c: any) => this.mapToEntity(c)),
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

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private buildWhereClause(filters?: ConversationFilter): any {
    if (!filters) return { deletedAt: null };

    const where: any = { deletedAt: null };

    if (filters.type) where.type = filters.type;
    if (filters.propertyId) where.propertyId = filters.propertyId;
    if (filters.inspectionId) where.inspectionId = filters.inspectionId;
    if (filters.status) where.status = filters.status;
    if (filters.archived !== undefined) {
      where.archivedAt = filters.archived ? { not: null } : null;
    }
    if (filters.blocked) {
      where.blocked = { isNot: null };
    }
    if (filters.userId) {
      where.participants = {
        some: { userId: filters.userId },
      };
    }
    if (filters.search) {
      where.OR = [
        { subject: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    return where;
  }

  private mapToEntity(prismaConversation: any): Conversation {
    const entity = new Conversation();
    entity.id = prismaConversation.id;
    entity.type = prismaConversation.type;
    entity.propertyId = prismaConversation.propertyId;
    entity.inspectionId = prismaConversation.inspectionId;
    entity.subject = prismaConversation.subject;
    entity.status = prismaConversation.status;
    entity.archivedBy = prismaConversation.archivedBy;
    entity.archivedAt = prismaConversation.archivedAt;
    entity.createdAt = prismaConversation.createdAt;
    entity.updatedAt = prismaConversation.updatedAt;
    entity.deletedAt = prismaConversation.deletedAt;
    entity.participants = prismaConversation.participants;
    return entity;
  }
}
