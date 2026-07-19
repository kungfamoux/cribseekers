import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { StorageFileType, StorageProvider as StorageProviderEnum, StorageStatus, StorageVisibility } from '@prisma/client';
import { StorageRepository } from '../repository/storage.repository';
import { LocalStorageProvider } from '../providers/local-storage.provider';
import { S3Provider } from '../providers/s3.provider';
import { CloudinaryProvider } from '../providers/cloudinary.provider';
import { IStorageProvider } from '../interfaces/storage-provider.interface';
import { StorageFileFilters } from '../interfaces/storage.repository.interface';
import { DefaultImageProcessingHook } from '../hooks/image-processing.hook';
import { StorageMapper } from '../mappers/storage.mapper';
import { StorageValidator } from '../validators/storage.validator';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';
import {
  BulkDeleteResultDto,
  BulkUploadDto,
  StorageFileResponseDto,
  UpdateStorageFileDto,
  UploadFileDto,
} from '../dto/storage.dto';
import {
  BulkOperationLimitExceededException,
  EmptyFileException,
  StorageFileDeletedException,
  StorageFileNotFoundException,
  StorageFileSizeExceededException,
} from '../exceptions/storage.exception';
import { StorageFile } from '../entities/storage-file.entity';

export interface UploadInput {
  buffer: Buffer;
  originalFileName: string;
  mimeType: string;
}

const BULK_OPERATION_LIMIT = 20;

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly defaultProvider: StorageProviderEnum;

  constructor(
    private readonly storageRepository: StorageRepository,
    private readonly localStorageProvider: LocalStorageProvider,
    private readonly s3Provider: S3Provider,
    private readonly cloudinaryProvider: CloudinaryProvider,
    private readonly imageProcessingHook: DefaultImageProcessingHook,
  ) {
    const configured = (process.env.STORAGE_PROVIDER || 'LOCAL').toUpperCase();
    this.defaultProvider = this.isStorageProviderEnum(configured) ? configured : StorageProviderEnum.LOCAL;
  }

  async upload(input: UploadInput, dto: UploadFileDto, uploadedBy?: string): Promise<StorageFileResponseDto> {
    const file = await this.persistUpload(input, dto, uploadedBy);
    return StorageMapper.toResponseDto(file);
  }

  async bulkUpload(
    inputs: UploadInput[],
    dto: BulkUploadDto,
    uploadedBy?: string,
  ): Promise<StorageFileResponseDto[]> {
    if (inputs.length === 0) {
      throw new EmptyFileException();
    }
    if (inputs.length > BULK_OPERATION_LIMIT) {
      throw new BulkOperationLimitExceededException(BULK_OPERATION_LIMIT);
    }

    const uploadDto: UploadFileDto = {
      entityType: dto.entityType,
      entityId: dto.entityId,
      category: dto.category,
      visibility: dto.visibility,
      isTemporary: false,
      metadata: dto.metadata,
    };

    const results: StorageFile[] = [];
    for (const input of inputs) {
      results.push(await this.persistUpload(input, uploadDto, uploadedBy));
    }

    return StorageMapper.toResponseDtoList(results);
  }

  async findById(id: string): Promise<StorageFileResponseDto> {
    const file = await this.getExistingFile(id);
    return StorageMapper.toResponseDto(file);
  }

  async findByEntity(
    entityType: string,
    entityId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFileResponseDto>> {
    const result = await this.storageRepository.findByEntity(entityType, entityId, options);
    return { data: StorageMapper.toResponseDtoList(result.data), meta: result.meta };
  }

  async findByCategory(
    category: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFileResponseDto>> {
    const result = await this.storageRepository.findByCategory(category, options);
    return { data: StorageMapper.toResponseDtoList(result.data), meta: result.meta };
  }

  async findAll(
    filters?: StorageFileFilters,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<StorageFileResponseDto>> {
    const result = await this.storageRepository.findAll(filters, options);
    return { data: StorageMapper.toResponseDtoList(result.data), meta: result.meta };
  }

  async update(id: string, dto: UpdateStorageFileDto): Promise<StorageFileResponseDto> {
    await this.getExistingFile(id);

    const updated = await this.storageRepository.update(id, {
      category: dto.category,
      visibility: dto.visibility,
      metadata: dto.metadata,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
    });

    return StorageMapper.toResponseDto(updated);
  }

  async delete(id: string): Promise<void> {
    const file = await this.getExistingFile(id);
    const provider = this.resolveProvider(file.provider);

    await provider.delete(file.storageKey);
    await this.storageRepository.softDelete(id);

    this.logger.log(`Deleted storage file ${id} (${file.storageKey})`);
  }

  async bulkDelete(fileIds: string[]): Promise<BulkDeleteResultDto> {
    if (fileIds.length > BULK_OPERATION_LIMIT) {
      throw new BulkOperationLimitExceededException(BULK_OPERATION_LIMIT);
    }

    const result: BulkDeleteResultDto = { deletedCount: 0, failedIds: [] };

    for (const fileId of fileIds) {
      try {
        await this.delete(fileId);
        result.deletedCount++;
      } catch (error) {
        this.logger.warn(`Failed to delete storage file ${fileId}: ${(error as Error).message}`);
        result.failedIds.push(fileId);
      }
    }

    return result;
  }

  async restore(id: string): Promise<StorageFileResponseDto> {
    const restored = await this.storageRepository.restore(id);
    return StorageMapper.toResponseDto(restored);
  }

  async replace(id: string, input: UploadInput): Promise<StorageFileResponseDto> {
    const existing = await this.getExistingFile(id);
    this.assertNotEmpty(input.buffer);
    this.assertWithinSizeLimit(input.buffer.length, input.mimeType);

    const provider = this.resolveProvider(existing.provider);
    const extension = StorageValidator.extractExtension(input.originalFileName);
    const storedFileName = StorageValidator.generateUniqueFileName(input.originalFileName);
    const folder = existing.folder ?? undefined;

    await provider.delete(existing.storageKey);
    const uploadResult = await provider.upload(input.buffer, storedFileName, input.mimeType, folder);

    const dimensions = this.imageProcessingHook.getDimensions(input.buffer, input.mimeType);

    const updated = await this.storageRepository.update(id, {
      originalFileName: input.originalFileName,
      storedFileName,
      extension,
      mimeType: input.mimeType,
      fileType: StorageValidator.classifyFileType(input.mimeType),
      size: input.buffer.length,
      storageKey: uploadResult.path,
      url: uploadResult.url,
      checksum: this.computeChecksum(input.buffer),
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      status: StorageStatus.ACTIVE,
      signedUrl: null,
      signedUrlExpiresAt: null,
    });

    this.logger.log(`Replaced storage file ${id}`);

    return StorageMapper.toResponseDto(updated);
  }

  async move(id: string, destinationFolder: string): Promise<StorageFileResponseDto> {
    const existing = await this.getExistingFile(id);
    const provider = this.resolveProvider(existing.provider);

    const destinationKey = `${destinationFolder}/${existing.storedFileName}`;
    const moveResult = await provider.move(existing.storageKey, destinationKey);

    const updated = await this.storageRepository.update(id, {
      storageKey: moveResult.path,
      url: moveResult.url,
      folder: destinationFolder,
    });

    return StorageMapper.toResponseDto(updated);
  }

  async copy(id: string, destinationFolder?: string): Promise<StorageFileResponseDto> {
    const existing = await this.getExistingFile(id);
    const provider = this.resolveProvider(existing.provider);

    const targetFolder = destinationFolder ?? existing.folder ?? undefined;
    const copiedFileName = StorageValidator.generateUniqueFileName(existing.originalFileName);
    const destinationKey = targetFolder ? `${targetFolder}/${copiedFileName}` : copiedFileName;

    const copyResult = await provider.copy(existing.storageKey, destinationKey);

    const copy = await this.storageRepository.create({
      originalFileName: existing.originalFileName,
      storedFileName: copiedFileName,
      extension: existing.extension,
      mimeType: existing.mimeType,
      fileType: existing.fileType,
      size: copyResult.size || existing.size,
      provider: existing.provider,
      bucket: existing.bucket,
      folder: targetFolder ?? null,
      storageKey: copyResult.path,
      url: copyResult.url,
      checksum: existing.checksum,
      width: existing.width,
      height: existing.height,
      duration: existing.duration,
      visibility: existing.visibility,
      status: StorageStatus.ACTIVE,
      isTemporary: existing.isTemporary,
      metadata: { ...(existing.metadata as object | undefined), copiedFrom: existing.id },
      uploadedBy: existing.uploadedBy,
      entityType: existing.entityType,
      entityId: existing.entityId,
      category: existing.category,
    });

    return StorageMapper.toResponseDto(copy);
  }

  async getMetadata(id: string): Promise<Record<string, unknown>> {
    const file = await this.getExistingFile(id);
    const provider = this.resolveProvider(file.provider);
    const providerMetadata = await provider.getMetadata(file.storageKey);

    return {
      id: file.id,
      originalFileName: file.originalFileName,
      mimeType: file.mimeType,
      size: file.size,
      checksum: file.checksum,
      width: file.width,
      height: file.height,
      duration: file.duration,
      status: file.status,
      visibility: file.visibility,
      customMetadata: file.metadata,
      provider: providerMetadata,
    };
  }

  async getSignedUrl(id: string, expiresIn = 3600): Promise<{ url: string; expiresAt: Date }> {
    const file = await this.getExistingFile(id);
    const provider = this.resolveProvider(file.provider);

    const result = await provider.getSignedUrl(file.storageKey, expiresIn);

    await this.storageRepository.update(id, {
      signedUrl: result.url,
      signedUrlExpiresAt: result.expiresAt,
    });

    return result;
  }

  private async persistUpload(
    input: UploadInput,
    dto: UploadFileDto,
    uploadedBy?: string,
  ): Promise<StorageFile> {
    this.assertNotEmpty(input.buffer);
    this.assertWithinSizeLimit(input.buffer.length, input.mimeType);

    const provider = this.resolveProvider();
    const extension = StorageValidator.extractExtension(input.originalFileName);
    const storedFileName = StorageValidator.generateUniqueFileName(input.originalFileName);
    const fileType = StorageValidator.classifyFileType(input.mimeType);

    const folder = dto.entityType && dto.entityId
      ? StorageValidator.generatePath(dto.entityType, dto.entityId, dto.category)
      : dto.category;

    const compressed = fileType === StorageFileType.IMAGE
      ? await this.imageProcessingHook.compress(input.buffer, input.mimeType)
      : input.buffer;

    const uploadResult = await provider.upload(compressed, storedFileName, input.mimeType, folder);
    const dimensions = this.imageProcessingHook.getDimensions(compressed, input.mimeType);

    return this.storageRepository.create({
      originalFileName: input.originalFileName,
      storedFileName,
      extension,
      mimeType: input.mimeType,
      fileType,
      size: uploadResult.size,
      provider: this.defaultProvider,
      folder: folder ?? null,
      storageKey: uploadResult.path,
      url: uploadResult.url,
      checksum: this.computeChecksum(compressed),
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      visibility: dto.visibility ?? StorageVisibility.PRIVATE,
      status: StorageStatus.ACTIVE,
      isTemporary: dto.isTemporary ?? false,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      metadata: dto.metadata ?? null,
      uploadedBy: uploadedBy ?? null,
      entityType: dto.entityType ?? null,
      entityId: dto.entityId ?? null,
      category: dto.category,
    });
  }

  private async getExistingFile(id: string): Promise<StorageFile> {
    const file = await this.storageRepository.findById(id);
    if (!file) {
      throw new StorageFileNotFoundException(id);
    }
    if (file.status === StorageStatus.DELETED) {
      throw new StorageFileDeletedException(id);
    }
    return file;
  }

  private resolveProvider(provider?: StorageProviderEnum): IStorageProvider {
    const target = provider ?? this.defaultProvider;

    switch (target) {
      case StorageProviderEnum.S3:
        return this.s3Provider;
      case StorageProviderEnum.CLOUDINARY:
        return this.cloudinaryProvider;
      case StorageProviderEnum.LOCAL:
      default:
        return this.localStorageProvider;
    }
  }

  private computeChecksum(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  private assertNotEmpty(buffer: Buffer): void {
    if (!buffer || buffer.length === 0) {
      throw new EmptyFileException();
    }
  }

  private assertWithinSizeLimit(size: number, mimeType: string): void {
    if (!StorageValidator.isValidFileSize(size, mimeType)) {
      const maxSize = mimeType.startsWith('image/')
        ? StorageValidator.MAX_IMAGE_SIZE
        : mimeType.startsWith('video/')
          ? StorageValidator.MAX_VIDEO_SIZE
          : StorageValidator.MAX_DOCUMENT_SIZE;
      throw new StorageFileSizeExceededException(size, maxSize);
    }
  }

  private isStorageProviderEnum(value: string): value is StorageProviderEnum {
    return Object.values(StorageProviderEnum).includes(value as StorageProviderEnum);
  }
}
