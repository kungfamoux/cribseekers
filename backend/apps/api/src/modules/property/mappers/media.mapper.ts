import { PropertyImage } from '../entities/property-image.entity';
import { PropertyVideo } from '../entities/property-video.entity';
import { PropertyDocument } from '../entities/property-document.entity';
import { MediaUploadDto, MediaResponseDto } from '../dto/media-upload.dto';

export class MediaMapper {
  static toImageEntity(prismaImage: any): PropertyImage {
    const entity = new PropertyImage();
    entity.id = prismaImage.id;
    entity.propertyId = prismaImage.propertyId;
    entity.url = prismaImage.url;
    entity.thumbnailUrl = prismaImage.thumbnailUrl;
    entity.altText = prismaImage.altText;
    entity.caption = prismaImage.caption;
    entity.order = prismaImage.order;
    entity.isPrimary = prismaImage.isPrimary;
    entity.status = prismaImage.status;
    entity.width = prismaImage.width;
    entity.height = prismaImage.height;
    entity.fileSize = prismaImage.fileSize;
    entity.mimeType = prismaImage.mimeType;
    entity.uploadedAt = prismaImage.uploadedAt;
    entity.createdAt = prismaImage.createdAt;
    entity.updatedAt = prismaImage.updatedAt;
    return entity;
  }

  static toVideoEntity(prismaVideo: any): PropertyVideo {
    const entity = new PropertyVideo();
    entity.id = prismaVideo.id;
    entity.propertyId = prismaVideo.propertyId;
    entity.url = prismaVideo.url;
    entity.thumbnailUrl = prismaVideo.thumbnailUrl;
    entity.title = prismaVideo.title;
    entity.description = prismaVideo.description;
    entity.duration = prismaVideo.duration;
    entity.status = prismaVideo.status;
    entity.width = prismaVideo.width;
    entity.height = prismaVideo.height;
    entity.fileSize = prismaVideo.fileSize;
    entity.mimeType = prismaVideo.mimeType;
    entity.uploadedAt = prismaVideo.uploadedAt;
    entity.createdAt = prismaVideo.createdAt;
    entity.updatedAt = prismaVideo.updatedAt;
    return entity;
  }

  static toDocumentEntity(prismaDocument: any): PropertyDocument {
    const entity = new PropertyDocument();
    entity.id = prismaDocument.id;
    entity.propertyId = prismaDocument.propertyId;
    entity.url = prismaDocument.url;
    entity.fileName = prismaDocument.fileName;
    entity.fileType = prismaDocument.fileType;
    entity.title = prismaDocument.title;
    entity.description = prismaDocument.description;
    entity.category = prismaDocument.category;
    entity.status = prismaDocument.status;
    entity.fileSize = prismaDocument.fileSize;
    entity.uploadedAt = prismaDocument.uploadedAt;
    entity.createdAt = prismaDocument.createdAt;
    entity.updatedAt = prismaDocument.updatedAt;
    return entity;
  }

  static toResponseDto(entity: PropertyImage | PropertyVideo | PropertyDocument): MediaResponseDto {
    const dto = new MediaResponseDto();
    dto.id = entity.id;
    dto.propertyId = entity.propertyId;
    dto.url = entity.url;
    dto.thumbnailUrl = (entity as PropertyImage | PropertyVideo).thumbnailUrl;
    dto.altText = (entity as PropertyImage).altText;
    dto.caption = (entity as PropertyImage).caption;
    dto.title = (entity as PropertyVideo | PropertyDocument).title;
    dto.description = (entity as PropertyVideo | PropertyDocument).description;
    dto.order = (entity as PropertyImage).order;
    dto.isPrimary = (entity as PropertyImage).isPrimary;
    dto.status = entity.status;
    dto.width = (entity as PropertyImage | PropertyVideo).width;
    dto.height = (entity as PropertyImage | PropertyVideo).height;
    dto.fileSize = (entity as PropertyImage | PropertyVideo | PropertyDocument).fileSize;
    dto.mimeType = (entity as PropertyImage | PropertyVideo).mimeType;
    dto.fileName = (entity as PropertyDocument).fileName;
    dto.fileType = (entity as PropertyDocument).fileType;
    dto.category = (entity as PropertyDocument).category;
    dto.duration = (entity as PropertyVideo).duration;
    dto.uploadedAt = entity.uploadedAt;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  static toImageCreateInput(propertyId: string, dto: MediaUploadDto): any {
    return {
      propertyId,
      url: dto.url,
      thumbnailUrl: dto.thumbnailUrl,
      altText: dto.altText,
      caption: dto.caption,
      order: dto.order || 0,
      isPrimary: dto.isPrimary || false,
      width: dto.width,
      height: dto.height,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
    };
  }

  static toVideoCreateInput(propertyId: string, dto: MediaUploadDto): any {
    return {
      propertyId,
      url: dto.url,
      thumbnailUrl: dto.thumbnailUrl,
      title: dto.title,
      description: dto.description,
      duration: dto.duration,
      width: dto.width,
      height: dto.height,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
    };
  }

  static toDocumentCreateInput(propertyId: string, dto: MediaUploadDto): any {
    return {
      propertyId,
      url: dto.url,
      fileName: dto.fileName,
      fileType: dto.fileType,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      fileSize: dto.fileSize,
    };
  }
}
