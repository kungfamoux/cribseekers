import { Injectable } from '@nestjs/common';
import { SMSProvider, SMSProviderResponse } from './sms-provider.interface';

@Injectable()
export class TermiiProvider implements SMSProvider {
  async send(to: string, _message: string): Promise<SMSProviderResponse> {
    return {
      success: true,
      messageId: `termii_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        provider: 'Termii',
        to,
        timestamp: new Date().toISOString(),
      },
    };
  }

  async sendBulk(recipients: Array<{ to: string; message: string }>): Promise<SMSProviderResponse[]> {
    return recipients.map((recipient) => ({
      success: true,
      messageId: `termii_bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        provider: 'Termii',
        to: recipient.to,
        timestamp: new Date().toISOString(),
      },
    }));
  }
}
