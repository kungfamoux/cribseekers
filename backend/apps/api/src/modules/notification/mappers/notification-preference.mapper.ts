import { NotificationPreference } from '../entities/notification-preference.entity';

export class NotificationPreferenceMapper {
  static toEntity(raw: any): NotificationPreference {
    const entity = new NotificationPreference();
    entity.id = raw.id;
    entity.userId = raw.userId;
    entity.preferences = raw.preferences;
    entity.quietHoursStart = raw.quietHoursStart;
    entity.quietHoursEnd = raw.quietHoursEnd;
    entity.timezone = raw.timezone;
    entity.createdAt = raw.createdAt;
    entity.updatedAt = raw.updatedAt;
    return entity;
  }

  static toCreateInput(dto: any): any {
    return {
      userId: dto.userId,
      preferences: dto.preferences,
      quietHoursStart: dto.quietHoursStart,
      quietHoursEnd: dto.quietHoursEnd,
      timezone: dto.timezone || 'Africa/Lagos',
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.preferences !== undefined) data.preferences = dto.preferences;
    if (dto.quietHoursStart !== undefined) data.quietHoursStart = dto.quietHoursStart;
    if (dto.quietHoursEnd !== undefined) data.quietHoursEnd = dto.quietHoursEnd;
    if (dto.timezone !== undefined) data.timezone = dto.timezone;
    return data;
  }
}
