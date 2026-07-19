import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from '../../database/prisma.module';

// Controllers
import { StorageController } from './controller/storage.controller';

// Services
import { StorageService } from './service/storage.service';

// Repositories
import { StorageRepository } from './repository/storage.repository';

// Providers
import { LocalStorageProvider } from './providers/local-storage.provider';
import { S3Provider } from './providers/s3.provider';
import { CloudinaryProvider } from './providers/cloudinary.provider';

// Hooks
import { DefaultImageProcessingHook } from './hooks/image-processing.hook';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB hard ceiling; per-mime-type limits are enforced in StorageService
      },
    }),
  ],
  controllers: [StorageController],
  providers: [
    StorageService,
    StorageRepository,
    LocalStorageProvider,
    S3Provider,
    CloudinaryProvider,
    DefaultImageProcessingHook,
  ],
  exports: [StorageService, LocalStorageProvider, S3Provider, CloudinaryProvider],
})
export class StorageModule {}
