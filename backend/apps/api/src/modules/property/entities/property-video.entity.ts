import { MediaStatus } from '@prisma/client';

export class PropertyVideo {
  id: string;
  propertyId: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  duration?: number;
  status: MediaStatus;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
