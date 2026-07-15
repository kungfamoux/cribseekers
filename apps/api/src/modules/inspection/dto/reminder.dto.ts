import { IsUUID, IsEnum, IsDate, IsString } from 'class-validator';
import { ReminderStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class ReminderDto {
  @IsUUID()
  inspectionId: string;

  @IsUUID()
  userId: string;

  @Type(() => Date)
  @IsDate()
  remindAt: Date;

  @IsEnum(ReminderStatus)
  status?: ReminderStatus;

  @IsString()
  method: string;
}
