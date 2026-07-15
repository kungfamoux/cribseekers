import { NotificationStatus } from '@prisma/client';

export class SMSNotification {
  id: string;
  notificationId: string;
  to: string;
  message: string;
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
