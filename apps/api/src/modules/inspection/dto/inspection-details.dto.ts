import { InspectionResultStatus } from '@prisma/client';
import { InspectionSummaryDto } from './inspection-summary.dto';

export class InspectionDetailsDto extends InspectionSummaryDto {
  durationMinutes: number | null;
  notes: string | null;
  result: InspectionResultStatus | null;
  resultNotes: string | null;
  cancelReason: string | null;
  rescheduledFrom: string | null;
  confirmedBy: string | null;
  completedBy: string | null;
  confirmedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  expiresAt: Date | null;
  updatedAt: Date;
}
