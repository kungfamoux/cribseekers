import { Conversation } from '../entities/conversation.entity';
import { ConversationResponseDto } from '../dto/conversation-response.dto';
import { ConversationSummaryDto } from '../dto/conversation-summary.dto';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';

export class ConversationMapper {
  static toResponseDto(entity: Conversation): ConversationResponseDto {
    const dto = new ConversationResponseDto();
    dto.id = entity.id;
    dto.type = entity.type;
    dto.propertyId = entity.propertyId || undefined;
    dto.inspectionId = entity.inspectionId || undefined;
    dto.subject = entity.subject || undefined;
    dto.status = entity.status;
    dto.archivedBy = entity.archivedBy || undefined;
    dto.archivedAt = entity.archivedAt || undefined;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.participants = entity.participants?.map(p => ({
      id: p.id,
      userId: p.userId,
      role: p.role,
      lastReadAt: p.lastReadAt || undefined,
      joinedAt: p.joinedAt,
    })) || undefined;
    return dto;
  }

  static toSummaryDto(entity: Conversation): ConversationSummaryDto {
    const dto = new ConversationSummaryDto();
    dto.id = entity.id;
    dto.type = entity.type;
    dto.propertyId = entity.propertyId || undefined;
    dto.inspectionId = entity.inspectionId || undefined;
    dto.subject = entity.subject || undefined;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.participantCount = entity.participants?.length || 0;
    dto.messageCount = 0;
    dto.unreadCount = 0;
    dto.lastMessageAt = entity.updatedAt;
    dto.isArchived = !!entity.archivedAt;
    dto.isBlocked = false;
    return dto;
  }

  static toCreateInput(dto: CreateConversationDto): any {
    return {
      type: dto.type,
      propertyId: dto.propertyId,
      inspectionId: dto.inspectionId,
      subject: dto.subject,
      status: 'ACTIVE',
      participants: {
        create: dto.participantIds.map((userId) => ({
          userId,
          role: 'PARTICIPANT',
        })),
      },
    };
  }

  static toUpdateInput(dto: UpdateConversationDto): any {
    const input: any = {};
    if (dto.type !== undefined) input.type = dto.type;
    if (dto.subject !== undefined) input.subject = dto.subject;
    if (dto.status !== undefined) input.status = dto.status;
    return input;
  }
}
