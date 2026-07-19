import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from '../service/storage.service';
import {
  BulkDeleteDto,
  BulkDeleteResultDto,
  BulkUploadDto,
  CopyFileDto,
  MoveFileDto,
  SignedUrlDto,
  StorageFileQueryDto,
  StorageFileResponseDto,
  UpdateStorageFileDto,
  UploadFileDto,
} from '../dto/storage.dto';
import { EmptyFileException } from '../exceptions/storage.exception';
import { UploadedFileLike } from '../types/uploaded-file.type';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'File uploaded successfully', type: StorageFileResponseDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        entityType: { type: 'string' },
        entityId: { type: 'string' },
        category: { type: 'string' },
        visibility: { type: 'string' },
        isTemporary: { type: 'boolean' },
        expiresAt: { type: 'string' },
        uploadedBy: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: UploadedFileLike,
    @Body() dto: UploadFileDto,
    @Body('uploadedBy') uploadedBy?: string,
  ): Promise<StorageFileResponseDto> {
    if (!file) {
      throw new EmptyFileException();
    }

    return this.storageService.upload(
      { buffer: file.buffer, originalFileName: file.originalname, mimeType: file.mimetype },
      dto,
      uploadedBy,
    );
  }

  @Post('bulk-upload')
  @ApiOperation({ summary: 'Upload multiple files at once' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Files uploaded successfully', type: [StorageFileResponseDto] })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
        entityType: { type: 'string' },
        entityId: { type: 'string' },
        category: { type: 'string' },
        visibility: { type: 'string' },
        uploadedBy: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async bulkUpload(
    @UploadedFiles() files: UploadedFileLike[],
    @Body() dto: BulkUploadDto,
    @Body('uploadedBy') uploadedBy?: string,
  ): Promise<StorageFileResponseDto[]> {
    if (!files || files.length === 0) {
      throw new EmptyFileException();
    }

    return this.storageService.bulkUpload(
      files.map((file) => ({
        buffer: file.buffer,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
      })),
      dto,
      uploadedBy,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List storage files with filtering, sorting, and pagination' })
  @ApiResponse({ status: 200, description: 'Storage files retrieved successfully' })
  async findAll(@Query() query: StorageFileQueryDto) {
    return this.storageService.findAll(
      {
        entityType: query.entityType,
        entityId: query.entityId,
        category: query.category,
        provider: query.provider,
        status: query.status,
        visibility: query.visibility,
        isTemporary: query.isTemporary,
        uploadedBy: query.uploadedBy,
        search: query.search,
      },
      {
        page: query.page,
        limit: query.limit,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
      },
    );
  }

  @Get('entity/:entityType/:entityId')
  @ApiOperation({ summary: 'List files attached to a specific domain entity' })
  @ApiResponse({ status: 200, description: 'Storage files retrieved successfully' })
  async findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Query() query: StorageFileQueryDto,
  ) {
    return this.storageService.findByEntity(entityType, entityId, {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'List files belonging to a business category' })
  @ApiResponse({ status: 200, description: 'Storage files retrieved successfully' })
  async findByCategory(@Param('category') category: string, @Query() query: StorageFileQueryDto) {
    return this.storageService.findByCategory(category, {
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a storage file by ID' })
  @ApiResponse({ status: 200, description: 'Storage file retrieved successfully', type: StorageFileResponseDto })
  async findById(@Param('id') id: string): Promise<StorageFileResponseDto> {
    return this.storageService.findById(id);
  }

  @Get(':id/metadata')
  @ApiOperation({ summary: 'Retrieve combined database and provider metadata for a file' })
  @ApiResponse({ status: 200, description: 'Metadata retrieved successfully' })
  async getMetadata(@Param('id') id: string) {
    return this.storageService.getMetadata(id);
  }

  @Post(':id/signed-url')
  @ApiOperation({ summary: 'Generate a signed, time-limited URL for a file' })
  @ApiResponse({ status: 200, description: 'Signed URL generated successfully' })
  async getSignedUrl(@Param('id') id: string, @Body() dto: SignedUrlDto) {
    return this.storageService.getSignedUrl(id, dto.expiresIn);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update storage file metadata' })
  @ApiResponse({ status: 200, description: 'Storage file updated successfully', type: StorageFileResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateStorageFileDto): Promise<StorageFileResponseDto> {
    return this.storageService.update(id, dto);
  }

  @Post(':id/replace')
  @ApiOperation({ summary: 'Replace the contents of an existing file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'File replaced successfully', type: StorageFileResponseDto })
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file'))
  async replace(
    @Param('id') id: string,
    @UploadedFile() file: UploadedFileLike,
  ): Promise<StorageFileResponseDto> {
    if (!file) {
      throw new EmptyFileException();
    }

    return this.storageService.replace(id, {
      buffer: file.buffer,
      originalFileName: file.originalname,
      mimeType: file.mimetype,
    });
  }

  @Post(':id/move')
  @ApiOperation({ summary: 'Move a file to a different folder' })
  @ApiResponse({ status: 200, description: 'File moved successfully', type: StorageFileResponseDto })
  async move(@Param('id') id: string, @Body() dto: MoveFileDto): Promise<StorageFileResponseDto> {
    return this.storageService.move(id, dto.destinationFolder);
  }

  @Post(':id/copy')
  @ApiOperation({ summary: 'Copy a file to a new storage record' })
  @ApiResponse({ status: 201, description: 'File copied successfully', type: StorageFileResponseDto })
  async copy(@Param('id') id: string, @Body() dto: CopyFileDto): Promise<StorageFileResponseDto> {
    return this.storageService.copy(id, dto.destinationFolder);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a soft-deleted file' })
  @ApiResponse({ status: 200, description: 'File restored successfully', type: StorageFileResponseDto })
  async restore(@Param('id') id: string): Promise<StorageFileResponseDto> {
    return this.storageService.restore(id);
  }

  @Delete('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple files at once' })
  @ApiResponse({ status: 200, description: 'Files deleted successfully', type: BulkDeleteResultDto })
  async bulkDelete(@Body() dto: BulkDeleteDto): Promise<BulkDeleteResultDto> {
    return this.storageService.bulkDelete(dto.fileIds);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a storage file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.storageService.delete(id);
    return { success: true };
  }
}
