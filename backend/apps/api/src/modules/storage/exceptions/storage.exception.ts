import { HttpException, HttpStatus } from '@nestjs/common';

export class StorageFileNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Storage file with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class StorageFileDeletedException extends HttpException {
  constructor(id: string) {
    super(`Storage file with ID ${id} has already been deleted`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidStorageProviderException extends HttpException {
  constructor(provider: string) {
    super(`Unsupported storage provider: ${provider}`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidStorageCategoryException extends HttpException {
  constructor(category: string) {
    super(`Invalid storage category: ${category}`, HttpStatus.BAD_REQUEST);
  }
}

export class StorageFileSizeExceededException extends HttpException {
  constructor(size: number, maxSize: number) {
    super(
      `File size ${size} bytes exceeds the maximum allowed size of ${maxSize} bytes for this file type`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidFileNameException extends HttpException {
  constructor(fileName: string) {
    super(`Invalid file name: ${fileName}`, HttpStatus.BAD_REQUEST);
  }
}

export class StorageOperationFailedException extends HttpException {
  constructor(operation: string, message: string) {
    super(`Storage operation "${operation}" failed: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class EmptyFileException extends HttpException {
  constructor() {
    super('Uploaded file is empty', HttpStatus.BAD_REQUEST);
  }
}

export class BulkOperationLimitExceededException extends HttpException {
  constructor(limit: number) {
    super(`Bulk operations are limited to ${limit} files at a time`, HttpStatus.BAD_REQUEST);
  }
}
