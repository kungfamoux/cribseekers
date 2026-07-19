import { InspectionParticipant } from '../entities/inspection-participant.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './inspection.repository.interface';

export interface IInspectionParticipantRepository {
  findById(id: string): Promise<InspectionParticipant | null>;
  findByInspectionId(inspectionId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionParticipant>>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionParticipant>>;
  findByInspectionAndUser(inspectionId: string, userId: string): Promise<InspectionParticipant | null>;
  create(data: any): Promise<InspectionParticipant>;
  update(id: string, data: any): Promise<InspectionParticipant>;
  delete(id: string): Promise<InspectionParticipant>;
  withTransaction(transaction: any): this;
}
