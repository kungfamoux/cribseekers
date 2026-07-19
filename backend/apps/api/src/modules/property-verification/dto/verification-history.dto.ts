export class VerificationHistoryDto {
  id: string;
  propertyId: string;
  action: string;
  changes: any;
  performedBy?: string;
  performedAt: Date;
  createdAt: Date;
}
