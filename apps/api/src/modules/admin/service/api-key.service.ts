import { Injectable, Logger } from '@nestjs/common';
import { IApiKeyRepository } from '../interfaces/api-key.repository.interface';
import { ApiKeyMapper } from '../mappers/api-key.mapper';
import { ApiKeyNotFoundException, DuplicateApiKeyException } from '../exceptions/admin.exception';
import { AdminValidator } from '../validators/admin.validator';

@Injectable()
export class ApiKeyService {
  private readonly logger = new Logger(ApiKeyService.name);

  constructor(private readonly apiKeyRepository: IApiKeyRepository) {}

  async findById(id: string): Promise<any> {
    const apiKey = await this.apiKeyRepository.findById(id);
    if (!apiKey) {
      throw new ApiKeyNotFoundException(id);
    }
    return ApiKeyMapper.toEntity(apiKey);
  }

  async findByKey(key: string): Promise<any> {
    const apiKey = await this.apiKeyRepository.findByKey(key);
    if (!apiKey) {
      throw new ApiKeyNotFoundException(key);
    }
    return ApiKeyMapper.toEntity(apiKey);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.apiKeyRepository.findByUserId(userId, options);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.apiKeyRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    if (!AdminValidator.isValidApiKeyScope(data.scopes)) {
      throw new Error('Invalid API key scopes');
    }

    const existing = await this.apiKeyRepository.findByKey(data.key);
    if (existing) {
      throw new DuplicateApiKeyException(data.key);
    }

    const apiKey = await this.apiKeyRepository.create(
      ApiKeyMapper.toCreateInput(data),
    );
    this.logger.log(`API key created: ${apiKey.id}`);
    return ApiKeyMapper.toEntity(apiKey);
  }

  async rotate(id: string, newKey: string, reason?: string): Promise<any> {
    const apiKey = await this.apiKeyRepository.update(
      id,
      ApiKeyMapper.toUpdateInput({ key: newKey }),
    );
    this.logger.log(`API key rotated: ${id}${reason ? ` - ${reason}` : ''}`);
    return ApiKeyMapper.toEntity(apiKey);
  }

  async revoke(id: string): Promise<any> {
    const apiKey = await this.apiKeyRepository.update(
      id,
      ApiKeyMapper.toUpdateInput({ isActive: false }),
    );
    this.logger.log(`API key revoked: ${id}`);
    return ApiKeyMapper.toEntity(apiKey);
  }

  async delete(id: string): Promise<any> {
    const apiKey = await this.apiKeyRepository.delete(id);
    this.logger.log(`API key deleted: ${id}`);
    return ApiKeyMapper.toEntity(apiKey);
  }

  async updateLastUsed(id: string): Promise<void> {
    await this.apiKeyRepository.update(
      id,
      ApiKeyMapper.toUpdateInput({ lastUsedAt: new Date() }),
    );
  }
}
