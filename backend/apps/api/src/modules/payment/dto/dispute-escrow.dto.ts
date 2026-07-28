import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class DisputeEscrowDto {
  @ApiProperty({ description: 'Reason for dispute' })
  @IsString()
  reason: string;

  @ApiProperty({ description: 'Evidence or supporting documents', required: false })
  @IsString()
  @IsOptional()
  evidence?: string;
}
