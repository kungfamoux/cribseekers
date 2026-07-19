import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsUUID, IsArray } from 'class-validator';
import { ConversationType } from '@prisma/client';

export class CreateConversationDto {
  @ApiProperty({ enum: ConversationType, description: 'Type of conversation' })
  @IsEnum(ConversationType)
  type: ConversationType;

  @ApiPropertyOptional({ description: 'Associated property ID' })
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional({ description: 'Associated inspection ID' })
  @IsOptional()
  @IsUUID()
  inspectionId?: string;

  @ApiPropertyOptional({ description: 'Conversation subject' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ description: 'Participant user IDs', type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  participantIds: string[];
}
