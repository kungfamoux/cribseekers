import { MediaStatus } from '@prisma/client';

export class PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  caption?: string;
  order: number;
  isPrimary: boolean;
  status: MediaStatus;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
