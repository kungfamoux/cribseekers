import { AttachmentType } from '@prisma/client';

export class MessageAttachment {
  id: string;
  messageId: string;
  type: AttachmentType;
  url: string;
  fileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  thumbnailUrl?: string | null;
  metadata?: unknown;
  createdAt: Date;
}
