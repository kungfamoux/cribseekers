import { Injectable, Logger } from '@nestjs/common';
import { INotificationQueueRepository } from '../interfaces/notification-queue.repository.interface';
import { NotificationQueueMapper } from '../mappers/notification-queue.mapper';
import { NotificationQueueException, MaxRetriesExceededException } from '../exceptions/notification.exception';

@Injectable()
export class NotificationQueueService {
  private readonly logger = new Logger(NotificationQueueService.name);

  constructor(private readonly notificationQueueRepository: INotificationQueueRepository) {}

  async findById(id: string): Promise<any> {
    const queue = await this.notificationQueueRepository.findById(id);
    return queue ? NotificationQueueMapper.toEntity(queue) : null;
  }

  async findByNotificationId(notificationId: string, options?: any): Promise<any> {
    return this.notificationQueueRepository.findByNotificationId(notificationId, options);
  }

  async findByChannel(channel: string, options?: any): Promise<any> {
    return this.notificationQueueRepository.findByChannel(channel, options);
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    return this.notificationQueueRepository.findByStatus(status, options);
  }

  async findPending(options?: any): Promise<any> {
    return this.notificationQueueRepository.findPending(options);
  }

  async findFailed(options?: any): Promise<any> {
    return this.notificationQueueRepository.findFailed(options);
  }

  async findRetryable(options?: any): Promise<any> {
    return this.notificationQueueRepository.findRetryable(options);
  }

  async create(data: any): Promise<any> {
    const queue = await this.notificationQueueRepository.create(
      NotificationQueueMapper.toCreateInput(data),
    );
    this.logger.log(`Notification queue item created: ${queue.id}`);
    return NotificationQueueMapper.toEntity(queue);
  }

  async update(id: string, data: any): Promise<any> {
    const queue = await this.notificationQueueRepository.findById(id);
    if (!queue) {
      throw new NotificationQueueException(`Queue item ${id} not found`);
    }

    if (data.attempts && data.attempts > queue.maxAttempts) {
      throw new MaxRetriesExceededException(id);
    }

    const updated = await this.notificationQueueRepository.update(
      id,
      NotificationQueueMapper.toUpdateInput(data),
    );
    this.logger.log(`Notification queue item updated: ${id}`);
    return NotificationQueueMapper.toEntity(updated);
  }

  async softDelete(id: string): Promise<any> {
    const queue = await this.notificationQueueRepository.softDelete(id);
    this.logger.log(`Notification queue item soft deleted: ${id}`);
    return NotificationQueueMapper.toEntity(queue);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.notificationQueueRepository.findAll(filters, options);
  }
}
