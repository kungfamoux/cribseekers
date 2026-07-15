export class ReportEvidence {
  id: string;
  reportId: string;
  type: string;
  url: string;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  description: string | null;
  uploadedAt: Date;
}
