import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageStatus } from '@prisma/client';
import { MessageFilter } from '../types/message-filter.type';

export class MessageFilterDto implements MessageFilter {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  conversationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @ApiPropertyOptional({ enum: MessageStatus })
  @IsOptional()
  @IsEnum(MessageStatus)
  status?: MessageStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  dateFrom?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  dateTo?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasAttachments?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  replyToId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  pinned?: boolean;
}
