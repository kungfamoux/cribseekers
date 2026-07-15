import { InspectionResultStatus } from '@prisma/client';

export class InspectionResult {
  id: string;
  inspectionId: string;
  status: InspectionResultStatus;
  notes?: string;
  photos: string[];
  completedBy: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
