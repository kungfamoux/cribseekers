import { InspectionType, InspectionStatus } from '@prisma/client';

export class InspectionSummaryDto {
  id: string;
  propertyId: string;
  type: InspectionType;
  status: InspectionStatus;
  scheduledAt: Date;
  requestedBy: string;
  createdAt: Date;
}
