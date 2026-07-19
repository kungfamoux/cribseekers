import { Receipt } from '../entities/receipt.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IReceiptRepository {
  findById(id: string): Promise<Receipt | null>;
  findByReceiptNumber(receiptNumber: string): Promise<Receipt | null>;
  findByPaymentId(paymentId: string): Promise<Receipt | null>;
  findByInvoiceId(invoiceId: string): Promise<Receipt[]>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Receipt>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Receipt>>;
  create(data: any): Promise<Receipt>;
  delete(id: string): Promise<Receipt>;
  withTransaction(transaction: any): this;
}
