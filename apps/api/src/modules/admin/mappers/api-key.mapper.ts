import { ApiKey } from '../entities/api-key.entity';

export class ApiKeyMapper {
  static toEntity(data: any): ApiKey {
    return {
      id: data.id,
      userId: data.userId,
      name: data.name,
      key: data.key,
      scopes: data.scopes,
      isActive: data.isActive,
      expiresAt: data.expiresAt,
      lastUsedAt: data.lastUsedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      userId: data.userId,
      name: data.name,
      key: data.key,
      scopes: data.scopes,
      expiresAt: data.expiresAt,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      name: data.name,
      key: data.key,
      scopes: data.scopes,
      isActive: data.isActive,
      expiresAt: data.expiresAt,
      lastUsedAt: data.lastUsedAt,
    };
  }
}
