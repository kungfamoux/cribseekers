import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum ModerationAction {
  SUSPEND = 'SUSPEND',
  REACTIVATE = 'REACTIVATE',
  DELETE = 'DELETE',
}

export class UserModerationDto {
  @IsString()
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
  @IsString()
  userId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  duration?: string;
}

export class ReactivateUserDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class DeleteUserDto {
  @IsString()
  userId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  confirmUserId?: string;
}
