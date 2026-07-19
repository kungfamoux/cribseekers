import { PushSubscription } from '../entities/push-subscription.entity';

export class PushSubscriptionMapper {
  static toEntity(raw: any): PushSubscription {
    const entity = new PushSubscription();
    entity.id = raw.id;
    entity.userId = raw.userId;
    entity.endpoint = raw.endpoint;
    entity.keys = raw.keys;
    entity.userAgent = raw.userAgent;
    entity.isActive = raw.isActive;
    entity.createdAt = raw.createdAt;
    entity.updatedAt = raw.updatedAt;
    return entity;
  }

  static toCreateInput(dto: any): any {
    return {
      userId: dto.userId,
      endpoint: dto.endpoint,
      keys: dto.keys,
      userAgent: dto.userAgent,
      isActive: true,
    };
  }

  static toUpdateInput(dto: any): any {
    const data: any = {};
    if (dto.endpoint !== undefined) data.endpoint = dto.endpoint;
    if (dto.keys !== undefined) data.keys = dto.keys;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    return data;
  }
}
