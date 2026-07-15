import { Wallet } from '../entities/wallet.entity';

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

export interface IWalletRepository {
  findById(id: string): Promise<Wallet | null>;
  findByUserId(userId: string): Promise<Wallet | null>;
  findAll(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Wallet>>;
  create(data: any): Promise<Wallet>;
  update(id: string, data: any): Promise<Wallet>;
  delete(id: string): Promise<Wallet>;
  withTransaction(transaction: any): this;
}
