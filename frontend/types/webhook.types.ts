export interface PaystackWebhookPayload {
  event: string;
  data: {
    id: string;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    paid_at?: string;
    customer: {
      email: string;
      name?: string;
    };
    metadata?: Record<string, unknown>;
  };
}

export interface FlutterwaveWebhookPayload {
  event: string;
  data: {
    id: number;
    tx_ref: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
    customer: {
      email: string;
      name?: string;
    };
    metadata?: Record<string, unknown>;
  };
}

export interface WebhookResponse {
  status: string;
}
