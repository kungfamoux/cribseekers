import { InspectionSchedule } from '../entities/inspection-schedule.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './inspection.repository.interface';

export interface IInspectionScheduleRepository {
  findById(id: string): Promise<InspectionSchedule | null>;
  findByInspectionId(inspectionId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionSchedule>>;
  findAvailableSlots(startTime: Date, endTime: Date, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionSchedule>>;
  create(data: any): Promise<InspectionSchedule>;
  update(id: string, data: any): Promise<InspectionSchedule>;
  delete(id: string): Promise<InspectionSchedule>;
  withTransaction(transaction: any): this;
}
