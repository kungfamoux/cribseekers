import { InspectionReminder } from '../entities/inspection-reminder.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './inspection.repository.interface';

export interface IInspectionReminderRepository {
  findById(id: string): Promise<InspectionReminder | null>;
  findByInspectionId(inspectionId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionReminder>>;
  findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionReminder>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionReminder>>;
  findPendingReminders(before: Date, options?: PaginationOptions & SortOptions): Promise<PaginationResult<InspectionReminder>>;
  create(data: any): Promise<InspectionReminder>;
  update(id: string, data: any): Promise<InspectionReminder>;
  delete(id: string): Promise<InspectionReminder>;
  withTransaction(transaction: any): this;
}
