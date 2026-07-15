import { NotificationType, NotificationChannel, NotificationStatus, PriorityLevel } from '@prisma/client';

export class Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  channels: NotificationChannel[];
  status: NotificationStatus;
  priority: PriorityLevel;
  readAt?: Date;
  expiresAt?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
