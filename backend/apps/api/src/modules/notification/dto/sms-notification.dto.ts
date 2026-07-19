import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationStatus } from '@prisma/client';

export class CreateSMSNotificationDto {
  @ApiProperty()
  @IsUUID()
  notificationId: string;

  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class SMSNotificationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  notificationId: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  message: string;

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
