import { Injectable, Logger } from '@nestjs/common';
import { BackgroundJobRepository } from '../repository/background-job.repository';
import { BackgroundJobMapper } from '../mappers/background-job.mapper';
import { BackgroundJobNotFoundException } from '../exceptions/admin.exception';
import { AdminValidator } from '../validators/admin.validator';
import { JobStatus } from '@prisma/client';

@Injectable()
export class BackgroundJobService {
  private readonly logger = new Logger(BackgroundJobService.name);

  constructor(private readonly backgroundJobRepository: BackgroundJobRepository) {}

  async findById(id: string): Promise<any> {
    const backgroundJob = await this.backgroundJobRepository.findById(id);
    if (!backgroundJob) {
      throw new BackgroundJobNotFoundException(id);
    }
    return BackgroundJobMapper.toEntity(backgroundJob);
  }

  async findByQueue(queue: string, options?: any): Promise<any> {
    return this.backgroundJobRepository.findByQueue(queue, options);
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    return this.backgroundJobRepository.findByStatus(status, options);
  }

  async findPendingJobs(options?: any): Promise<any> {
    return this.backgroundJobRepository.findPendingJobs(options);
  }

  async findFailedJobs(options?: any): Promise<any> {
    return this.backgroundJobRepository.findFailedJobs(options);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.backgroundJobRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    if (!AdminValidator.isValidJobPriority(data.priority)) {
      throw new Error('Invalid job priority');
    }

    const backgroundJob = await this.backgroundJobRepository.create(
      BackgroundJobMapper.toCreateInput({
        ...data,
        status: JobStatus.PENDING,
        attempts: 0,
      }),
    );
    this.logger.log(`Background job created: ${backgroundJob.id} in queue ${backgroundJob.queue}`);
    return BackgroundJobMapper.toEntity(backgroundJob);
  }

  async start(id: string): Promise<any> {
    const backgroundJob = await this.backgroundJobRepository.update(
      id,
      BackgroundJobMapper.toUpdateInput({
        status: JobStatus.RUNNING,
        startedAt: new Date(),
      }),
    );
    this.logger.log(`Background job started: ${id}`);
    return BackgroundJobMapper.toEntity(backgroundJob);
  }

  async complete(id: string): Promise<any> {
    const backgroundJob = await this.backgroundJobRepository.update(
      id,
      BackgroundJobMapper.toUpdateInput({
        status: JobStatus.COMPLETED,
        completedAt: new Date(),
      }),
    );
    this.logger.log(`Background job completed: ${id}`);
    return BackgroundJobMapper.toEntity(backgroundJob);
  }

  async fail(id: string, error: string): Promise<any> {
    const job = await this.backgroundJobRepository.findById(id);
    if (!job) {
      throw new BackgroundJobNotFoundException(id);
    }

    const newAttempts = job.attempts + 1;
    const shouldRetry = newAttempts < job.maxAttempts;

    const backgroundJob = await this.backgroundJobRepository.update(
      id,
      BackgroundJobMapper.toUpdateInput({
        status: shouldRetry ? JobStatus.RETRYING : JobStatus.FAILED,
        attempts: newAttempts,
        error,
        failedAt: shouldRetry ? null : new Date(),
        nextRetryAt: shouldRetry ? this.calculateRetryTime(newAttempts) : null,
      }),
    );
    this.logger.log(`Background job failed: ${id} - ${error}`);
    return BackgroundJobMapper.toEntity(backgroundJob);
  }

  async delete(id: string): Promise<any> {
    const backgroundJob = await this.backgroundJobRepository.delete(id);
    this.logger.log(`Background job deleted: ${id}`);
    return BackgroundJobMapper.toEntity(backgroundJob);
  }

  private calculateRetryTime(attempts: number): Date {
    const delay = Math.min(Math.pow(2, attempts) * 1000, 60000);
    return new Date(Date.now() + delay);
  }
}
