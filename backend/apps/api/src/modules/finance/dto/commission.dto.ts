import { IsEnum, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CommissionType {
  INSPECTION_COMMISSION = 'INSPECTION_COMMISSION',
  REFERRAL_COMMISSION = 'REFERRAL_COMMISSION',
  PARTNER_COMMISSION = 'PARTNER_COMMISSION',
}

export enum CommissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export class CreateCommissionDto {
  @ApiProperty()
  @IsUUID()
  transactionId: string;

  @ApiProperty()
  @IsUUID()
  agentId: string;

  @ApiProperty({ enum: CommissionType })
  @IsEnum(CommissionType)
  commissionType: CommissionType;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  percentage: number;
}

export class UpdateCommissionDto {
  @ApiPropertyOptional({ enum: CommissionStatus })
  @IsEnum(CommissionStatus)
  @IsOptional()
  status?: CommissionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}
