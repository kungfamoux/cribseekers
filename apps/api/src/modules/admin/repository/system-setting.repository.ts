import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { SystemSetting } from '../entities/system-setting.entity';
import { ISystemSettingRepository } from '../interfaces/system-setting.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class SystemSettingRepository implements ISystemSettingRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<SystemSetting | null> {
    const systemSetting = await this.prisma.systemSetting.findUnique({
      where: { id },
    });
    return systemSetting as SystemSetting | null;
  }

  async findByKey(key: string): Promise<SystemSetting | null> {
    const systemSetting = await this.prisma.systemSetting.findUnique({
      where: { key },
    });
    return systemSetting as SystemSetting | null;
  }

  async findByCategory(category: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SystemSetting>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'key';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.systemSetting.findMany({
        where: { category },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.systemSetting.count({ where: { category } }),
    ]);

    return {
      data: data as SystemSetting[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SystemSetting>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'key';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.isPublic !== undefined) {
      where.isPublic = filters.isPublic;
    }
    if (filters?.search) {
      where.OR = [
        { key: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.systemSetting.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.systemSetting.count({ where }),
    ]);

    return {
      data: data as SystemSetting[],
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

  async create(data: any): Promise<SystemSetting> {
    const systemSetting = await (this.transaction || this.prisma).systemSetting.create({
      data,
    });
    return systemSetting as SystemSetting;
  }

  async update(id: string, data: any): Promise<SystemSetting> {
    const systemSetting = await (this.transaction || this.prisma).systemSetting.update({
      where: { id },
      data,
    });
    return systemSetting as SystemSetting;
  }

  async delete(id: string): Promise<SystemSetting> {
    const systemSetting = await (this.transaction || this.prisma).systemSetting.delete({
      where: { id },
    });
    return systemSetting as SystemSetting;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
