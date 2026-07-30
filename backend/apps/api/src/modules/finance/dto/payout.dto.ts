import { IsEnum, IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PayoutStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
}

export class CreatePayoutDto {
  @ApiProperty()
  @IsUUID()
  agentId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsUUID()
  bankAccountId: string;
}

export class ApprovePayoutDto {
  @ApiProperty()
  @IsUUID()
  payoutId: string;
}

export class RejectPayoutDto {
  @ApiProperty()
  @IsUUID()
  payoutId: string;

  @ApiProperty()
  @IsString()
  reason: string;
}

export class UpdatePayoutDto {
  @ApiPropertyOptional({ enum: PayoutStatus })
  @IsEnum(PayoutStatus)
  @IsOptional()
  status?: PayoutStatus;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}
