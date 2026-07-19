import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PushSubscription } from '../entities/push-subscription.entity';
import { IPushSubscriptionRepository } from '../interfaces/push-subscription.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class PushSubscriptionRepository implements IPushSubscriptionRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PushSubscription | null> {
    const subscription = await this.prisma.pushSubscription.findUnique({
      where: { id },
    });
    return subscription as PushSubscription | null;
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PushSubscription>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.pushSubscription.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.pushSubscription.count({ where: { userId } }),
    ]);

    return {
      data: data as PushSubscription[],
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

  async findByEndpoint(endpoint: string): Promise<PushSubscription | null> {
    const subscription = await this.prisma.pushSubscription.findFirst({
      where: { endpoint },
    });
    return subscription as PushSubscription | null;
  }

  async findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PushSubscription>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.pushSubscription.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.pushSubscription.count({ where: { isActive: true } }),
    ]);

    return {
      data: data as PushSubscription[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PushSubscription>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.search) {
      where.OR = [
        { endpoint: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.pushSubscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.pushSubscription.count({ where }),
    ]);

    return {
      data: data as PushSubscription[],
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

  async create(data: any): Promise<PushSubscription> {
    const subscription = await (this.transaction || this.prisma).pushSubscription.create({
      data,
    });
    return subscription as PushSubscription;
  }

  async update(id: string, data: any): Promise<PushSubscription> {
    const subscription = await (this.transaction || this.prisma).pushSubscription.update({
      where: { id },
      data,
    });
    return subscription as PushSubscription;
  }

  async delete(id: string): Promise<PushSubscription> {
    const subscription = await (this.transaction || this.prisma).pushSubscription.delete({
      where: { id },
    });
    return subscription as PushSubscription;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
