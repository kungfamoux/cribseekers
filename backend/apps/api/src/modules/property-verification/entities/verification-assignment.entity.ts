export class VerificationAssignment {
  id: string;
  propertyId: string;
  assignedTo: string;
  assignedBy: string;
  assignedAt: Date;
  completedAt?: Date;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
