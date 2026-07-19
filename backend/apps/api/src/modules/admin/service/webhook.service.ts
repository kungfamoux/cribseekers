import { Injectable, Logger } from '@nestjs/common';
import { WebhookRepository } from '../repository/webhook.repository';
import { WebhookDeliveryRepository } from '../repository/webhook-delivery.repository';
import { WebhookMapper } from '../mappers/webhook.mapper';
import { WebhookDeliveryMapper } from '../mappers/webhook-delivery.mapper';
import { WebhookNotFoundException, DuplicateWebhookException } from '../exceptions/admin.exception';
import { AdminValidator } from '../validators/admin.validator';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    private readonly webhookRepository: WebhookRepository,
    private readonly webhookDeliveryRepository: WebhookDeliveryRepository,
  ) {}

  async findById(id: string): Promise<any> {
    const webhook = await this.webhookRepository.findById(id);
    if (!webhook) {
      throw new WebhookNotFoundException(id);
    }
    return WebhookMapper.toEntity(webhook);
  }

  async findByUrl(url: string): Promise<any> {
    const webhook = await this.webhookRepository.findByUrl(url);
    return webhook ? WebhookMapper.toEntity(webhook) : null;
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    return this.webhookRepository.findByStatus(status, options);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.webhookRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    if (!AdminValidator.isValidWebhookUrl(data.url)) {
      throw new Error('Invalid webhook URL');
    }

    const existing = await this.webhookRepository.findByUrl(data.url);
    if (existing) {
      throw new DuplicateWebhookException(data.url);
    }

    const webhook = await this.webhookRepository.create(
      WebhookMapper.toCreateInput(data),
    );
    this.logger.log(`Webhook created: ${webhook.id}`);
    return WebhookMapper.toEntity(webhook);
  }

  async update(id: string, data: any): Promise<any> {
    if (data.url && !AdminValidator.isValidWebhookUrl(data.url)) {
      throw new Error('Invalid webhook URL');
    }

    const webhook = await this.webhookRepository.update(
      id,
      WebhookMapper.toUpdateInput(data),
    );
    this.logger.log(`Webhook updated: ${id}`);
    return WebhookMapper.toEntity(webhook);
  }

  async delete(id: string): Promise<any> {
    const webhook = await this.webhookRepository.delete(id);
    this.logger.log(`Webhook deleted: ${id}`);
    return WebhookMapper.toEntity(webhook);
  }

  async trigger(webhookId: string, event: string, payload: any): Promise<any> {
    const webhook = await this.webhookRepository.findById(webhookId);
    if (!webhook) {
      throw new WebhookNotFoundException(webhookId);
    }

    if (!webhook.events.includes(event)) {
      throw new Error(`Webhook does not subscribe to event: ${event}`);
    }

    const delivery = await this.webhookDeliveryRepository.create(
      WebhookDeliveryMapper.toCreateInput({
        webhookId,
        event,
        payload,
        success: false,
        attemptCount: 1,
      }),
    );

    this.logger.log(`Webhook delivery created: ${delivery.id} for event ${event}`);
    return WebhookDeliveryMapper.toEntity(delivery);
  }

  async getDeliveries(webhookId: string, options?: any): Promise<any> {
    return this.webhookDeliveryRepository.findByWebhookId(webhookId, options);
  }

  async getPendingRetries(options?: any): Promise<any> {
    return this.webhookDeliveryRepository.findPendingRetries(options);
  }
}
