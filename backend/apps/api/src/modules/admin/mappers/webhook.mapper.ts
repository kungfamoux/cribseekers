import { Webhook } from '../entities/webhook.entity';

export class WebhookMapper {
  static toEntity(data: any): Webhook {
    return {
      id: data.id,
      name: data.name,
      url: data.url,
      events: data.events,
      secret: data.secret,
      status: data.status,
      retryConfig: data.retryConfig,
      metadata: data.metadata,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toCreateInput(data: any): any {
    return {
      name: data.name,
      url: data.url,
      events: data.events,
      secret: data.secret,
      status: data.status,
      retryConfig: data.retryConfig,
      metadata: data.metadata,
    };
  }

  static toUpdateInput(data: any): any {
    return {
      name: data.name,
      url: data.url,
      events: data.events,
      secret: data.secret,
      status: data.status,
      retryConfig: data.retryConfig,
      metadata: data.metadata,
    };
  }
}
