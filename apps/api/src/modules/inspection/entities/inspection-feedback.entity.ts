export class InspectionFeedback {
  id: string;
  inspectionId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
