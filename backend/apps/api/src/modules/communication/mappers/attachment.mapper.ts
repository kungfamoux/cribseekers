import { UploadAttachmentDto } from '../dto/upload-attachment.dto';

export class AttachmentMapper {
  static toCreateInput(dto: UploadAttachmentDto, messageId: string): any {
    return {
      messageId,
      type: dto.type,
      url: '', // Will be set by storage service
      fileName: dto.fileName,
      storageFileId: dto.storageFileId,
    };
  }
}
