import { SystemSetting } from '../entities/system-setting.entity';

export class SystemSettingMapper {
  static toEntity(data: any): SystemSetting {
    return {
      id: data.id,
      key: data.key,
      value: data.value,
      type: data.type,
      category: data.category,
      description: data.description,
      isPublic: data.isPublic,
      updatedAtBy: data.updatedAtBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      key: data.key,
      value: data.value,
      type: data.type,
      category: data.category,
      description: data.description,
      isPublic: data.isPublic,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      value: data.value,
      description: data.description,
      isPublic: data.isPublic,
      updatedAtBy: data.updatedAtBy,
    };
  }
}
