import { Settlement } from '../entities/settlement.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface ISettlementRepository {
  findById(id: string): Promise<Settlement | null>;
  findByEscrowId(escrowId: string): Promise<Settlement[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Settlement>>;
  create(data: any): Promise<Settlement>;
  update(id: string, data: any): Promise<Settlement>;
  delete(id: string): Promise<Settlement>;
  withTransaction(transaction: any): this;
}
