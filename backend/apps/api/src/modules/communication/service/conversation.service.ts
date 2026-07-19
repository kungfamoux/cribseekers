import { Injectable, Logger } from '@nestjs/common';
import { ConversationRepository } from '../repository/conversation.repository';
import { BlockedConversationRepository } from '../repository/blocked-conversation.repository';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';
import { ConversationResponseDto } from '../dto/conversation-response.dto';
import { ConversationSummaryDto } from '../dto/conversation-summary.dto';
import { ConversationMapper } from '../mappers/conversation.mapper';
import { ConversationFilterDto } from '../dto/conversation-filter.dto';
import {
  ConversationNotFoundException,
  ConversationBlockedException,
  DuplicateConversationException,
  UnauthorizedConversationAccessException,
} from '../exceptions/communication.exception';
import { PaginationOptions, SortOptions } from '../../../common/types/pagination.type';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly blockedConversationRepository: BlockedConversationRepository,
  ) {}

  async create(dto: CreateConversationDto, _userId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Creating conversation with type: ${dto.type}`);

    // Nigerian marketplace rule: Check for duplicate one-to-one conversations
    if (dto.participantIds.length === 2) {
      const existingConversations = await this.conversationRepository.findByParticipants(
        dto.participantIds,
      );
      if (existingConversations.data.length > 0) {
        throw new DuplicateConversationException(dto.participantIds);
      }
    }

    const createInput = ConversationMapper.toCreateInput(dto);
    const conversation = await this.conversationRepository.create(createInput);
    this.logger.log(`Conversation created with ID: ${conversation.id}`);

    return ConversationMapper.toResponseDto(conversation);
  }

  async findById(id: string, userId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Finding conversation with ID: ${id}`);

    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new ConversationNotFoundException(id);
    }

    // Check if user is a participant
    const isParticipant = conversation.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(id, userId);
    }

    // Check if conversation is blocked
    const isBlocked = await this.blockedConversationRepository.isBlocked(id, userId);
    if (isBlocked) {
      throw new ConversationBlockedException(id);
    }

    return ConversationMapper.toResponseDto(conversation);
  }

  async findSummaryById(id: string, userId: string): Promise<ConversationSummaryDto> {
    this.logger.log(`Finding conversation summary with ID: ${id}`);

    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new ConversationNotFoundException(id);
    }

    const isParticipant = conversation.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(id, userId);
    }

    return ConversationMapper.toSummaryDto(conversation);
  }

  async findAll(
    userId: string,
    filter?: ConversationFilterDto,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<{ data: ConversationSummaryDto[]; meta: any }> {
    this.logger.log('Finding all conversations for user');

    const filters: any = { userId };
    if (filter) {
      Object.assign(filters, filter);
    }

    const options = { ...pagination, ...sort };
    const result = await this.conversationRepository.findMany(filters, options);

    return {
      data: result.data.map(c => ConversationMapper.toSummaryDto(c)),
      meta: result.meta,
    };
  }

  async update(id: string, dto: UpdateConversationDto, userId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Updating conversation with ID: ${id}`);

    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new ConversationNotFoundException(id);
    }

    const isParticipant = conversation.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(id, userId);
    }

    const updateInput = ConversationMapper.toUpdateInput(dto);
    const updated = await this.conversationRepository.update(id, updateInput);
    this.logger.log(`Conversation updated with ID: ${id}`);

    return ConversationMapper.toResponseDto(updated);
  }

  async archive(id: string, userId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Archiving conversation with ID: ${id}`);

    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new ConversationNotFoundException(id);
    }

    const isParticipant = conversation.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(id, userId);
    }

    const archived = await this.conversationRepository.archive(id, userId);
    this.logger.log(`Conversation archived with ID: ${id}`);

    return ConversationMapper.toResponseDto(archived);
  }

  async unarchive(id: string, userId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Unarchiving conversation with ID: ${id}`);

    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new ConversationNotFoundException(id);
    }

    const isParticipant = conversation.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(id, userId);
    }

    const unarchived = await this.conversationRepository.unarchive(id);
    this.logger.log(`Conversation unarchived with ID: ${id}`);

    return ConversationMapper.toResponseDto(unarchived);
  }

  async delete(id: string, userId: string): Promise<void> {
    this.logger.log(`Deleting conversation with ID: ${id}`);

    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new ConversationNotFoundException(id);
    }

    const isParticipant = conversation.participants?.some(p => p.userId === userId);
    if (!isParticipant) {
      throw new UnauthorizedConversationAccessException(id, userId);
    }

    await this.conversationRepository.softDelete(id);
    this.logger.log(`Conversation deleted with ID: ${id}`);
  }

  async search(query: string, userId: string, pagination?: PaginationOptions): Promise<{ data: ConversationSummaryDto[]; meta: any }> {
    this.logger.log(`Searching conversations with query: ${query}`);

    const result = await this.conversationRepository.search(query, pagination);

    // Filter to only show conversations where user is a participant
    const userConversations = result.data.filter(c =>
      c.participants?.some(p => p.userId === userId),
    );

    return {
      data: userConversations.map(c => ConversationMapper.toSummaryDto(c)),
      meta: result.meta,
    };
  }
}
