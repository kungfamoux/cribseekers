export interface SMSProviderResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  metadata?: any;
}

export interface SMSProvider {
  send(to: string, message: string): Promise<SMSProviderResponse>;
  sendBulk(recipients: Array<{ to: string; message: string }>): Promise<SMSProviderResponse[]>;
}
