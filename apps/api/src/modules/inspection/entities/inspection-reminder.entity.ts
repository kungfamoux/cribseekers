import { ReminderStatus } from '@prisma/client';

export class InspectionReminder {
  id: string;
  inspectionId: string;
  userId: string;
  remindAt: Date;
  status: ReminderStatus;
  sentAt: Date | null;
  method: string;
  createdAt: Date;
  updatedAt: Date;
}
