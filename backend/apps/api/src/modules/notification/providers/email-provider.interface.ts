export interface EmailProviderResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  metadata?: any;
}

export interface EmailProvider {
  send(to: string, subject: string, body: string, htmlBody?: string): Promise<EmailProviderResponse>;
  sendBulk(recipients: Array<{ to: string; subject: string; body: string; htmlBody?: string }>): Promise<EmailProviderResponse[]>;
}
