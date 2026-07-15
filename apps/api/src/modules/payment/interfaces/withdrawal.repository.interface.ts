import { Withdrawal } from '../entities/withdrawal.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IWithdrawalRepository {
  findById(id: string): Promise<Withdrawal | null>;
  findByWalletId(walletId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Withdrawal>>;
  findByBankAccountId(bankAccountId: string): Promise<Withdrawal[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Withdrawal>>;
  create(data: any): Promise<Withdrawal>;
  update(id: string, data: any): Promise<Withdrawal>;
  delete(id: string): Promise<Withdrawal>;
  withTransaction(transaction: any): this;
}
