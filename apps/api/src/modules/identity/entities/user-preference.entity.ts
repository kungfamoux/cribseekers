export class UserPreference {
  id: string;
  userId: string;
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  notificationPreferences: Record<string, any>;
  privacyPreferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
