import { ApiProperty } from '@nestjs/swagger';
import { MessageStatus } from '@prisma/client';
import { AttachmentType, ReactionType } from '@prisma/client';

export class MessageAttachmentDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: AttachmentType })
  type: AttachmentType;

  @ApiProperty()
  url: string;

  @ApiProperty()
  fileName?: string;

  @ApiProperty()
  fileSize?: number;

  @ApiProperty()
  mimeType?: string;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  createdAt: Date;
}

export class MessageReactionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  messageId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: ReactionType })
  reaction: ReactionType;

  @ApiProperty()
  createdAt: Date;
}

export class MessageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  conversationId: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ enum: MessageStatus })
  status: MessageStatus;

  @ApiProperty()
  replyToId?: string;

  @ApiProperty()
  editedAt?: Date;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  attachments?: MessageAttachmentDto[];

  @ApiProperty()
  reactions?: MessageReactionDto[];

  @ApiProperty()
  isPinned?: boolean;

  @ApiProperty()
  readCount?: number;
}
