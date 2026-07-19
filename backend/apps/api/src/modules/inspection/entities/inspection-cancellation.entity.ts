export class InspectionCancellation {
  id: string;
  inspectionId: string;
  cancelledBy: string;
  reason: string;
  cancelledAt: Date;
  refundStatus?: string;
  refundAmount?: number;
}
