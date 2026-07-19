import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from '../repository/message.repository';
import { MessageReactionRepository } from '../repository/message-reaction.repository';
import { ReadReceiptRepository } from '../repository/read-receipt.repository';
import { ConversationRepository } from '../repository/conversation.repository';
import { BlockedConversationRepository } from '../repository/blocked-conversation.repository';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageResponseDto } from '../dto/message-response.dto';
import { MessageSummaryDto } from '../dto/message-summary.dto';
import { MessageMapper } from '../mappers/message.mapper';
import { MessageFilterDto } from '../dto/message-filter.dto';
import { ReactionDto } from '../dto/reaction.dto';
import { COMMUNICATION_CONSTANTS } from '../constants/communication.constants';
import {
  MessageNotFoundException,
  ConversationBlockedException,
  MessageAlreadyDeletedException,
  DuplicateReactionException,
  UnauthorizedConversationAccessException,
} from '../exceptions/communication.exception';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly messageReactionRepository: MessageReactionRepository,
    private readonly readReceiptRepository: ReadReceiptRepository,
    private readonly conversationRepository: ConversationRepository,
    private readonly blockedConversationRepository: BlockedConversationRepository,
  ) {}

  async create(dto: CreateMessageDto, senderId: string): Promise<MessageResponseDto> {
    this.logger.log(`Creating message in conversation: ${dto.conversationId}`);

    // Check if conversation exists and user is a participant
    const conversation = await this.conversationRepository.findById(dto.conversationId);
    if (!conversation) {
      throw new UnauthorizedConversationAccessException(dto.conversationId, senderId);
    }

    const isParticipant = conversation.participants?.some(p => p.userId === senderId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(dto.conversationId, senderId);
    }

    // Check if conversation is blocked
    const isBlocked = await this.blockedConversationRepository.isBlocked(dto.conversationId, senderId);
    if (isBlocked) {
      throw new ConversationBlockedException(dto.conversationId);
    }

    // Nigerian marketplace rule: Validate message length
    if (dto.content && dto.content.length > COMMUNICATION_CONSTANTS.MAX_MESSAGE_LENGTH) {
      throw new Error(`Message content exceeds maximum length of ${COMMUNICATION_CONSTANTS.MAX_MESSAGE_LENGTH}`);
    }

    const createInput = MessageMapper.toCreateInput(dto, senderId);
    const message = await this.messageRepository.create(createInput);
    this.logger.log(`Message created with ID: ${message.id}`);

    return MessageMapper.toResponseDto(message);
  }

  async findById(id: string, userId: string): Promise<MessageResponseDto> {
    this.logger.log(`Finding message with ID: ${id}`);

    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new MessageNotFoundException(id);
    }

    // Check if user is a participant in the conversation
    const conversation = await this.conversationRepository.findById(message.conversationId);
    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(message.conversationId, userId);
    }

    return MessageMapper.toResponseDto(message);
  }

  async findSummaryById(id: string, userId: string): Promise<MessageSummaryDto> {
    this.logger.log(`Finding message summary with ID: ${id}`);

    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new MessageNotFoundException(id);
    }

    const conversation = await this.conversationRepository.findById(message.conversationId);
    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(message.conversationId, userId);
    }

    return MessageMapper.toSummaryDto(message);
  }

  async findAll(
    userId: string,
    filter?: MessageFilterDto,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<{ data: MessageSummaryDto[]; meta: any }> {
    this.logger.log('Finding all messages');

    // If conversationId is specified, check access
    if (filter?.conversationId) {
      const conversation = await this.conversationRepository.findById(filter.conversationId);
      const isParticipant = conversation?.participants?.some(p => p.userId === userId);
      if (!isParticipant) {
        throw new UnauthorizedConversationAccessException(filter.conversationId, userId);
      }
    }

    const options = { ...pagination, ...sort };
    const result = await this.messageRepository.findMany(filter, options);

    return {
      data: result.data.map(m => MessageMapper.toSummaryDto(m)),
      meta: result.meta,
    };
  }

  async update(id: string, dto: UpdateMessageDto, userId: string): Promise<MessageResponseDto> {
    this.logger.log(`Updating message with ID: ${id}`);

    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new MessageNotFoundException(id);
    }

    if (message.deletedAt) {
      throw new MessageAlreadyDeletedException(id);
    }

    // Only sender can edit their own messages
    if (message.senderId !== userId) {
      throw new UnauthorizedConversationAccessException(message.conversationId, userId);
    }

    const updateInput = MessageMapper.toUpdateInput(dto);
    const updated = await this.messageRepository.update(id, updateInput);
    this.logger.log(`Message updated with ID: ${id}`);

    return MessageMapper.toResponseDto(updated);
  }

  async delete(id: string, userId: string): Promise<void> {
    this.logger.log(`Deleting message with ID: ${id}`);

    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new MessageNotFoundException(id);
    }

    if (message.deletedAt) {
      throw new MessageAlreadyDeletedException(id);
    }

    // Only sender can delete their own messages
    if (message.senderId !== userId) {
      throw new UnauthorizedConversationAccessException(message.conversationId, userId);
    }

    await this.messageRepository.softDelete(id);
    this.logger.log(`Message deleted with ID: ${id}`);
  }

  async addReaction(dto: ReactionDto, userId: string): Promise<MessageResponseDto> {
    this.logger.log(`Adding reaction to message: ${dto.messageId}`);

    const message = await this.messageRepository.findById(dto.messageId);
    if (!message) {
      throw new MessageNotFoundException(dto.messageId);
    }

    // Check if user is a participant
    const conversation = await this.conversationRepository.findById(message.conversationId);
    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(message.conversationId, userId);
    }

    // Check for duplicate reaction
    const existing = await this.messageReactionRepository.findByMessageAndUser(dto.messageId, userId);
    if (existing && existing.reaction === dto.reaction) {
      throw new DuplicateReactionException(dto.messageId, userId);
    }

    // Remove existing reaction if different
    if (existing && existing.reaction !== dto.reaction) {
      await this.messageReactionRepository.delete(existing.id);
    }

    await this.messageReactionRepository.create({
      messageId: dto.messageId,
      userId,
      reaction: dto.reaction,
    });

    const updated = await this.messageRepository.findById(dto.messageId);
    return MessageMapper.toResponseDto(updated!);
  }

  async removeReaction(messageId: string, userId: string): Promise<MessageResponseDto> {
    this.logger.log(`Removing reaction from message: ${messageId}`);

    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new MessageNotFoundException(messageId);
    }

    const existing = await this.messageReactionRepository.findByMessageAndUser(messageId, userId);
    if (existing) {
      await this.messageReactionRepository.delete(existing.id);
    }

    const updated = await this.messageRepository.findById(messageId);
    return MessageMapper.toResponseDto(updated!);
  }

  async markAsRead(messageId: string, userId: string): Promise<void> {
    this.logger.log(`Marking message as read: ${messageId}`);

    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new MessageNotFoundException(messageId);
    }

    const conversation = await this.conversationRepository.findById(message.conversationId);
    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(message.conversationId, userId);
    }

    await this.readReceiptRepository.markAsRead(messageId, userId);
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    this.logger.log(`Marking conversation as read: ${conversationId}`);

    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new UnauthorizedConversationAccessException(conversationId, userId);
    }

    const isParticipant = conversation?.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(conversationId, userId);
    }

    await this.readReceiptRepository.markConversationAsRead(conversationId, userId);
  }
}
