export class PropertyReport {
  id: string;
  propertyId: string;
  reportedBy: string;
  reason: string;
  description?: string;
  status: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
