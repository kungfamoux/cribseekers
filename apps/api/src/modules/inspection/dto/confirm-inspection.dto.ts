import { IsUUID } from 'class-validator';

export class ConfirmInspectionDto {
  @IsUUID()
  inspectionId: string;
}
