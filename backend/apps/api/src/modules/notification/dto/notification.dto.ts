import { IsUUID, IsString, IsArray, IsEnum, IsOptional, IsObject, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType, NotificationChannel, NotificationStatus, PriorityLevel } from '@prisma/client';

export class CreateNotificationDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  data?: any;

  @ApiProperty({ enum: NotificationChannel, isArray: true })
  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  channels: NotificationChannel[];

  @ApiPropertyOptional({ enum: PriorityLevel })
  @IsOptional()
  @IsEnum(PriorityLevel)
  priority?: PriorityLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class NotificationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  data?: any;

  @ApiProperty({ enum: NotificationChannel, isArray: true })
  channels: NotificationChannel[];

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;

  @ApiProperty({ enum: PriorityLevel })
  priority: PriorityLevel;

  @ApiPropertyOptional()
  readAt?: Date;

  @ApiPropertyOptional()
  expiresAt?: Date;

  @ApiPropertyOptional()
  sentAt?: Date;

  @ApiPropertyOptional()
  deliveredAt?: Date;

  @ApiPropertyOptional()
  failedAt?: Date;

  @ApiPropertyOptional()
  failureReason?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class NotificationSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;

  @ApiProperty({ enum: PriorityLevel })
  priority: PriorityLevel;

  @ApiProperty()
  createdAt: Date;
}

export class NotificationDetailsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  data?: any;

  @ApiProperty({ enum: NotificationChannel, isArray: true })
  channels: NotificationChannel[];

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;

  @ApiProperty({ enum: PriorityLevel })
  priority: PriorityLevel;

  @ApiPropertyOptional()
  readAt?: Date;

  @ApiPropertyOptional()
  expiresAt?: Date;

  @ApiPropertyOptional()
  sentAt?: Date;

  @ApiPropertyOptional()
  deliveredAt?: Date;

  @ApiPropertyOptional()
  failedAt?: Date;

  @ApiPropertyOptional()
  failureReason?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class MarkAsReadDto {
  @ApiProperty()
  @IsUUID()
  notificationId: string;
}

export class DismissNotificationDto {
  @ApiProperty()
  @IsUUID()
  notificationId: string;
}
