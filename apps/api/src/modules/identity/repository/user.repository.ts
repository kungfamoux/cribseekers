import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { PrismaTransactionClient } from '../../../database/types/prisma-transaction.type';
import { PrismaService } from '../../../database/prisma.service';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { PaginationOptions, PaginationResult } from '../../../common/types/pagination.type';
import { SortOptions } from '../../../common/types/sort.type';

@Injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.client.user.findUnique({
      where: { id },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findOne(filters: Partial<User>): Promise<User | null> {
    const prismaUser = await this.client.user.findFirst({
      where: this.buildWhereClause(filters || {}),
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findMany(
    filters?: Partial<User>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<User>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.client.user.findMany({
        where: this.buildWhereClause(filters || {}),
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.user.count({
        where: this.buildWhereClause(filters || {}),
      }),
    ]);

    const users = UserMapper.toDomainList(data);

    return {
      data: users,
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

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const prismaUser = await this.client.user.create({
      data: this.toPrismaCreateData(data),
    });
    return UserMapper.toDomain(prismaUser);
  }

  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const prismaUser = await this.client.user.update({
      where: { id },
      data: this.toPrismaUpdateData(data),
    });
    return UserMapper.toDomain(prismaUser);
  }

  async delete(id: string): Promise<void> {
    await this.client.user.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.client.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.client.user.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!user;
  }

  async count(filters?: Partial<User>): Promise<number> {
    return this.client.user.count({
      where: this.buildWhereClause(filters || {}),
    });
  }

  async paginate(options: PaginationOptions): Promise<PaginationResult<User>> {
    return this.findMany(undefined, options);
  }

  async search(query: string, options?: PaginationOptions): Promise<PaginationResult<User>> {
    const { page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.client.user.findMany({
        where: {
          OR: [
            { email: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { firstName: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { lastName: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { phoneNumber: { contains: query, mode: Prisma.QueryMode.insensitive } },
          ],
        },
        skip,
        take: limit,
      }),
      this.client.user.count({
        where: {
          OR: [
            { email: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { firstName: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { lastName: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { phoneNumber: { contains: query, mode: Prisma.QueryMode.insensitive } },
          ],
        },
      }),
    ]);

    const users = UserMapper.toDomainList(data);

    return {
      data: users,
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

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.client.user.findUnique({
      where: { email },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const prismaUser = await this.client.user.findUnique({
      where: { phoneNumber },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findByEmailOrPhone(email?: string, phoneNumber?: string): Promise<User | null> {
    if (email) {
      return this.findByEmail(email);
    }
    if (phoneNumber) {
      return this.findByPhoneNumber(phoneNumber);
    }
    return null;
  }

  withTransaction(_transaction: PrismaTransactionClient): this {
    return new UserRepository(this.prisma) as this;
  }

  private buildWhereClause(filters: Partial<User>): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};
    
    if (filters.id) where.id = filters.id;
    if (filters.email) where.email = filters.email;
    if (filters.phoneNumber) where.phoneNumber = filters.phoneNumber;
    if (filters.type) where.type = filters.type;
    if (filters.status) where.status = filters.status;
    if (filters.gender) where.gender = filters.gender;
    if (filters.emailVerified !== undefined) where.emailVerified = filters.emailVerified;
    if (filters.phoneVerified !== undefined) where.phoneVerified = filters.phoneVerified;
    if (filters.deletedAt !== undefined) where.deletedAt = filters.deletedAt;
    
    return where;
  }

  private toPrismaCreateData(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Prisma.UserCreateInput {
    return {
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      type: data.type,
      status: data.status,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      emailVerified: data.emailVerified,
      phoneVerified: data.phoneVerified,
      lastLoginAt: data.lastLoginAt,
      failedLoginAttempts: data.failedLoginAttempts,
      lockedUntil: data.lockedUntil,
      deletedAt: data.deletedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  }

  private toPrismaUpdateData(data: Partial<Omit<User, 'id' | 'createdAt'>>): Prisma.UserUpdateInput {
    const updateData: Prisma.UserUpdateInput = {};
    
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber;
    if (data.password !== undefined) updateData.password = data.password;
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.dateOfBirth !== undefined) updateData.dateOfBirth = data.dateOfBirth;
    if (data.emailVerified !== undefined) updateData.emailVerified = data.emailVerified;
    if (data.phoneVerified !== undefined) updateData.phoneVerified = data.phoneVerified;
    if (data.lastLoginAt !== undefined) updateData.lastLoginAt = data.lastLoginAt;
    if (data.failedLoginAttempts !== undefined) updateData.failedLoginAttempts = data.failedLoginAttempts;
    if (data.lockedUntil !== undefined) updateData.lockedUntil = data.lockedUntil;
    if (data.deletedAt !== undefined) updateData.deletedAt = data.deletedAt;
    if (data.createdBy !== undefined) updateData.createdBy = data.createdBy;
    if (data.updatedBy !== undefined) updateData.updatedBy = data.updatedBy;
    
    return updateData;
  }
}
