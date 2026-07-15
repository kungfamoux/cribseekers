import { NotificationChannel, NotificationStatus } from '@prisma/client';

export class NotificationQueue {
  id: string;
  notificationId: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  attempts: number;
  maxAttempts: number;
  scheduledAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  error?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
