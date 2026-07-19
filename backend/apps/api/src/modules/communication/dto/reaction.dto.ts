import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { ReactionType } from '@prisma/client';

export class ReactionDto {
  @ApiProperty({ description: 'Message ID' })
  @IsUUID()
  messageId: string;

  @ApiProperty({ enum: ReactionType, description: 'Reaction type' })
  @IsEnum(ReactionType)
  reaction: ReactionType;
}
