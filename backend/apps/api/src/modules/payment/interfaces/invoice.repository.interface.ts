import { Invoice } from '../entities/invoice.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IInvoiceRepository {
  findById(id: string): Promise<Invoice | null>;
  findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Invoice>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Invoice>>;
  create(data: any): Promise<Invoice>;
  update(id: string, data: any): Promise<Invoice>;
  delete(id: string): Promise<Invoice>;
  withTransaction(transaction: any): this;
}
