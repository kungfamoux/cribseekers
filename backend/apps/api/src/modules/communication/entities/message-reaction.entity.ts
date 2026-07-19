import { ReactionType } from '@prisma/client';

export class MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  reaction: ReactionType;
  createdAt: Date;
}
