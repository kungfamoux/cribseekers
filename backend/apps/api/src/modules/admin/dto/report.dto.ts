import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
import { ReportStatus } from '@prisma/client';

export class CreateReportCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  sortOrder?: string;
}

export class UpdateReportStatusDto {
  @IsUUID()
  reportId: string;

  @IsEnum(ReportStatus)
  status: ReportStatus;

  @IsUUID()
  @IsOptional()
  assignedTo?: string;

  @IsString()
  @IsOptional()
  resolution?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateReportDto {
  @IsUUID()
  categoryId: string;

  @IsUUID()
  reportedBy: string;

  @IsString()
  entityType: string;

  @IsUUID()
  entityId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  priority?: string;
}

export class ReportResponseDto {
  id: string;
  categoryId: string;
  reportedBy: string;
  entityType: string;
  entityId: string;
  reason: string;
  description: string | null;
  status: ReportStatus;
  priority: string;
  assignedTo: string | null;
  resolvedBy: string | null;
  resolvedAt: Date | null;
  resolution: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ReportCategoryResponseDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
