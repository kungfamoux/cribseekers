import { WebhookStatus } from '@prisma/client';

export class Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  status: WebhookStatus;
  retryConfig: any;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}
