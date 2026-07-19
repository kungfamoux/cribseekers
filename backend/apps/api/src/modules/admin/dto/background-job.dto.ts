import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class CreateBackgroundJobDto {
  @IsString()
  name: string;

  @IsString()
  queue: string;

  payload: any;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  priority?: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  maxAttempts?: number;

  @IsString()
  @IsOptional()
  scheduledAt?: string;
}

export class BackgroundJobResponseDto {
  id: string;
  name: string;
  queue: string;
  payload: any;
  status: JobStatus;
  priority: number;
  attempts: number;
  maxAttempts: number;
  error: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  failedAt: Date | null;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
