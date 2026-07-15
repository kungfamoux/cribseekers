import { Injectable, Logger } from '@nestjs/common';
import { ISMSNotificationRepository } from '../interfaces/sms-notification.repository.interface';
import { SMSNotificationMapper } from '../mappers/sms-notification.mapper';
import { SMSProvider } from '../providers/sms-provider.interface';
import { TermiiProvider } from '../providers/termii-provider';
import { SMSDeliveryException } from '../exceptions/notification.exception';

@Injectable()
export class SMSNotificationService {
  private readonly logger = new Logger(SMSNotificationService.name);
  private readonly smsProvider: SMSProvider;

  constructor(
    private readonly smsNotificationRepository: ISMSNotificationRepository,
  ) {
    this.smsProvider = new TermiiProvider();
  }

  async findById(id: string): Promise<any> {
    const sms = await this.smsNotificationRepository.findById(id);
    return sms ? SMSNotificationMapper.toEntity(sms) : null;
  }

  async findByNotificationId(notificationId: string, options?: any): Promise<any> {
    return this.smsNotificationRepository.findByNotificationId(notificationId, options);
  }

  async findByTo(to: string, options?: any): Promise<any> {
    return this.smsNotificationRepository.findByTo(to, options);
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    return this.smsNotificationRepository.findByStatus(status, options);
  }

  async create(data: any): Promise<any> {
    const sms = await this.smsNotificationRepository.create(
      SMSNotificationMapper.toCreateInput(data),
    );
    this.logger.log(`SMS notification created: ${sms.id}`);
    return SMSNotificationMapper.toEntity(sms);
  }

  async send(id: string): Promise<any> {
    const sms = await this.smsNotificationRepository.findById(id);
    if (!sms) {
      throw new Error(`SMS notification ${id} not found`);
    }

    try {
      const response = await this.smsProvider.send(sms.to, sms.message);

      if (response.success) {
        await this.smsNotificationRepository.update(id, {
          status: 'SENT' as any,
          sentAt: new Date(),
          metadata: { ...sms.metadata, providerResponse: response },
        });
        this.logger.log(`SMS sent successfully: ${id}`);
      } else {
        throw new SMSDeliveryException(response.error || 'SMS delivery failed');
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.smsNotificationRepository.update(id, {
        status: 'FAILED' as any,
        failedAt: new Date(),
        error: errorMessage,
      });
      throw new SMSDeliveryException(errorMessage);
    }
  }

  async softDelete(id: string): Promise<any> {
    const sms = await this.smsNotificationRepository.softDelete(id);
    this.logger.log(`SMS notification soft deleted: ${id}`);
    return SMSNotificationMapper.toEntity(sms);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.smsNotificationRepository.findAll(filters, options);
  }
}
