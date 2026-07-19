export class PropertyOwnership {
  id: string;
  propertyId: string;
  userId: string;
  type: string;
  verified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
  documents: any;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
