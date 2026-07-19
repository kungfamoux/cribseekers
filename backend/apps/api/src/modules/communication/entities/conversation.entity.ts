import { ConversationType } from '@prisma/client';
import { ConversationParticipant } from './conversation-participant.entity';

export class Conversation {
  id: string;
  type: ConversationType;
  propertyId?: string | null;
  inspectionId?: string | null;
  subject?: string | null;
  status: string;
  archivedBy?: string | null;
  archivedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  participants?: ConversationParticipant[];
}
