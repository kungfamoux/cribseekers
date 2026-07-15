export class QRCodeResponseDto {
  id: string;
  inspectionId: string;
  code: string;
  expiresAt: Date;
  usedAt?: Date;
  createdAt: Date;
}
