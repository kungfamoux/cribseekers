import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { StorageFile } from '../entities/storage-file.entity';
import {
  IStorageRepository,
  StorageFileFilters,
} from '../interfaces/storage.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

type PrismaClientOrTransaction = PrismaService | Record<string, any>;

@Injectable()
export class StorageRepository implements IStorageRepository {
  private transaction: PrismaClientOrTransaction | null = null;

  constructor(private readonly prisma: PrismaService) {}

  private get client(): PrismaClientOrTransaction {
    return this.transaction || this.prisma;
  }

  private buildPaginationMeta(total: number, page: number, limit: number) {
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPreviousPage: page > 1,
    };
  }

  private resolvePagination(options?: PaginationOptions & SortOptions) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';
    const skip = options?.skip ?? (page - 1) * limit;

    return { page, limit, sortBy, sortOrder, skip };
  }

  async findById(id: string): Promise<StorageFile | null> {
    const file = await this.client.storageFile.findFirst({
      where: { id, deletedAt: null },
    });
    return file as StorageFile | null;
  }

  async findByStorageKey(storageKey: string): Promise<StorageFile | null> {
    const file = await this.client.storageFile.findFirst({
      where: { storageKey, deletedAt: null },
    });
    return file as StorageFile | null;
  }

  async findByChecksum(checksum: string): Promise<StorageFile | null> {
    const file = await this.client.storageFile.findFirst({
      where: { checksum, deletedAt: null },
    });
    return file as StorageFile | null;
  }

  async findByEntity(
    entityType: string,
    entityId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFile>> {
    const { page, limit, sortBy, sortOrder, skip } = this.resolvePagination(options);
    const where = { entityType, entityId, deletedAt: null };

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async findByCategory(
    category: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFile>> {
    const { page, limit, sortBy, sortOrder, skip } = this.resolvePagination(options);
    const where = { category, deletedAt: null };

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async findByProvider(
    provider: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFile>> {
    const { page, limit, sortBy, sortOrder, skip } = this.resolvePagination(options);
    const where = { provider: provider as any, deletedAt: null };

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async findTemporary(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const { page, limit, sortBy, sortOrder, skip } = this.resolvePagination(options);
    const where = { isTemporary: true, deletedAt: null };

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async findExpired(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'expiresAt';
    const sortOrder = options?.sortOrder || 'asc';
    const skip = options?.skip ?? (page - 1) * limit;

    const where = { expiresAt: { lt: new Date() }, deletedAt: null };

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async findByUploadedBy(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFile>> {
    const { page, limit, sortBy, sortOrder, skip } = this.resolvePagination(options);
    const where = { uploadedBy: userId, deletedAt: null };

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async findAll(
    filters?: StorageFileFilters,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFile>> {
    const { page, limit, sortBy, sortOrder, skip } = this.resolvePagination(options);

    const where: Record<string, any> = { deletedAt: null };
    if (filters?.entityType) where.entityType = filters.entityType;
    if (filters?.entityId) where.entityId = filters.entityId;
    if (filters?.category) where.category = filters.category;
    if (filters?.provider) where.provider = filters.provider;
    if (filters?.status) where.status = filters.status;
    if (filters?.visibility) where.visibility = filters.visibility;
    if (filters?.isTemporary !== undefined) where.isTemporary = filters.isTemporary;
    if (filters?.uploadedBy) where.uploadedBy = filters.uploadedBy;
    if (filters?.search) {
      where.OR = [
        { originalFileName: { contains: filters.search, mode: 'insensitive' } },
        { storedFileName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.client.storageFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.client.storageFile.count({ where }),
    ]);

    return { data: data as StorageFile[], meta: this.buildPaginationMeta(total, page, limit) };
  }

  async create(data: Partial<StorageFile>): Promise<StorageFile> {
    const file = await this.client.storageFile.create({ data });
    return file as StorageFile;
  }

  async update(id: string, data: Partial<StorageFile>): Promise<StorageFile> {
    const file = await this.client.storageFile.update({
      where: { id },
      data,
    });
    return file as StorageFile;
  }

  async softDelete(id: string): Promise<StorageFile> {
    const file = await this.client.storageFile.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'DELETED' },
    });
    return file as StorageFile;
  }

  async restore(id: string): Promise<StorageFile> {
    const file = await this.client.storageFile.update({
      where: { id },
      data: { deletedAt: null, status: 'ACTIVE' },
    });
    return file as StorageFile;
  }

  async hardDelete(id: string): Promise<void> {
    await this.client.storageFile.delete({ where: { id } });
  }

  withTransaction(transaction: unknown): this {
    this.transaction = transaction as PrismaClientOrTransaction;
    return this;
  }
}
