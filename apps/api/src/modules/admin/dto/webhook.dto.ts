import { IsString, IsBoolean, IsOptional, IsArray, IsUrl, IsEnum } from 'class-validator';
import { WebhookStatus } from '@prisma/client';

export class CreateWebhookDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsArray()
  @IsString({ each: true })
  events: string[];

  @IsString()
  secret: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateWebhookDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  events?: string[];

  @IsString()
  @IsOptional()
  secret?: string;

  @IsEnum(WebhookStatus)
  @IsOptional()
  status?: WebhookStatus;
}

export class WebhookResponseDto {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  status: WebhookStatus;
  retryConfig: any;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

export class WebhookDeliveryResponseDto {
  id: string;
  webhookId: string;
  event: string;
  payload: any;
  response: any;
  statusCode: number | null;
  success: boolean;
  attemptCount: number;
  deliveredAt: Date | null;
  nextRetryAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
