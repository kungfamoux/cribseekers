import { IsUUID, IsEnum, IsOptional, IsInt, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationChannel, NotificationStatus } from '@prisma/client';

export class CreateNotificationQueueDto {
  @ApiProperty()
  @IsUUID()
  notificationId: string;

  @ApiProperty({ enum: NotificationChannel })
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @ApiPropertyOptional({ default: 3 })
  @IsOptional()
  @IsInt()
  maxAttempts?: number = 3;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class NotificationQueueResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  notificationId: string;

  @ApiProperty({ enum: NotificationChannel })
  channel: NotificationChannel;

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;

  @ApiProperty()
  attempts: number;

  @ApiProperty()
  maxAttempts: number;

  @ApiProperty()
  scheduledAt: Date;

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
