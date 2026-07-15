export class InspectionParticipant {
  id: string;
  inspectionId: string;
  userId: string;
  role: string;
  status: string;
  joinedAt: Date | null;
  leftAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
