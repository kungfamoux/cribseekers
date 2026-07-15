import { Payment } from '../entities/payment.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './wallet.repository.interface';

export interface IPaymentRepository {
  findById(id: string): Promise<Payment | null>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Payment>>;
  findByGatewayReference(reference: string): Promise<Payment | null>;
  findByEscrowId(escrowId: string): Promise<Payment[]>;
  findByInspectionId(inspectionId: string): Promise<Payment[]>;
  findByPropertyId(propertyId: string): Promise<Payment[]>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Payment>>;
  create(data: any): Promise<Payment>;
  update(id: string, data: any): Promise<Payment>;
  delete(id: string): Promise<Payment>;
  withTransaction(transaction: any): this;
}
