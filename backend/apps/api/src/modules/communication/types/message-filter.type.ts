import { MessageStatus } from '@prisma/client';

export interface MessageFilter {
  conversationId?: string;
  senderId?: string;
  status?: MessageStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  hasAttachments?: boolean;
  replyToId?: string;
  pinned?: boolean;
}
