import { Injectable, Logger } from '@nestjs/common';
import { IEmailNotificationRepository } from '../interfaces/email-notification.repository.interface';
import { EmailNotificationMapper } from '../mappers/email-notification.mapper';
import { EmailProvider } from '../providers/email-provider.interface';
import { SMTPProvider } from '../providers/smtp-provider';
import { EmailDeliveryException } from '../exceptions/notification.exception';

@Injectable()
export class EmailNotificationService {
  private readonly logger = new Logger(EmailNotificationService.name);
  private readonly emailProvider: EmailProvider;

  constructor(
    private readonly emailNotificationRepository: IEmailNotificationRepository,
  ) {
    this.emailProvider = new SMTPProvider();
  }

  async findById(id: string): Promise<any> {
    const email = await this.emailNotificationRepository.findById(id);
    return email ? EmailNotificationMapper.toEntity(email) : null;
  }

  async findByNotificationId(notificationId: string, options?: any): Promise<any> {
    return this.emailNotificationRepository.findByNotificationId(notificationId, options);
  }

  async findByTo(to: string, options?: any): Promise<any> {
    return this.emailNotificationRepository.findByTo(to, options);
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    return this.emailNotificationRepository.findByStatus(status, options);
  }

  async create(data: any): Promise<any> {
    const email = await this.emailNotificationRepository.create(
      EmailNotificationMapper.toCreateInput(data),
    );
    this.logger.log(`Email notification created: ${email.id}`);
    return EmailNotificationMapper.toEntity(email);
  }

  async send(id: string): Promise<any> {
    const email = await this.emailNotificationRepository.findById(id);
    if (!email) {
      throw new Error(`Email notification ${id} not found`);
    }

    try {
      const response = await this.emailProvider.send(email.to, email.subject, email.body, email.htmlBody);

      if (response.success) {
        await this.emailNotificationRepository.update(id, {
          status: 'SENT' as any,
          sentAt: new Date(),
          metadata: { ...email.metadata, providerResponse: response },
        });
        this.logger.log(`Email sent successfully: ${id}`);
      } else {
        throw new EmailDeliveryException(response.error || 'Email delivery failed');
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.emailNotificationRepository.update(id, {
        status: 'FAILED' as any,
        failedAt: new Date(),
        error: errorMessage,
      });
      throw new EmailDeliveryException(errorMessage);
    }
  }

  async softDelete(id: string): Promise<any> {
    const email = await this.emailNotificationRepository.softDelete(id);
    this.logger.log(`Email notification soft deleted: ${id}`);
    return EmailNotificationMapper.toEntity(email);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.emailNotificationRepository.findAll(filters, options);
  }
}
