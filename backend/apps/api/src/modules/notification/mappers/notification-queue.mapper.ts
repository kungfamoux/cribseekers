import { NotificationQueue } from '../entities/notification-queue.entity';

export class NotificationQueueMapper {
  static toEntity(raw: any): NotificationQueue {
    const entity = new NotificationQueue();
    entity.id = raw.id;
    entity.notificationId = raw.notificationId;
    entity.channel = raw.channel;
    entity.status = raw.status;
    entity.attempts = raw.attempts;
    entity.maxAttempts = raw.maxAttempts;
    entity.scheduledAt = raw.scheduledAt;
    entity.sentAt = raw.sentAt;
    entity.deliveredAt = raw.deliveredAt;
    entity.failedAt = raw.failedAt;
    entity.error = raw.error;
    entity.metadata = raw.metadata;
    entity.createdAt = raw.createdAt;
    entity.updatedAt = raw.updatedAt;
    entity.deletedAt = raw.deletedAt;
    return entity;
  }

  static toCreateInput(dto: any): any {
    return {
      notificationId: dto.notificationId,
      channel: dto.channel,
      status: 'PENDING',
      attempts: 0,
      maxAttempts: dto.maxAttempts || 3,
      scheduledAt: new Date(),
      metadata: dto.metadata,
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.attempts !== undefined) data.attempts = dto.attempts;
    if (dto.sentAt !== undefined) data.sentAt = dto.sentAt;
    if (dto.deliveredAt !== undefined) data.deliveredAt = dto.deliveredAt;
    if (dto.failedAt !== undefined) data.failedAt = dto.failedAt;
    if (dto.error !== undefined) data.error = dto.error;
    if (dto.metadata !== undefined) data.metadata = dto.metadata;
    if (dto.deletedAt !== undefined) data.deletedAt = dto.deletedAt;
    return data;
  }
}
