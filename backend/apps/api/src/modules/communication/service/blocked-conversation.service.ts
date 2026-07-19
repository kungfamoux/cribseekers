import { Injectable, Logger } from '@nestjs/common';
import { BlockedConversationRepository } from '../repository/blocked-conversation.repository';
import { ConversationRepository } from '../repository/conversation.repository';
import { BlockConversationDto } from '../dto/block-conversation.dto';
import { ConversationBlockedException, UnauthorizedConversationAccessException } from '../exceptions/communication.exception';

@Injectable()
export class BlockedConversationService {
  private readonly logger = new Logger(BlockedConversationService.name);

  constructor(
    private readonly blockedConversationRepository: BlockedConversationRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async blockConversation(dto: BlockConversationDto, userId: string): Promise<void> {
    this.logger.log(`Blocking conversation ${dto.conversationId} by user ${userId}`);

    const conversation = await this.conversationRepository.findById(dto.conversationId);
    if (!conversation) {
      throw new UnauthorizedConversationAccessException(dto.conversationId, userId);
    }

    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(dto.conversationId, userId);
    }

    // Check if already blocked
    const existing = await this.blockedConversationRepository.findByConversation(dto.conversationId);
    if (existing) {
      throw new ConversationBlockedException(dto.conversationId);
    }

    // Find the other participant to block
    const otherParticipant = conversation.participants?.find(p => p.userId !== userId);
    if (!otherParticipant) {
      throw new UnauthorizedConversationAccessException(dto.conversationId, userId);
    }

    await this.blockedConversationRepository.create({
      conversationId: dto.conversationId,
      blockedBy: userId,
      blockedUserId: otherParticipant.userId,
      reason: dto.reason,
    });

    this.logger.log(`Conversation ${dto.conversationId} blocked`);
  }

  async unblockConversation(conversationId: string, userId: string): Promise<void> {
    this.logger.log(`Unblocking conversation ${conversationId} by user ${userId}`);

    const blocked = await this.blockedConversationRepository.findByConversation(conversationId);
    if (!blocked) {
      throw new UnauthorizedConversationAccessException(conversationId, userId);
    }

    // Only the blocker can unblock
    if (blocked.blockedBy !== userId) {
      throw new UnauthorizedConversationAccessException(conversationId, userId);
    }

    await this.blockedConversationRepository.delete(blocked.id);
    this.logger.log(`Conversation ${conversationId} unblocked`);
  }

  async isBlocked(conversationId: string, userId: string): Promise<boolean> {
    return this.blockedConversationRepository.isBlocked(conversationId, userId);
  }
}
