import { StorageFile } from '../entities/storage-file.entity';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

export interface StorageFileFilters {
  entityType?: string;
  entityId?: string;
  category?: string;
  provider?: string;
  status?: string;
  visibility?: string;
  isTemporary?: boolean;
  uploadedBy?: string;
  search?: string;
}

export interface IStorageRepository {
  findById(id: string): Promise<StorageFile | null>;
  findByStorageKey(storageKey: string): Promise<StorageFile | null>;
  findByChecksum(checksum: string): Promise<StorageFile | null>;
  findByEntity(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findByCategory(category: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findByProvider(provider: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findTemporary(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findExpired(options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findByUploadedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  findAll(filters?: StorageFileFilters, options?: PaginationOptions & SortOptions): Promise<PaginationResult<StorageFile>>;
  create(data: Partial<StorageFile>): Promise<StorageFile>;
  update(id: string, data: Partial<StorageFile>): Promise<StorageFile>;
  softDelete(id: string): Promise<StorageFile>;
  restore(id: string): Promise<StorageFile>;
  hardDelete(id: string): Promise<void>;
  withTransaction(transaction: unknown): this;
}
