import { SystemSetting } from '../entities/system-setting.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface ISystemSettingRepository {
  findById(id: string): Promise<SystemSetting | null>;
  findByKey(key: string): Promise<SystemSetting | null>;
  findByCategory(category: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SystemSetting>>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SystemSetting>>;
  create(data: any): Promise<SystemSetting>;
  update(id: string, data: any): Promise<SystemSetting>;
  delete(id: string): Promise<SystemSetting>;
  withTransaction(transaction: any): this;
}
