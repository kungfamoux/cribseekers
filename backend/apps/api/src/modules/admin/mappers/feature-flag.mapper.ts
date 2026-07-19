import { FeatureFlag } from '../entities/feature-flag.entity';

export class FeatureFlagMapper {
  static toEntity(data: any): FeatureFlag {
    return {
      id: data.id,
      key: data.key,
      description: data.description,
      enabled: data.enabled,
      percentage: data.percentage,
      whitelist: data.whitelist,
      metadata: data.metadata,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      key: data.key,
      description: data.description,
      enabled: data.enabled,
      percentage: data.percentage,
      whitelist: data.whitelist,
      metadata: data.metadata,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      description: data.description,
      enabled: data.enabled,
      percentage: data.percentage,
      whitelist: data.whitelist,
      metadata: data.metadata,
    };
  }
}
