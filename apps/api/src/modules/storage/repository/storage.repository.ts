import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { StorageFile } from '../entities/storage-file.entity';
import { IStorageRepository, PaginationOptions, SortOptions, PaginationResult } from '../interfaces/storage.repository.interface';

@Injectable()
export class StorageRepository implements IStorageRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<StorageFile | null> {
    const file = await this.prisma.storageFile.findUnique({
      where: { id },
    });
    return file as StorageFile | null;
  }

  async findByPath(path: string): Promise<StorageFile | null> {
    const file = await this.prisma.storageFile.findFirst({
      where: { path },
    });
    return file as StorageFile | null;
  }

  async findByEntity(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where: { entityType, entityId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where: { entityType, entityId } }),
    ]);

    return {
      data: data as StorageFile[],
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

  async findByCategory(category: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where: { category },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where: { category } }),
    ]);

    return {
      data: data as StorageFile[],
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

  async findByProvider(provider: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where: { provider },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where: { provider } }),
    ]);

    return {
      data: data as StorageFile[],
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

  async findTemporary(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where: { isTemporary: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where: { isTemporary: true } }),
    ]);

    return {
      data: data as StorageFile[],
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

  async findExpired(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'expiresAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where: { expiresAt: { lt: new Date() } },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where: { expiresAt: { lt: new Date() } } }),
    ]);

    return {
      data: data as StorageFile[],
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

  async findByUploadedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where: { uploadedBy: userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where: { uploadedBy: userId } }),
    ]);

    return {
      data: data as StorageFile[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.entityType) where.entityType = filters.entityType;
    if (filters?.entityId) where.entityId = filters.entityId;
    if (filters?.category) where.category = filters.category;
    if (filters?.provider) where.provider = filters.provider;
    if (filters?.isPublic !== undefined) where.isPublic = filters.isPublic;
    if (filters?.isTemporary !== undefined) where.isTemporary = filters.isTemporary;
    if (filters?.uploadedBy) where.uploadedBy = filters.uploadedBy;
    if (filters?.search) {
      where.OR = [
        { fileName: { contains: filters.search, mode: 'insensitive' } },
        { originalName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.storageFile.count({ where }),
    ]);

    return {
      data: data as StorageFile[],
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

  async create(data: any): Promise<StorageFile> {
    const file = await (this.transaction || this.prisma).storageFile.create({
      data,
    });
    return file as StorageFile;
  }

  async update(id: string, data: any): Promise<StorageFile> {
    const file = await (this.transaction || this.prisma).storageFile.update({
      where: { id },
      data,
    });
    return file as StorageFile;
  }

  async softDelete(id: string): Promise<StorageFile> {
    const file = await (this.transaction || this.prisma).storageFile.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return file as StorageFile;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
