export class NotificationPreference {
  id: string;
  userId: string;
  preferences: any;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}
