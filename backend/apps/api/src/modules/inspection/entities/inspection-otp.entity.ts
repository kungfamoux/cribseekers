export class InspectionOTP {
  id: string;
  inspectionId: string;
  code: string;
  expiresAt: Date;
  usedAt?: Date;
  attemptCount: number;
  createdAt: Date;
}
