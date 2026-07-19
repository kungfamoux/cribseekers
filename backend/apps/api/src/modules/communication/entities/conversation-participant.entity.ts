export class ConversationParticipant {
  id: string;
  conversationId: string;
  userId: string;
  role: string;
  lastReadAt?: Date | null;
  joinedAt: Date;
  leftAt?: Date | null;
}
