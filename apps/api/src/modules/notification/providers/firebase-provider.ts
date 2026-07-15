import { Injectable } from '@nestjs/common';
import { PushProvider, PushProviderResponse } from './push-provider.interface';

@Injectable()
export class FirebaseProvider implements PushProvider {
  async send(endpoint: string, _payload: any, _keys: any): Promise<PushProviderResponse> {
    return {
      success: true,
      messageId: `firebase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        provider: 'Firebase',
        endpoint,
        timestamp: new Date().toISOString(),
      },
    };
  }

  async sendBulk(subscriptions: Array<{ endpoint: string; payload: any; keys: any }>): Promise<PushProviderResponse[]> {
    return subscriptions.map((subscription) => ({
      success: true,
      messageId: `firebase_bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        provider: 'Firebase',
        endpoint: subscription.endpoint,
        timestamp: new Date().toISOString(),
      },
    }));
  }
}
