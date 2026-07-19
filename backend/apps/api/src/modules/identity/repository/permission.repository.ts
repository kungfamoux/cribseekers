import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { PrismaService } from '../../../database/prisma.service';
import { Permission } from '../entities/permission.entity';
import { PermissionMapper } from '../mappers/permission.mapper';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

@Injectable()
export class PermissionRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<Permission | null> {
    const prismaPermission = await this.client.permission.findUnique({
      where: { id },
    });
    return prismaPermission ? PermissionMapper.toDomain(prismaPermission) : null;
  }

  async findOne(filters: Partial<Permission>): Promise<Permission | null> {
    const prismaPermission = await this.client.permission.findFirst({
      where: this.buildWhereClause(filters || {}),
    });
    return prismaPermission ? PermissionMapper.toDomain(prismaPermission) : null;
  }

  async findMany(
    filters?: Partial<Permission>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Permission>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.client.permission.findMany({
        where: this.buildWhereClause(filters || {}),
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.permission.count({
        where: this.buildWhereClause(filters || {}),
      }),
    ]);

    const permissions = PermissionMapper.toDomainList(data);

    return {
      data: permissions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async create(data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Permission> {
    const prismaPermission = await this.client.permission.create({
      data: this.toPrismaCreateData(data),
    });
    return PermissionMapper.toDomain(prismaPermission);
  }

  async update(id: string, data: Partial<Omit<Permission, 'id' | 'createdAt'>>): Promise<Permission> {
    const prismaPermission = await this.client.permission.update({
      where: { id },
      data: this.toPrismaUpdateData(data),
    });
    return PermissionMapper.toDomain(prismaPermission);
  }

  async delete(id: string): Promise<void> {
    await this.client.permission.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const permission = await this.client.permission.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!permission;
  }

  async count(filters?: Partial<Permission>): Promise<number> {
    return this.client.permission.count({
      where: this.buildWhereClause(filters || {}),
    });
  }

  async paginate(options: PaginationOptions): Promise<PaginationResult<Permission>> {
    return this.findMany(undefined, options);
  }

  withTransaction(_transaction: any): this {
    return new PermissionRepository(this.prisma) as this;
  }

  private buildWhereClause(filters: Partial<Permission>): Prisma.PermissionWhereInput {
    const where: Prisma.PermissionWhereInput = {};
    
    if (filters.id) where.id = filters.id;
    if (filters.name) where.name = filters.name;
    if (filters.type) where.type = filters.type;
    if (filters.resource) where.resource = filters.resource;
    
    return where;
  }

  private toPrismaCreateData(data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>): Prisma.PermissionCreateInput {
    return {
      name: data.name,
      description: data.description,
      type: data.type,
      resource: data.resource,
    };
  }

  private toPrismaUpdateData(data: Partial<Omit<Permission, 'id' | 'createdAt'>>): Prisma.PermissionUpdateInput {
    const updateData: Prisma.PermissionUpdateInput = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.resource !== undefined) updateData.resource = data.resource;
    
    return updateData;
  }
}
