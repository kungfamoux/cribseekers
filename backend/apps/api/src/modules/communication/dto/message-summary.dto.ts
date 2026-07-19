import { ApiProperty } from '@nestjs/swagger';
import { MessageStatus } from '@prisma/client';

export class MessageSummaryDto {
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
  createdAt: Date;

  @ApiProperty()
  attachmentCount?: number;

  @ApiProperty()
  reactionCount?: number;

  @ApiProperty()
  isEdited?: boolean;

  @ApiProperty()
  isDeleted?: boolean;

  @ApiProperty()
  isPinned?: boolean;
}
