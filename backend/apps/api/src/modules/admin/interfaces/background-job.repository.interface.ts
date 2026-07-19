import { BackgroundJob } from '../entities/background-job.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IBackgroundJobRepository {
  findById(id: string): Promise<BackgroundJob | null>;
  findByQueue(queue: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>>;
  findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>>;
  findPendingJobs(options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>>;
  findFailedJobs(options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>>;
  create(data: any): Promise<BackgroundJob>;
  update(id: string, data: any): Promise<BackgroundJob>;
  delete(id: string): Promise<BackgroundJob>;
  withTransaction(transaction: any): this;
}
