import { Injectable, Logger } from '@nestjs/common';
import { NotificationPreferenceRepository } from '../repository/notification-preference.repository';
import { NotificationPreferenceMapper } from '../mappers/notification-preference.mapper';
import { NotificationPreferenceNotFoundException } from '../exceptions/notification.exception';

@Injectable()
export class NotificationPreferenceService {
  private readonly logger = new Logger(NotificationPreferenceService.name);

  constructor(private readonly notificationPreferenceRepository: NotificationPreferenceRepository) {}

  async findById(id: string): Promise<any> {
    const preference = await this.notificationPreferenceRepository.findById(id);
    return preference ? NotificationPreferenceMapper.toEntity(preference) : null;
  }

  async findByUserId(userId: string): Promise<any> {
    const preference = await this.notificationPreferenceRepository.findByUserId(userId);
    if (!preference) {
      return null;
    }
    return NotificationPreferenceMapper.toEntity(preference);
  }

  async getOrCreate(userId: string): Promise<any> {
    let preference = await this.notificationPreferenceRepository.findByUserId(userId);
    if (!preference) {
      preference = await this.notificationPreferenceRepository.create(
        NotificationPreferenceMapper.toCreateInput({ userId }),
      );
      this.logger.log(`Notification preference created for user: ${userId}`);
    }
    return NotificationPreferenceMapper.toEntity(preference);
  }

  async create(data: any): Promise<any> {
    const preference = await this.notificationPreferenceRepository.create(
      NotificationPreferenceMapper.toCreateInput(data),
    );
    this.logger.log(`Notification preference created: ${preference.id}`);
    return NotificationPreferenceMapper.toEntity(preference);
  }

  async update(userId: string, data: any): Promise<any> {
    const preference = await this.notificationPreferenceRepository.findByUserId(userId);
    if (!preference) {
      throw new NotificationPreferenceNotFoundException(userId);
    }

    const updated = await this.notificationPreferenceRepository.update(
      preference.id,
      NotificationPreferenceMapper.toUpdateInput(data),
    );
    this.logger.log(`Notification preference updated: ${userId}`);
    return NotificationPreferenceMapper.toEntity(updated);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.notificationPreferenceRepository.findAll(filters, options);
  }
}
