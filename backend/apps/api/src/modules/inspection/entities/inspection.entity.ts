import { InspectionType, InspectionStatus, InspectionResultStatus } from '@prisma/client';

export class Inspection {
  id: string;
  propertyId: string;
  type: InspectionType;
  status: InspectionStatus;
  scheduledAt: Date;
  durationMinutes: number | null;
  notes: string | null;
  result: InspectionResultStatus | null;
  resultNotes: string | null;
  cancelReason: string | null;
  rescheduledFrom: string | null;
  requestedBy: string;
  confirmedBy: string | null;
  completedBy: string | null;
  confirmedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
