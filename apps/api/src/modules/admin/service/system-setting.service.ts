import { Injectable, Logger } from '@nestjs/common';
import { ISystemSettingRepository } from '../interfaces/system-setting.repository.interface';
import { SystemSettingMapper } from '../mappers/system-setting.mapper';
import { DuplicateSystemSettingException, SystemSettingValidationException } from '../exceptions/admin.exception';
import { AdminValidator } from '../validators/admin.validator';

@Injectable()
export class SystemSettingService {
  private readonly logger = new Logger(SystemSettingService.name);

  constructor(
    private readonly systemSettingRepository: ISystemSettingRepository,
  ) {}

  async findById(id: string): Promise<any> {
    const systemSetting = await this.systemSettingRepository.findById(id);
    return systemSetting ? SystemSettingMapper.toEntity(systemSetting) : null;
  }

  async findByKey(key: string): Promise<any> {
    const systemSetting = await this.systemSettingRepository.findByKey(key);
    return systemSetting ? SystemSettingMapper.toEntity(systemSetting) : null;
  }

  async findByCategory(category: string, options?: any): Promise<any> {
    return this.systemSettingRepository.findByCategory(category, options);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.systemSettingRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    if (!AdminValidator.isValidSystemSettingKey(data.key)) {
      throw new SystemSettingValidationException('Invalid system setting key format');
    }

    if (!AdminValidator.isValidSystemSettingType(data.type)) {
      throw new SystemSettingValidationException('Invalid system setting type');
    }

    const existing = await this.systemSettingRepository.findByKey(data.key);
    if (existing) {
      throw new DuplicateSystemSettingException(data.key);
    }

    const systemSetting = await this.systemSettingRepository.create(
      SystemSettingMapper.toCreateInput(data),
    );
    this.logger.log(`System setting created: ${systemSetting.key}`);
    return SystemSettingMapper.toEntity(systemSetting);
  }

  async update(id: string, data: any, updatedBy: string): Promise<any> {
    const systemSetting = await this.systemSettingRepository.update(
      id,
      SystemSettingMapper.toUpdateInput({ ...data, updatedBy }),
    );
    this.logger.log(`System setting updated: ${id}`);
    return SystemSettingMapper.toEntity(systemSetting);
  }

  async delete(id: string): Promise<any> {
    const systemSetting = await this.systemSettingRepository.delete(id);
    this.logger.log(`System setting deleted: ${id}`);
    return SystemSettingMapper.toEntity(systemSetting);
  }
}
