export class BlockedConversation {
  id: string;
  conversationId: string;
  blockedBy: string;
  blockedUserId: string;
  reason?: string | null;
  blockedAt: Date;
}
