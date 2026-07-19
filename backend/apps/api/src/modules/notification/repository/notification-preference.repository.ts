import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { NotificationPreference } from '../entities/notification-preference.entity';
import { INotificationPreferenceRepository } from '../interfaces/notification-preference.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class NotificationPreferenceRepository implements INotificationPreferenceRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NotificationPreference | null> {
    const preference = await this.prisma.notificationPreference.findUnique({
      where: { id },
    });
    return preference as NotificationPreference | null;
  }

  async findByUserId(userId: string): Promise<NotificationPreference | null> {
    const preference = await this.prisma.notificationPreference.findUnique({
      where: { userId },
    });
    return preference as NotificationPreference | null;
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationPreference>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.search) {
      where.OR = [
        { userId: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.notificationPreference.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationPreference.count({ where }),
    ]);

    return {
      data: data as NotificationPreference[],
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

  async create(data: any): Promise<NotificationPreference> {
    const preference = await (this.transaction || this.prisma).notificationPreference.create({
      data,
    });
    return preference as NotificationPreference;
  }

  async update(id: string, data: any): Promise<NotificationPreference> {
    const preference = await (this.transaction || this.prisma).notificationPreference.update({
      where: { id },
      data,
    });
    return preference as NotificationPreference;
  }

  async delete(id: string): Promise<NotificationPreference> {
    const preference = await (this.transaction || this.prisma).notificationPreference.delete({
      where: { id },
    });
    return preference as NotificationPreference;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
