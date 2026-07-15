import { BackgroundJob } from '../entities/background-job.entity';

export class BackgroundJobMapper {
  static toEntity(data: any): BackgroundJob {
    return {
      id: data.id,
      name: data.name,
      queue: data.queue,
      payload: data.payload,
      status: data.status,
      priority: data.priority,
      attempts: data.attempts,
      maxAttempts: data.maxAttempts,
      error: data.error,
      startedAt: data.startedAt,
      completedAt: data.completedAt,
      failedAt: data.failedAt,
      scheduledAt: data.scheduledAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      name: data.name,
      queue: data.queue,
      payload: data.payload,
      status: data.status,
      priority: data.priority,
      maxAttempts: data.maxAttempts,
      scheduledAt: data.scheduledAt,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      status: data.status,
      attempts: data.attempts,
      error: data.error,
      startedAt: data.startedAt,
      completedAt: data.completedAt,
      failedAt: data.failedAt,
      scheduledAt: data.scheduledAt,
    };
  }
}
