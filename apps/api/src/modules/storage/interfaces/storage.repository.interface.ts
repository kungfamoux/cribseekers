import { StorageFile } from '../entities/storage-file.entity';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface SortOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface IStorageRepository {
  findById(id: string): Promise<StorageFile | null>;
  findByPath(path: string): Promise<StorageFile | null>;
  findByEntity(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findByCategory(category: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findByProvider(provider: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findTemporary(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findExpired(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findByUploadedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  create(data: any): Promise<StorageFile>;
  update(id: string, data: any): Promise<StorageFile>;
  softDelete(id: string): Promise<StorageFile>;
  withTransaction(transaction: any): this;
}
