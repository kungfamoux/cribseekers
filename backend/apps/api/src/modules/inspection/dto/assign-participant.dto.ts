import { IsUUID, IsEnum } from 'class-validator';

export enum ParticipantRole {
  TENANT = 'TENANT',
  OWNER = 'OWNER',
  AGENT = 'AGENT',
}

export class AssignParticipantDto {
  @IsUUID()
  inspectionId: string;

  @IsUUID()
  userId: string;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}
