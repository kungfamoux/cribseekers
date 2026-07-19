export class InspectionHistoryDto {
  id: string;
  inspectionId: string;
  action: string;
  previousState: string | null;
  newState: string;
  performedBy: string;
  performedAt: Date;
  notes: string | null;
}
