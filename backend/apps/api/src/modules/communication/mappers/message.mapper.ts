import { Message } from '../entities/message.entity';
import { MessageResponseDto } from '../dto/message-response.dto';
import { MessageSummaryDto } from '../dto/message-summary.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';

export class MessageMapper {
  static toResponseDto(entity: Message): MessageResponseDto {
    const dto = new MessageResponseDto();
    dto.id = entity.id;
    dto.conversationId = entity.conversationId;
    dto.senderId = entity.senderId;
    dto.content = entity.content;
    dto.status = entity.status;
    dto.replyToId = entity.replyToId || undefined;
    dto.editedAt = entity.editedAt || undefined;
    dto.deletedAt = entity.deletedAt || undefined;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.attachments = entity.attachments?.map(a => ({
      id: a.id,
      type: a.type,
      url: a.url,
      fileName: a.fileName || undefined,
      fileSize: a.fileSize || undefined,
      mimeType: a.mimeType || undefined,
      thumbnailUrl: a.thumbnailUrl || undefined,
      createdAt: a.createdAt,
    })) || undefined;
    dto.reactions = entity.reactions?.map(r => ({
      id: r.id,
      messageId: r.messageId,
      userId: r.userId,
      reaction: r.reaction,
      createdAt: r.createdAt,
    })) || undefined;
    dto.isPinned = false;
    dto.readCount = 0;
    return dto;
  }

  static toSummaryDto(entity: Message): MessageSummaryDto {
    const dto = new MessageSummaryDto();
    dto.id = entity.id;
    dto.conversationId = entity.conversationId;
    dto.senderId = entity.senderId;
    dto.content = entity.content;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt;
    dto.attachmentCount = entity.attachments?.length || 0;
    dto.reactionCount = entity.reactions?.length || 0;
    dto.isEdited = !!entity.editedAt;
    dto.isDeleted = !!entity.deletedAt;
    dto.isPinned = false;
    return dto;
  }

  static toCreateInput(dto: CreateMessageDto, senderId: string): any {
    return {
      conversationId: dto.conversationId,
      senderId,
      content: dto.content,
      replyToId: dto.replyToId,
      status: 'SENT',
    };
  }

  static toUpdateInput(dto: UpdateMessageDto): any {
    const input: any = {};
    if (dto.content !== undefined) {
      input.content = dto.content;
      input.editedAt = new Date();
    }
    return input;
  }
}
