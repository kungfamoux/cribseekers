import { MediaStatus } from '@prisma/client';

export class PropertyDocument {
  id: string;
  propertyId: string;
  url: string;
  fileName: string;
  fileType: string;
  title?: string;
  description?: string;
  category?: string;
  status: MediaStatus;
  fileSize?: number;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
