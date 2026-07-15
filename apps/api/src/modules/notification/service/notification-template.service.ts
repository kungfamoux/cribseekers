import { Injectable, Logger } from '@nestjs/common';
import { INotificationTemplateRepository } from '../interfaces/notification-template.repository.interface';
import { NotificationTemplateMapper } from '../mappers/notification-template.mapper';
import { NotificationTemplateNotFoundException, DuplicateTemplateException } from '../exceptions/notification.exception';
import { NotificationValidator } from '../validators/notification.validator';

@Injectable()
export class NotificationTemplateService {
  private readonly logger = new Logger(NotificationTemplateService.name);

  constructor(private readonly notificationTemplateRepository: INotificationTemplateRepository) {}

  async findById(id: string): Promise<any> {
    const template = await this.notificationTemplateRepository.findById(id);
    if (!template) {
      throw new NotificationTemplateNotFoundException(id);
    }
    return NotificationTemplateMapper.toEntity(template);
  }

  async findByName(name: string): Promise<any> {
    const template = await this.notificationTemplateRepository.findByName(name);
    if (!template) {
      throw new NotificationTemplateNotFoundException(name);
    }
    return NotificationTemplateMapper.toEntity(template);
  }

  async findByType(type: string, options?: any): Promise<any> {
    return this.notificationTemplateRepository.findByType(type, options);
  }

  async findActive(options?: any): Promise<any> {
    return this.notificationTemplateRepository.findActive(options);
  }

  async create(data: any): Promise<any> {
    if (!NotificationValidator.isValidTemplateVariables(data.variables)) {
      throw new Error('Invalid template variables');
    }

    const existing = await this.notificationTemplateRepository.findByName(data.name);
    if (existing) {
      throw new DuplicateTemplateException(data.name);
    }

    const template = await this.notificationTemplateRepository.create(
      NotificationTemplateMapper.toCreateInput(data),
    );
    this.logger.log(`Notification template created: ${template.name}`);
    return NotificationTemplateMapper.toEntity(template);
  }

  async update(id: string, data: any): Promise<any> {
    if (data.variables && !NotificationValidator.isValidTemplateVariables(data.variables)) {
      throw new Error('Invalid template variables');
    }

    const template = await this.notificationTemplateRepository.update(
      id,
      NotificationTemplateMapper.toUpdateInput(data),
    );
    this.logger.log(`Notification template updated: ${id}`);
    return NotificationTemplateMapper.toEntity(template);
  }

  async delete(id: string): Promise<any> {
    const template = await this.notificationTemplateRepository.delete(id);
    this.logger.log(`Notification template deleted: ${id}`);
    return NotificationTemplateMapper.toEntity(template);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.notificationTemplateRepository.findAll(filters, options);
  }
}
