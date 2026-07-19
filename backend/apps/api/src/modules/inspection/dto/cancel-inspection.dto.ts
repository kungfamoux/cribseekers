import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CancelInspectionDto {
  @IsUUID()
  inspectionId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
