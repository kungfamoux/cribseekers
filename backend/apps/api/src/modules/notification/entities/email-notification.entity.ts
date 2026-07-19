import { NotificationStatus } from '@prisma/client';

export class EmailNotification {
  id: string;
  notificationId: string;
  to: string;
  subject: string;
  body: string;
  htmlBody?: string;
  status: NotificationStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  error?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
