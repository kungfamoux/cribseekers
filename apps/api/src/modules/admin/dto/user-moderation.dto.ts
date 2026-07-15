import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';

export enum ModerationAction {
  SUSPEND = 'SUSPEND',
  REACTIVATE = 'REACTIVATE',
  DELETE = 'DELETE',
}

export class UserModerationDto {
  @IsUUID()
  userId: string;

  @IsEnum(ModerationAction)
  action: ModerationAction;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class SuspendUserDto {
  @IsUUID()
  userId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  duration?: string;
}

export class ReactivateUserDto {
  @IsUUID()
  userId: string;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class DeleteUserDto {
  @IsUUID()
  userId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  confirmUserId?: string;
}
