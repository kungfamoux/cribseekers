import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ConversationType } from '@prisma/client';

export class UpdateConversationDto {
  @ApiPropertyOptional({ enum: ConversationType, description: 'Type of conversation' })
  @IsOptional()
  @IsEnum(ConversationType)
  type?: ConversationType;

  @ApiPropertyOptional({ description: 'Conversation subject' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ description: 'Conversation status' })
  @IsOptional()
  @IsString()
  status?: string;
}
