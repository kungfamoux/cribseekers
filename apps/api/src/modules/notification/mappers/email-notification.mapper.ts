import { EmailNotification } from '../entities/email-notification.entity';

export class EmailNotificationMapper {
  static toEntity(raw: any): EmailNotification {
    const entity = new EmailNotification();
    entity.id = raw.id;
    entity.notificationId = raw.notificationId;
    entity.to = raw.to;
    entity.subject = raw.subject;
    entity.body = raw.body;
    entity.htmlBody = raw.htmlBody;
    entity.status = raw.status;
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
      to: dto.to,
      subject: dto.subject,
      body: dto.body,
      htmlBody: dto.htmlBody,
      status: 'PENDING',
      metadata: dto.metadata,
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.sentAt !== undefined) data.sentAt = dto.sentAt;
    if (dto.deliveredAt !== undefined) data.deliveredAt = dto.deliveredAt;
    if (dto.failedAt !== undefined) data.failedAt = dto.failedAt;
    if (dto.error !== undefined) data.error = dto.error;
    if (dto.metadata !== undefined) data.metadata = dto.metadata;
    if (dto.deletedAt !== undefined) data.deletedAt = dto.deletedAt;
    return data;
  }
}
