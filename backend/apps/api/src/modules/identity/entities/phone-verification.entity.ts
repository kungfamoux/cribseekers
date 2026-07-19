import { VerificationStatus } from '@prisma/client';

export class PhoneVerification {
  id: string;
  userId: string;
  phoneNumber: string;
  code: string;
  status: VerificationStatus;
  expiresAt: Date;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
