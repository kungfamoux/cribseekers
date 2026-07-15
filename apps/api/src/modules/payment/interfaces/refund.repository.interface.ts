import { Refund } from '../entities/refund.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IRefundRepository {
  findById(id: string): Promise<Refund | null>;
  findByPaymentId(paymentId: string): Promise<Refund[]>;
  findByEscrowId(escrowId: string): Promise<Refund[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Refund>>;
  create(data: any): Promise<Refund>;
  update(id: string, data: any): Promise<Refund>;
  delete(id: string): Promise<Refund>;
  withTransaction(transaction: any): this;
}
