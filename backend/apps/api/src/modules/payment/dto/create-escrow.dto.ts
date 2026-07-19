import { IsNumber, IsString, IsUUID, IsOptional, Min } from 'class-validator';

export class CreateEscrowDto {
  @IsUUID()
  walletId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsUUID()
  payerId: string;

  @IsUUID()
  payeeId: string;

  @IsUUID()
  @IsOptional()
  propertyId?: string;

  @IsUUID()
  @IsOptional()
  inspectionId?: string;

  @IsUUID()
  @IsOptional()
  paymentId?: string;

  @IsString()
  @IsOptional()
  releaseCondition?: string;
}
