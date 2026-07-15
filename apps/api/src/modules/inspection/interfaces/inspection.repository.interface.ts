import { Inspection } from '../entities/inspection.entity';

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

export interface IInspectionRepository {
  findById(id: string): Promise<Inspection | null>;
  findByPropertyId(propertyId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Inspection>>;
  findByRequestedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Inspection>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Inspection>>;
  findMany(filters: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Inspection>>;
  create(data: any): Promise<Inspection>;
  update(id: string, data: any): Promise<Inspection>;
  delete(id: string): Promise<Inspection>;
  count(filters?: any): Promise<number>;
  withTransaction(transaction: any): this;
}
