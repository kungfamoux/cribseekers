export interface PushProviderResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  metadata?: any;
}

export interface PushProvider {
  send(endpoint: string, payload: any, keys: any): Promise<PushProviderResponse>;
  sendBulk(subscriptions: Array<{ endpoint: string; payload: any; keys: any }>): Promise<PushProviderResponse[]>;
}
