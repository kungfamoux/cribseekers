import { NotificationTemplate } from '../entities/notification-template.entity';

export class NotificationTemplateMapper {
  static toEntity(raw: any): NotificationTemplate {
    const entity = new NotificationTemplate();
    entity.id = raw.id;
    entity.name = raw.name;
    entity.type = raw.type;
    entity.subject = raw.subject;
    entity.body = raw.body;
    entity.variables = raw.variables;
    entity.channels = raw.channels;
    entity.isActive = raw.isActive;
    entity.version = raw.version;
    entity.createdAt = raw.createdAt;
    entity.updatedAt = raw.updatedAt;
    return entity;
  }

  static toCreateInput(dto: any): any {
    return {
      name: dto.name,
      type: dto.type,
      subject: dto.subject,
      body: dto.body,
      variables: dto.variables,
      channels: dto.channels,
      isActive: true,
      version: 1,
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.type !== undefined) data.type = dto.type;
    if (dto.subject !== undefined) data.subject = dto.subject;
    if (dto.body !== undefined) data.body = dto.body;
    if (dto.variables !== undefined) data.variables = dto.variables;
    if (dto.channels !== undefined) data.channels = dto.channels;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.version !== undefined) data.version = dto.version;
    return data;
  }
}
