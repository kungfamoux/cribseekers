import { NotificationType, NotificationChannel } from '@prisma/client';

export class NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
  channels: NotificationChannel[];
  isActive: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
