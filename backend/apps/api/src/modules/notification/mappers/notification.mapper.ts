import { Notification } from '../entities/notification.entity';

export class NotificationMapper {
  static toEntity(raw: any): Notification {
    const entity = new Notification();
    entity.id = raw.id;
    entity.userId = raw.userId;
    entity.type = raw.type;
    entity.title = raw.title;
    entity.message = raw.message;
    entity.data = raw.data;
    entity.channels = raw.channels;
    entity.status = raw.status;
    entity.priority = raw.priority;
    entity.readAt = raw.readAt;
    entity.expiresAt = raw.expiresAt;
    entity.sentAt = raw.sentAt;
    entity.deliveredAt = raw.deliveredAt;
    entity.failedAt = raw.failedAt;
    entity.failureReason = raw.failureReason;
    entity.createdAt = raw.createdAt;
    entity.updatedAt = raw.updatedAt;
    return entity;
  }

  static toCreateInput(dto: any): any {
    return {
      userId: dto.userId,
      type: dto.type,
      title: dto.title,
      message: dto.message,
      data: dto.data,
      channels: dto.channels,
      priority: dto.priority || 'NORMAL',
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.readAt !== undefined) data.readAt = dto.readAt;
    if (dto.sentAt !== undefined) data.sentAt = dto.sentAt;
    if (dto.deliveredAt !== undefined) data.deliveredAt = dto.deliveredAt;
    if (dto.failedAt !== undefined) data.failedAt = dto.failedAt;
    if (dto.failureReason !== undefined) data.failureReason = dto.failureReason;
    return data;
  }
}
