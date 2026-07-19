import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ConversationType } from '@prisma/client';
import { ConversationFilter } from '../types/conversation-filter.type';

export class ConversationFilterDto implements ConversationFilter {
  @ApiPropertyOptional({ enum: ConversationType })
  @IsOptional()
  @IsEnum(ConversationType)
  type?: ConversationType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  inspectionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;

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
}
