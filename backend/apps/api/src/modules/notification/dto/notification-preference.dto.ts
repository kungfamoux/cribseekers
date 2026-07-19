import { IsUUID, IsString, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationPreferenceDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsObject()
  preferences: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quietHoursStart?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quietHoursEnd?: string;

  @ApiPropertyOptional({ default: 'Africa/Lagos' })
  @IsOptional()
  @IsString()
  timezone?: string = 'Africa/Lagos';
}

export class UpdateNotificationPreferenceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  preferences?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quietHoursStart?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quietHoursEnd?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timezone?: string;
}

export class NotificationPreferenceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  preferences: any;

  @ApiPropertyOptional()
  quietHoursStart?: string;

  @ApiPropertyOptional()
  quietHoursEnd?: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
