import { ApiProperty } from '@nestjs/swagger';
import { ConversationType } from '@prisma/client';

export class ConversationSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ConversationType })
  type: ConversationType;

  @ApiProperty()
  propertyId?: string;

  @ApiProperty()
  inspectionId?: string;

  @ApiProperty()
  subject?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  participantCount: number;

  @ApiProperty()
  messageCount: number;

  @ApiProperty()
  unreadCount?: number;

  @ApiProperty()
  lastMessageAt?: Date;

  @ApiProperty()
  isArchived?: boolean;

  @ApiProperty()
  isBlocked?: boolean;
}
