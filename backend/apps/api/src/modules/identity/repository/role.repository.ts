import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { PrismaService } from '../../../database/prisma.service';
import { Role } from '../entities/role.entity';
import { RoleMapper } from '../mappers/role.mapper';
import { IRoleRepository } from '../interfaces/role.repository.interface';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

@Injectable()
export class RoleRepository extends BaseRepository implements IRoleRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<Role | null> {
    const prismaRole = await this.client.role.findUnique({
      where: { id },
    });
    return prismaRole ? RoleMapper.toDomain(prismaRole) : null;
  }

  async findOne(filters: Partial<Role>): Promise<Role | null> {
    const prismaRole = await this.client.role.findFirst({
      where: this.buildWhereClause(filters || {}),
    });
    return prismaRole ? RoleMapper.toDomain(prismaRole) : null;
  }

  async findMany(
    filters?: Partial<Role>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Role>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.client.role.findMany({
        where: this.buildWhereClause(filters || {}),
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.role.count({
        where: this.buildWhereClause(filters || {}),
      }),
    ]);

    const roles = RoleMapper.toDomainList(data);

    return {
      data: roles,
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

  async create(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
    const prismaRole = await this.client.role.create({
      data: this.toPrismaCreateData(data),
    });
    return RoleMapper.toDomain(prismaRole);
  }

  async update(id: string, data: Partial<Omit<Role, 'id' | 'createdAt'>>): Promise<Role> {
    const prismaRole = await this.client.role.update({
      where: { id },
      data: this.toPrismaUpdateData(data),
    });
    return RoleMapper.toDomain(prismaRole);
  }

  async delete(id: string): Promise<void> {
    await this.client.role.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const role = await this.client.role.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!role;
  }

  async count(filters?: Partial<Role>): Promise<number> {
    return this.client.role.count({
      where: this.buildWhereClause(filters || {}),
    });
  }

  async paginate(options: PaginationOptions): Promise<PaginationResult<Role>> {
    return this.findMany(undefined, options);
  }

  async findByName(name: string): Promise<Role | null> {
    const prismaRole = await this.client.role.findUnique({
      where: { name },
    });
    return prismaRole ? RoleMapper.toDomain(prismaRole) : null;
  }

  async findByType(type: string): Promise<Role[]> {
    const prismaRoles = await this.client.role.findMany({
      where: { type: type as any },
    });
    return RoleMapper.toDomainList(prismaRoles);
  }

  withTransaction(_transaction: any): this {
    return new RoleRepository(this.prisma) as this;
  }

  private buildWhereClause(filters: Partial<Role>): Prisma.RoleWhereInput {
    const where: Prisma.RoleWhereInput = {};
    
    if (filters.id) where.id = filters.id;
    if (filters.name) where.name = filters.name;
    if (filters.type) where.type = filters.type;
    if (filters.isSystem !== undefined) where.isSystem = filters.isSystem;
    
    return where;
  }

  private toPrismaCreateData(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Prisma.RoleCreateInput {
    return {
      name: data.name,
      description: data.description,
      type: data.type,
      isSystem: data.isSystem,
    };
  }

  private toPrismaUpdateData(data: Partial<Omit<Role, 'id' | 'createdAt'>>): Prisma.RoleUpdateInput {
    const updateData: Prisma.RoleUpdateInput = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.isSystem !== undefined) updateData.isSystem = data.isSystem;
    
    return updateData;
  }
}
