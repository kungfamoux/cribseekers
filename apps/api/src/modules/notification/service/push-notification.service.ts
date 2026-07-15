import { Injectable, Logger } from '@nestjs/common';
import { IPushSubscriptionRepository } from '../interfaces/push-subscription.repository.interface';
import { PushSubscriptionMapper } from '../mappers/push-subscription.mapper';
import { PushProvider } from '../providers/push-provider.interface';
import { FirebaseProvider } from '../providers/firebase-provider';
import { PushDeliveryException, DuplicatePushSubscriptionException } from '../exceptions/notification.exception';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);
  private readonly pushProvider: PushProvider;

  constructor(
    private readonly pushSubscriptionRepository: IPushSubscriptionRepository,
  ) {
    this.pushProvider = new FirebaseProvider();
  }

  async findById(id: string): Promise<any> {
    const subscription = await this.pushSubscriptionRepository.findById(id);
    return subscription ? PushSubscriptionMapper.toEntity(subscription) : null;
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.pushSubscriptionRepository.findByUserId(userId, options);
  }

  async findByEndpoint(endpoint: string): Promise<any> {
    const subscription = await this.pushSubscriptionRepository.findByEndpoint(endpoint);
    return subscription ? PushSubscriptionMapper.toEntity(subscription) : null;
  }

  async findActive(options?: any): Promise<any> {
    return this.pushSubscriptionRepository.findActive(options);
  }

  async create(data: any): Promise<any> {
    const existing = await this.pushSubscriptionRepository.findByEndpoint(data.endpoint);
    if (existing) {
      throw new DuplicatePushSubscriptionException(data.endpoint);
    }

    const subscription = await this.pushSubscriptionRepository.create(
      PushSubscriptionMapper.toCreateInput(data),
    );
    this.logger.log(`Push subscription created: ${subscription.id}`);
    return PushSubscriptionMapper.toEntity(subscription);
  }

  async update(id: string, data: any): Promise<any> {
    const subscription = await this.pushSubscriptionRepository.update(
      id,
      PushSubscriptionMapper.toUpdateInput(data),
    );
    this.logger.log(`Push subscription updated: ${id}`);
    return PushSubscriptionMapper.toEntity(subscription);
  }

  async delete(id: string): Promise<any> {
    const subscription = await this.pushSubscriptionRepository.delete(id);
    this.logger.log(`Push subscription deleted: ${id}`);
    return PushSubscriptionMapper.toEntity(subscription);
  }

  async sendToUser(userId: string, payload: any): Promise<any> {
    const subscriptions = await this.pushSubscriptionRepository.findByUserId(userId, { limit: 100 });
    const results = [];

    for (const subscription of subscriptions.data) {
      if (!subscription.isActive) continue;

      try {
        const response = await this.pushProvider.send(subscription.endpoint, payload, subscription.keys);
        results.push({ subscriptionId: subscription.id, success: response.success, messageId: response.messageId });
        this.logger.log(`Push notification sent to subscription: ${subscription.id}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({ subscriptionId: subscription.id, success: false, error: errorMessage });
        this.logger.error(`Push notification failed for subscription: ${subscription.id} - ${errorMessage}`);
      }
    }

    return results;
  }

  async sendToEndpoint(endpoint: string, payload: any, keys: any): Promise<any> {
    try {
      const response = await this.pushProvider.send(endpoint, payload, keys);
      this.logger.log(`Push notification sent to endpoint: ${endpoint}`);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new PushDeliveryException(errorMessage);
    }
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.pushSubscriptionRepository.findAll(filters, options);
  }
}
