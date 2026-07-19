import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class DateRangeDto {
  @ApiProperty({ description: 'Start date', example: '2024-01-01T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End date', example: '2024-12-31T23:59:59Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Timezone', example: 'Africa/Lagos', required: false })
  @IsOptional()
  timezone?: string;
}
