import { Injectable } from '@nestjs/common';

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Extension point for image compression and thumbnail generation.
 *
 * The default implementation below performs real, dependency-free dimension
 * extraction for the most common web image formats, and otherwise passes
 * data through unchanged. A real compression/resizing engine (e.g. `sharp`)
 * can be wired in later by providing an alternate `IImageProcessingHook`
 * implementation -- StorageService only depends on this interface, so no
 * other code needs to change when that happens.
 */
export interface IImageProcessingHook {
  getDimensions(buffer: Buffer, mimeType: string): ImageDimensions | undefined;
  compress(buffer: Buffer, mimeType: string): Promise<Buffer>;
  generateThumbnail(buffer: Buffer, mimeType: string): Promise<Buffer | null>;
}

@Injectable()
export class DefaultImageProcessingHook implements IImageProcessingHook {
  getDimensions(buffer: Buffer, mimeType: string): ImageDimensions | undefined {
    if (mimeType === 'image/png') {
      return this.getPngDimensions(buffer);
    }
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      return this.getJpegDimensions(buffer);
    }
    if (mimeType === 'image/gif') {
      return this.getGifDimensions(buffer);
    }
    return undefined;
  }

  async compress(buffer: Buffer, _mimeType: string): Promise<Buffer> {
    // No compression codec is wired in yet. Returning the original buffer
    // unchanged is the honest default behavior for this extension point.
    return buffer;
  }

  async generateThumbnail(_buffer: Buffer, _mimeType: string): Promise<Buffer | null> {
    // Real thumbnail generation requires an image-resizing engine that is not
    // currently a project dependency. Returning null clearly signals "no
    // thumbnail produced" instead of fabricating one.
    return null;
  }

  private getPngDimensions(buffer: Buffer): ImageDimensions | undefined {
    if (buffer.length < 24) return undefined;

    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    if (!isPng) return undefined;

    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  private getGifDimensions(buffer: Buffer): ImageDimensions | undefined {
    if (buffer.length < 10) return undefined;

    const isGif = buffer.toString('ascii', 0, 3) === 'GIF';
    if (!isGif) return undefined;

    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  private getJpegDimensions(buffer: Buffer): ImageDimensions | undefined {
    if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
      return undefined;
    }

    let offset = 2;
    while (offset < buffer.length - 1) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }

      const marker = buffer[offset + 1];
      const isSofMarker =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

      if (isSofMarker) {
        if (offset + 9 > buffer.length) return undefined;
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }

      if (offset + 4 > buffer.length) return undefined;
      const segmentLength = buffer.readUInt16BE(offset + 2);
      offset += 2 + segmentLength;
    }

    return undefined;
  }
}
