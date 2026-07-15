import { ModerationStatus } from '@prisma/client';

export class VerificationResponseDto {
  id: string;
  propertyId: string;
  status: ModerationStatus;
  reviewedBy?: string;
  reviewedAt?: Date;
  rejectionReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
