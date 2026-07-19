import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsBoolean } from 'class-validator';

export class TypingDto {
  @ApiProperty({ description: 'Conversation ID' })
  @IsUUID()
  conversationId: string;

  @ApiProperty({ description: 'Is typing indicator' })
  @IsBoolean()
  isTyping: boolean;
}
