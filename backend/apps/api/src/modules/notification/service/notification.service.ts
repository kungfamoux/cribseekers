import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { NotificationRepository } from '../repository/notification.repository';
import { NotificationQueueRepository } from '../repository/notification-queue.repository';
import { NotificationPreferenceRepository } from '../repository/notification-preference.repository';
import { NotificationTemplateRepository } from '../repository/notification-template.repository';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationQueueMapper } from '../mappers/notification-queue.mapper';
import { NotificationValidator } from '../validators/notification.validator';
import { NotificationNotFoundException, NotificationExpiredException, QuietHoursViolationException } from '../exceptions/notification.exception';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationQueueRepository: NotificationQueueRepository,
    private readonly notificationPreferenceRepository: NotificationPreferenceRepository,
    private readonly notificationTemplateRepository: NotificationTemplateRepository,
  ) {}

  async create(data: any): Promise<any> {
    return this.prisma.$transaction(async (tx: any) => {
      const notification = await this.notificationRepository
        .withTransaction(tx)
        .create(NotificationMapper.toCreateInput(data));

      for (const channel of data.channels) {
        await this.notificationQueueRepository
          .withTransaction(tx)
          .create(NotificationQueueMapper.toCreateInput({
            notificationId: notification.id,
            channel,
          }));
      }

      this.logger.log(`Notification created: ${notification.id} for user ${data.userId}`);
      return NotificationMapper.toEntity(notification);
    });
  }

  async createFromTemplate(templateName: string, userId: string, variables: Record<string, any>): Promise<any> {
    const template = await this.notificationTemplateRepository.findByName(templateName);
    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }

    const message = NotificationValidator.substituteVariables(template.body, variables);
    const subject = NotificationValidator.substituteVariables(template.subject, variables);

    const preference = await this.notificationPreferenceRepository.findByUserId(userId);
    const quietStart = preference?.quietHoursStart;
    const quietEnd = preference?.quietHoursEnd;

    const currentHour = new Date().getHours();
    if (NotificationValidator.isWithinQuietHours(currentHour, quietStart, quietEnd)) {
      throw new QuietHoursViolationException();
    }

    return this.create({
      userId,
      type: template.type,
      title: subject,
      message,
      data: variables,
      channels: template.channels,
      priority: 'NORMAL',
    });
  }

  async findById(id: string): Promise<any> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotificationNotFoundException(id);
    }

    if (NotificationValidator.isNotificationExpired(notification.expiresAt)) {
      throw new NotificationExpiredException(id);
    }

    return NotificationMapper.toEntity(notification);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.notificationRepository.findByUserId(userId, options);
  }

  async findUnread(userId: string, options?: any): Promise<any> {
    return this.notificationRepository.findUnread(userId, options);
  }

  async markAsRead(id: string): Promise<any> {
    const notification = await this.notificationRepository.markAsRead(id);
    this.logger.log(`Notification marked as read: ${id}`);
    return NotificationMapper.toEntity(notification);
  }

  async markAsDismissed(id: string): Promise<any> {
    const notification = await this.notificationRepository.markAsDismissed(id);
    this.logger.log(`Notification dismissed: ${id}`);
    return NotificationMapper.toEntity(notification);
  }

  async processQueue(): Promise<void> {
    const pending = await this.notificationQueueRepository.findPending({ limit: 100 });

    for (const item of pending.data) {
      await this.processQueueItem(item.id);
    }
  }

  async processQueueItem(queueId: string): Promise<void> {
    const queueItem = await this.notificationQueueRepository.findById(queueId);
    if (!queueItem) return;

    try {
      await this.prisma.$transaction(async (tx: any) => {
        await this.notificationQueueRepository
          .withTransaction(tx)
          .update(queueId, {
            status: 'SENT' as any,
            sentAt: new Date(),
            attempts: queueItem.attempts + 1,
          });

        await this.notificationRepository
          .withTransaction(tx)
          .update(queueItem.notificationId, {
            status: 'SENT' as any,
            sentAt: new Date(),
          });
      });

      this.logger.log(`Queue item processed: ${queueId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const canRetry = NotificationValidator.canRetryNotification(queueItem.attempts, queueItem.maxAttempts);

      await this.notificationQueueRepository.update(queueId, {
        status: canRetry ? 'FAILED' as any : 'FAILED' as any,
        failedAt: new Date(),
        attempts: queueItem.attempts + 1,
        error: errorMessage,
      });

      this.logger.error(`Queue item failed: ${queueId} - ${errorMessage}`);
    }
  }

  async retryFailed(): Promise<void> {
    const retryable = await this.notificationQueueRepository.findRetryable({ limit: 50 });

    for (const item of retryable.data) {
      await this.processQueueItem(item.id);
    }
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.notificationRepository.findAll(filters, options);
  }
}
