import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { AttachmentType } from '@prisma/client';

export class UploadAttachmentDto {
  @ApiProperty({ enum: AttachmentType, description: 'Type of attachment' })
  @IsEnum(AttachmentType)
  type: AttachmentType;

  @ApiProperty({ description: 'Storage file ID' })
  @IsString()
  storageFileId: string;

  @ApiProperty({ description: 'File name' })
  @IsString()
  fileName: string;
}
