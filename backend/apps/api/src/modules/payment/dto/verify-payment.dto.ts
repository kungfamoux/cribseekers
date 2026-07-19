import { IsString, IsUUID, IsOptional } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  gatewayReference: string;

  @IsUUID()
  @IsOptional()
  paymentId?: string;
}
