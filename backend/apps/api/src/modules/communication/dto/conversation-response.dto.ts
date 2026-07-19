import { ApiProperty } from '@nestjs/swagger';
import { ConversationType } from '@prisma/client';

export class ConversationParticipantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  lastReadAt?: Date;

  @ApiProperty()
  joinedAt: Date;
}

export class ConversationResponseDto {
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
  archivedBy?: string;

  @ApiProperty()
  archivedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  participants?: ConversationParticipantDto[];

  @ApiProperty()
  unreadCount?: number;

  @ApiProperty()
  lastMessageAt?: Date;
}
