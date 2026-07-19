import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyType } from '../entities/property-type.entity';
import { ITypeRepository } from '../interfaces/type.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class TypeRepository implements ITypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PropertyType | null> {
    const prismaType = await this.prisma.propertyType.findUnique({
      where: { id },
    });
    return prismaType ? this.mapToEntity(prismaType) : null;
  }

  async findOne(filters: Partial<PropertyType>): Promise<PropertyType | null> {
    const prismaType = await this.prisma.propertyType.findFirst({
      where: filters,
    });
    return prismaType ? this.mapToEntity(prismaType) : null;
  }

  async findMany(
    filters?: Partial<PropertyType>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<PropertyType>> {
    const { page = 1, limit = 10, sortBy = 'sortOrder', sortOrder = 'asc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.propertyType.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyType.count({ where: filters }),
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

  async create(data: Omit<PropertyType, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyType> {
    const prismaType = await this.prisma.propertyType.create({
      data,
    });
    return this.mapToEntity(prismaType);
  }

  async update(id: string, data: Partial<Omit<PropertyType, 'id' | 'createdAt'>>): Promise<PropertyType> {
    const prismaType = await this.prisma.propertyType.update({
      where: { id },
      data,
    });
    return this.mapToEntity(prismaType);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.propertyType.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.propertyType.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<PropertyType>): Promise<number> {
    return this.prisma.propertyType.count({ where: filters });
  }

  async findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyType>> {
    const { page = 1, limit = 10, sortBy = 'sortOrder', sortOrder = 'asc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.propertyType.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyType.count({ where: { isActive: true } }),
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

  private mapToEntity(prismaType: any): PropertyType {
    const entity = new PropertyType();
    entity.id = prismaType.id;
    entity.name = prismaType.name;
    entity.description = prismaType.description;
    entity.icon = prismaType.icon;
    entity.isActive = prismaType.isActive;
    entity.sortOrder = prismaType.sortOrder;
    entity.createdAt = prismaType.createdAt;
    entity.updatedAt = prismaType.updatedAt;
    return entity;
  }
}
