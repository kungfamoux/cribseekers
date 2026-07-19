import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString } from 'class-validator';

export class BlockConversationDto {
  @ApiProperty({ description: 'Conversation ID' })
  @IsUUID()
  conversationId: string;

  @ApiPropertyOptional({ description: 'Reason for blocking' })
  @IsOptional()
  @IsString()
  reason?: string;
}
