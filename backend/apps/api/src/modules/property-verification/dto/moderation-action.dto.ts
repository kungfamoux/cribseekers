import { IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';

export enum ModerationActionType {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  SUSPEND = 'SUSPEND',
  ARCHIVE = 'ARCHIVE',
  RESTORE = 'RESTORE',
  FLAG = 'FLAG',
  ESCALATE = 'ESCALATE',
  REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS',
}

export class ModerationActionDto {
  @IsUUID()
  propertyId: string;

  @IsEnum(ModerationActionType)
  action: ModerationActionType;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
