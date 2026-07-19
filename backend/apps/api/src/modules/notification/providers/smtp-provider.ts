import { Injectable } from '@nestjs/common';
import { EmailProvider, EmailProviderResponse } from './email-provider.interface';

@Injectable()
export class SMTPProvider implements EmailProvider {
  async send(to: string, subject: string, _body: string, _htmlBody?: string): Promise<EmailProviderResponse> {
    return {
      success: true,
      messageId: `smtp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        provider: 'SMTP',
        to,
        subject,
        timestamp: new Date().toISOString(),
      },
    };
  }

  async sendBulk(recipients: Array<{ to: string; subject: string; body: string; htmlBody?: string }>): Promise<EmailProviderResponse[]> {
    return recipients.map((recipient) => ({
      success: true,
      messageId: `smtp_bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        provider: 'SMTP',
        to: recipient.to,
        subject: recipient.subject,
        timestamp: new Date().toISOString(),
      },
    }));
  }
}
