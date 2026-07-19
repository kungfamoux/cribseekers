import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReadReceiptDto {
  @ApiProperty({ description: 'Message ID to mark as read' })
  @IsUUID()
  messageId: string;

  @ApiProperty({ description: 'Mark all messages in conversation as read' })
  @IsUUID()
  conversationId: string;
}

export class MarkConversationReadDto {
  @ApiProperty({ description: 'Conversation ID' })
  @IsUUID()
  conversationId: string;
}
