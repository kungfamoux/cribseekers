import { Injectable, Logger } from '@nestjs/common';
import { TypingRepository } from '../repository/typing.repository';
import { ConversationRepository } from '../repository/conversation.repository';
import { TypingDto } from '../dto/typing.dto';
import { UnauthorizedConversationAccessException } from '../exceptions/communication.exception';

@Injectable()
export class TypingService {
  private readonly logger = new Logger(TypingService.name);

  constructor(
    private readonly typingRepository: TypingRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async startTyping(dto: TypingDto, userId: string): Promise<void> {
    this.logger.log(`User ${userId} started typing in conversation ${dto.conversationId}`);

    // Check if user is a participant
    const conversation = await this.conversationRepository.findById(dto.conversationId);
    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(dto.conversationId, userId);
    }

    await this.typingRepository.startTyping(dto.conversationId, userId);
  }

  async stopTyping(dto: TypingDto, userId: string): Promise<void> {
    this.logger.log(`User ${userId} stopped typing in conversation ${dto.conversationId}`);

    await this.typingRepository.stopTyping(dto.conversationId, userId);
  }

  async getTypingUsers(conversationId: string, userId: string): Promise<string[]> {
    this.logger.log(`Getting typing users for conversation ${conversationId}`);

    // Check if user is a participant
    const conversation = await this.conversationRepository.findById(conversationId);
    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(conversationId, userId);
    }

    const result = await this.typingRepository.findByConversation(conversationId);
    return result.data
      .filter(t => t.isTyping)
      .map(t => t.userId);
  }

  async expireOldIndicators(): Promise<void> {
    this.logger.log('Expiring old typing indicators');
    await this.typingRepository.expireOldIndicators();
  }
}
