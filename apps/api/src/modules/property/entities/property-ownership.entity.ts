export class PropertyOwnership {
  id: string;
  propertyId: string;
  userId: string;
  type: string;
  percentage?: number;
  verified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
