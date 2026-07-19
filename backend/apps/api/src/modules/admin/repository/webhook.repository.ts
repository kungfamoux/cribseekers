import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Webhook } from '../entities/webhook.entity';
import { IWebhookRepository } from '../interfaces/webhook.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class WebhookRepository implements IWebhookRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Webhook | null> {
    const webhook = await this.prisma.webhook.findUnique({
      where: { id },
    });
    return webhook as Webhook | null;
  }

  async findByUrl(url: string): Promise<Webhook | null> {
    const webhook = await this.prisma.webhook.findFirst({
      where: { url },
    });
    return webhook as Webhook | null;
  }

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Webhook>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.webhook.findMany({
        where: { status: status as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhook.count({ where: { status: status as any } }),
    ]);

    return {
      data: data as Webhook[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Webhook>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { url: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.webhook.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhook.count({ where }),
    ]);

    return {
      data: data as Webhook[],
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

  async create(data: any): Promise<Webhook> {
    const webhook = await (this.transaction || this.prisma).webhook.create({
      data,
    });
    return webhook as Webhook;
  }

  async update(id: string, data: any): Promise<Webhook> {
    const webhook = await (this.transaction || this.prisma).webhook.update({
      where: { id },
      data,
    });
    return webhook as Webhook;
  }

  async delete(id: string): Promise<Webhook> {
    const webhook = await (this.transaction || this.prisma).webhook.delete({
      where: { id },
    });
    return webhook as Webhook;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
