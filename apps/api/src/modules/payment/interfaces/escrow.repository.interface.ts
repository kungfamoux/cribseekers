import { Escrow } from '../entities/escrow.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IEscrowRepository {
  findById(id: string): Promise<Escrow | null>;
  findByWalletId(walletId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>>;
  findByPayerId(payerId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>>;
  findByPayeeId(payeeId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>>;
  findByPropertyId(propertyId: string): Promise<Escrow[]>;
  findByInspectionId(inspectionId: string): Promise<Escrow[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>>;
  create(data: any): Promise<Escrow>;
  update(id: string, data: any): Promise<Escrow>;
  delete(id: string): Promise<Escrow>;
  withTransaction(transaction: any): this;
}
