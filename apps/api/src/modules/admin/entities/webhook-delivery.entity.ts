export class WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  payload: any;
  response: any;
  statusCode: number | null;
  success: boolean;
  attemptCount: number;
  deliveredAt: Date | null;
  nextRetryAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
