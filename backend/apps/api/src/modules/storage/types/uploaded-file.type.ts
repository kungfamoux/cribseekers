// Minimal structural shape of the file object multer attaches to the request
// via `FileInterceptor`/`FilesInterceptor`. Defined locally instead of relying
// on the ambient `Express.Multer.File` global namespace so this module has no
// implicit dependency on Express-specific global type augmentation.
export interface UploadedFileLike {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}
