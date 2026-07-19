import { WebhookDelivery } from '../entities/webhook-delivery.entity';

export class WebhookDeliveryMapper {
  static toEntity(data: any): WebhookDelivery {
    return {
      id: data.id,
      webhookId: data.webhookId,
      event: data.event,
      payload: data.payload,
      response: data.response,
      statusCode: data.statusCode,
      success: data.success,
      attemptCount: data.attemptCount,
      deliveredAt: data.deliveredAt,
      nextRetryAt: data.nextRetryAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      webhookId: data.webhookId,
      event: data.event,
      payload: data.payload,
      response: data.response,
      statusCode: data.statusCode,
      success: data.success,
      attemptCount: data.attemptCount,
      deliveredAt: data.deliveredAt,
      nextRetryAt: data.nextRetryAt,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      response: data.response,
      statusCode: data.statusCode,
      success: data.success,
      attemptCount: data.attemptCount,
      deliveredAt: data.deliveredAt,
      nextRetryAt: data.nextRetryAt,
    };
  }
}
