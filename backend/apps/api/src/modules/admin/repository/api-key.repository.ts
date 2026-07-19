import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ApiKey } from '../entities/api-key.entity';
import { IApiKeyRepository } from '../interfaces/api-key.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class ApiKeyRepository implements IApiKeyRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ApiKey | null> {
    const apiKey = await this.prisma.apiKey.findUnique({
      where: { id },
    });
    return apiKey as ApiKey | null;
  }

  async findByKey(key: string): Promise<ApiKey | null> {
    const apiKey = await this.prisma.apiKey.findUnique({
      where: { key },
    });
    return apiKey as ApiKey | null;
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ApiKey>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.apiKey.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.apiKey.count({ where: { userId } }),
    ]);

    return {
      data: data as ApiKey[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ApiKey>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.userId) {
      where.userId = filters.userId;
    }
    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { key: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.apiKey.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.apiKey.count({ where }),
    ]);

    return {
      data: data as ApiKey[],
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

  async create(data: any): Promise<ApiKey> {
    const apiKey = await (this.transaction || this.prisma).apiKey.create({
      data,
    });
    return apiKey as ApiKey;
  }

  async update(id: string, data: any): Promise<ApiKey> {
    const apiKey = await (this.transaction || this.prisma).apiKey.update({
      where: { id },
      data,
    });
    return apiKey as ApiKey;
  }

  async delete(id: string): Promise<ApiKey> {
    const apiKey = await (this.transaction || this.prisma).apiKey.delete({
      where: { id },
    });
    return apiKey as ApiKey;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
