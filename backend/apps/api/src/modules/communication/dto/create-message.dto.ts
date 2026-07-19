import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsArray, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: 'Conversation ID' })
  @IsUUID()
  conversationId: string;

  @ApiProperty({ description: 'Message content', maxLength: 10000 })
  @IsString()
  @MaxLength(10000)
  content: string;

  @ApiPropertyOptional({ description: 'Reply to message ID' })
  @IsOptional()
  @IsUUID()
  replyToId?: string;

  @ApiPropertyOptional({ description: 'Attachment file IDs', type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  attachmentIds?: string[];
}
