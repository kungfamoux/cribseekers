import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyCategory } from '../entities/property-category.entity';
import { ICategoryRepository } from '../interfaces/category.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PropertyCategory | null> {
    const prismaCategory = await this.prisma.propertyCategory.findUnique({
      where: { id },
    });
    return prismaCategory ? this.mapToEntity(prismaCategory) : null;
  }

  async findOne(filters: Partial<PropertyCategory>): Promise<PropertyCategory | null> {
    const prismaCategory = await this.prisma.propertyCategory.findFirst({
      where: filters,
    });
    return prismaCategory ? this.mapToEntity(prismaCategory) : null;
  }

  async findMany(
    filters?: Partial<PropertyCategory>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<PropertyCategory>> {
    const { page = 1, limit = 10, sortBy = 'sortOrder', sortOrder = 'asc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.propertyCategory.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyCategory.count({ where: filters }),
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

  async create(data: Omit<PropertyCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyCategory> {
    const prismaCategory = await this.prisma.propertyCategory.create({
      data,
    });
    return this.mapToEntity(prismaCategory);
  }

  async update(id: string, data: Partial<Omit<PropertyCategory, 'id' | 'createdAt'>>): Promise<PropertyCategory> {
    const prismaCategory = await this.prisma.propertyCategory.update({
      where: { id },
      data,
    });
    return this.mapToEntity(prismaCategory);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.propertyCategory.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.propertyCategory.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<PropertyCategory>): Promise<number> {
    return this.prisma.propertyCategory.count({ where: filters });
  }

  async findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyCategory>> {
    const { page = 1, limit = 10, sortBy = 'sortOrder', sortOrder = 'asc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.propertyCategory.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyCategory.count({ where: { isActive: true } }),
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

  private mapToEntity(prismaCategory: any): PropertyCategory {
    const entity = new PropertyCategory();
    entity.id = prismaCategory.id;
    entity.name = prismaCategory.name;
    entity.description = prismaCategory.description;
    entity.icon = prismaCategory.icon;
    entity.isActive = prismaCategory.isActive;
    entity.sortOrder = prismaCategory.sortOrder;
    entity.createdAt = prismaCategory.createdAt;
    entity.updatedAt = prismaCategory.updatedAt;
    return entity;
  }
}
