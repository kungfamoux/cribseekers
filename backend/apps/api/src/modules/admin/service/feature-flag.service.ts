import { Injectable, Logger } from '@nestjs/common';
import { FeatureFlagRepository } from '../repository/feature-flag.repository';
import { FeatureFlagMapper } from '../mappers/feature-flag.mapper';
import { FeatureFlagNotFoundException, DuplicateFeatureFlagException } from '../exceptions/admin.exception';
import { AdminValidator } from '../validators/admin.validator';

@Injectable()
export class FeatureFlagService {
  private readonly logger = new Logger(FeatureFlagService.name);

  constructor(private readonly featureFlagRepository: FeatureFlagRepository) {}

  async findById(id: string): Promise<any> {
    const featureFlag = await this.featureFlagRepository.findById(id);
    if (!featureFlag) {
      throw new FeatureFlagNotFoundException(id);
    }
    return FeatureFlagMapper.toEntity(featureFlag);
  }

  async findByKey(key: string): Promise<any> {
    const featureFlag = await this.featureFlagRepository.findByKey(key);
    if (!featureFlag) {
      throw new FeatureFlagNotFoundException(key);
    }
    return FeatureFlagMapper.toEntity(featureFlag);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.featureFlagRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    if (!AdminValidator.isValidFeatureFlagPercentage(data.percentage)) {
      throw new Error('Invalid feature flag percentage');
    }

    const existing = await this.featureFlagRepository.findByKey(data.key);
    if (existing) {
      throw new DuplicateFeatureFlagException(data.key);
    }

    const featureFlag = await this.featureFlagRepository.create(
      FeatureFlagMapper.toCreateInput(data),
    );
    this.logger.log(`Feature flag created: ${featureFlag.key}`);
    return FeatureFlagMapper.toEntity(featureFlag);
  }

  async update(id: string, data: any): Promise<any> {
    if (data.percentage !== undefined && !AdminValidator.isValidFeatureFlagPercentage(data.percentage)) {
      throw new Error('Invalid feature flag percentage');
    }

    const featureFlag = await this.featureFlagRepository.update(
      id,
      FeatureFlagMapper.toUpdateInput(data),
    );
    this.logger.log(`Feature flag updated: ${id}`);
    return FeatureFlagMapper.toEntity(featureFlag);
  }

  async delete(id: string): Promise<any> {
    const featureFlag = await this.featureFlagRepository.delete(id);
    this.logger.log(`Feature flag deleted: ${id}`);
    return FeatureFlagMapper.toEntity(featureFlag);
  }

  async isEnabled(key: string, userId?: string): Promise<boolean> {
    const featureFlag = await this.featureFlagRepository.findByKey(key);
    if (!featureFlag) {
      return false;
    }

    if (!featureFlag.enabled) {
      return false;
    }

    if (featureFlag.percentage === 100) {
      return true;
    }

    if (featureFlag.percentage === 0) {
      return false;
    }

    if (userId && featureFlag.whitelist.includes(userId)) {
      return true;
    }

    const hash = userId ? this.hashCode(userId) : Math.random() * 100;
    return hash % 100 < featureFlag.percentage;
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}
