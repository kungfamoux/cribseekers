import { MessageStatus } from '@prisma/client';
import { MessageAttachment } from './message-attachment.entity';
import { MessageReaction } from './message-reaction.entity';

export class Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: MessageStatus;
  replyToId?: string | null;
  editedAt?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;

  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
}
