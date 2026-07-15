import { FeatureFlag } from '../entities/feature-flag.entity';
import { PaginationOptions, SortOptions, PaginationResult } from './audit-log.repository.interface';

export interface IFeatureFlagRepository {
  findById(id: string): Promise<FeatureFlag | null>;
  findByKey(key: string): Promise<FeatureFlag | null>;
  findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<FeatureFlag>>;
  create(data: any): Promise<FeatureFlag>;
  update(id: string, data: any): Promise<FeatureFlag>;
  delete(id: string): Promise<FeatureFlag>;
  withTransaction(transaction: any): this;
}
