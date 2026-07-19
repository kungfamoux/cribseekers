import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateMessageDto {
  @ApiPropertyOptional({ description: 'Updated message content', maxLength: 10000 })
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  content: string;
}
