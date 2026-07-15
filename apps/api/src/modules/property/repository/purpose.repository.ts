import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyPurpose } from '../entities/property-purpose.entity';
import { IPurposeRepository } from '../interfaces/purpose.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class PurposeRepository implements IPurposeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PropertyPurpose | null> {
    const prismaPurpose = await this.prisma.propertyPurpose.findUnique({
      where: { id },
    });
    return prismaPurpose ? this.mapToEntity(prismaPurpose) : null;
  }

  async findOne(filters: Partial<PropertyPurpose>): Promise<PropertyPurpose | null> {
    const prismaPurpose = await this.prisma.propertyPurpose.findFirst({
      where: filters,
    });
    return prismaPurpose ? this.mapToEntity(prismaPurpose) : null;
  }

  async findMany(
    filters?: Partial<PropertyPurpose>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<PropertyPurpose>> {
    const { page = 1, limit = 10, sortBy = 'sortOrder', sortOrder = 'asc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.propertyPurpose.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyPurpose.count({ where: filters }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async create(data: Omit<PropertyPurpose, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyPurpose> {
    const prismaPurpose = await this.prisma.propertyPurpose.create({
      data,
    });
    return this.mapToEntity(prismaPurpose);
  }

  async update(id: string, data: Partial<Omit<PropertyPurpose, 'id' | 'createdAt'>>): Promise<PropertyPurpose> {
    const prismaPurpose = await this.prisma.propertyPurpose.update({
      where: { id },
      data,
    });
    return this.mapToEntity(prismaPurpose);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.propertyPurpose.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.propertyPurpose.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<PropertyPurpose>): Promise<number> {
    return this.prisma.propertyPurpose.count({ where: filters });
  }

  async findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyPurpose>> {
    const { page = 1, limit = 10, sortBy = 'sortOrder', sortOrder = 'asc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.propertyPurpose.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyPurpose.count({ where: { isActive: true } }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  private mapToEntity(prismaPurpose: any): PropertyPurpose {
    const entity = new PropertyPurpose();
    entity.id = prismaPurpose.id;
    entity.name = prismaPurpose.name;
    entity.description = prismaPurpose.description;
    entity.isActive = prismaPurpose.isActive;
    entity.sortOrder = prismaPurpose.sortOrder;
    entity.createdAt = prismaPurpose.createdAt;
    entity.updatedAt = prismaPurpose.updatedAt;
    return entity;
  }
}
