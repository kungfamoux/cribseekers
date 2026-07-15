import { VerificationStatus } from '@prisma/client';

export class EmailVerification {
  id: string;
  userId: string;
  email: string;
  token: string;
  status: VerificationStatus;
  expiresAt: Date;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
