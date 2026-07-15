import { InspectionHistory } from '../entities/inspection-history.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './inspection.repository.interface';

export interface IInspectionHistoryRepository {
  findById(id: string): Promise<InspectionHistory | null>;
  findByInspectionId(inspectionId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionHistory>>;
  findByPerformedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionHistory>>;
  create(data: any): Promise<InspectionHistory>;
  withTransaction(transaction: any): this;
}
