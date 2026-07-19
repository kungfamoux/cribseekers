import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class ExportRequestDto {
  @ApiProperty({ 
    description: 'Export format',
    enum: ['csv', 'xlsx', 'pdf'],
    example: 'csv'
  })
  @IsEnum(['csv', 'xlsx', 'pdf'])
  @IsNotEmpty()
  format: string;

  @ApiProperty({ description: 'Report type', example: 'revenue' })
  @IsNotEmpty()
  reportType: string;

  @ApiProperty({ description: 'Start date', example: '2024-01-01T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End date', example: '2024-12-31T23:59:59Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Filters', required: false })
  @IsOptional()
  filters?: Record<string, any>;
}
