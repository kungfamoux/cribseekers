import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationStatus } from '@prisma/client';

export class CreateEmailNotificationDto {
  @ApiProperty()
  @IsUUID()
  notificationId: string;

  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  htmlBody?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class EmailNotificationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  notificationId: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  body: string;

  @ApiPropertyOptional()
  htmlBody?: string;

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;

  @ApiPropertyOptional()
  sentAt?: Date;

  @ApiPropertyOptional()
  deliveredAt?: Date;

  @ApiPropertyOptional()
  failedAt?: Date;

  @ApiPropertyOptional()
  error?: string;

  @ApiPropertyOptional()
  metadata?: any;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
