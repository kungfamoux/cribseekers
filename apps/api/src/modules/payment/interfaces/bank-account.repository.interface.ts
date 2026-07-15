import { BankAccount } from '../entities/bank-account.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IBankAccountRepository {
  findById(id: string): Promise<BankAccount | null>;
  findByWalletId(walletId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BankAccount>>;
  findByAccountNumber(accountNumber: string): Promise<BankAccount | null>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BankAccount>>;
  create(data: any): Promise<BankAccount>;
  update(id: string, data: any): Promise<BankAccount>;
  delete(id: string): Promise<BankAccount>;
  withTransaction(transaction: any): this;
}
